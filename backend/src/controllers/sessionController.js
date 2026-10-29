import crypto from "crypto"; 
import { streamClient, chatClient } from "../lib/stream.js"
import { Session } from "../models/Session.modal.js"

export async function createSession(req, res) {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        
        // Generate random 6-character room password
        const roomPassword = crypto.randomBytes(3).toString('hex').toUpperCase();

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }

        // unique call Id for stream video.
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // creating session in db with password
        const session = await Session.create({ 
            problem, 
            difficulty, 
            host: userId, 
            callId, 
            password: roomPassword, 
            status: 'active' 
        });

        // create video call 
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() },
            },
        });

        // chat messaging 
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        });

        await channel.create();
        
        res.status(201).json({ session });

        // todo : send email session created successfully.
    } catch (error) {
        console.log("Error in createSession controller: ", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getActiveSessions(req, res) {
    try {
        const sessions = await Session.find({ status: "active" })
            .populate("host", "firstName lastName email profileImage clerkId")
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({ sessions });
    } catch (error) {
        console.log("Error in getActiveSessions controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id;

        // get all sessions where user is either host or paticipant.
        const sessions = await Session.find({
            status: "completed",
            $or: [{ host: userId }, { participant: userId }],
        })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({ sessions });
    } catch (error) {
        console.log("Error in getMyRecentSessions controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSessionById(req, res) {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
            .populate("host", "firstName lastName email profileImage clerkId")
            .populate("participant", "firstName lastName email profileImage clerkId")

        if (!session) return res.status(404).json({ message: "Session not found" });

        res.status(200).json({ session });
    } catch (error) {
        console.log("Error in getSessionById controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function joinSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        const { password } = req.body; // Frontend se aayega

        const session = await Session.findById(id);

        // Pehle check karo ki session null toh nahi hai
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Usk baad password check karo
        if (session.password !== password) {
            return res.status(403).json({ error: "Invalid Room Password!" });
        }

        if (session.status !== "active") return res.status(400).json({ message: "Cannot join a completed session" });

        if (session.host.toString() == userId.toString()) {
            return res.status(400).json({ message: "Host cannot join their own session as participants" });
        }

        // check if session is already full - has a participant
        if (session.participant) return res.status(409).json({ message: "Session is full" });

        session.participant = userId
        await session.save();

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId])

        res.status(200).json({ session });
    } catch (error) {
        console.log("Error in joinSession controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const VALID_VERDICTS = ["strong_hire", "hire", "no_hire", "strong_no_hire"];

export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { feedback } = req.body;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "Session not found" });

        // check if user is host or not :
        if (session.host.toString() !== userId.toString()) {
            return res.status(404).json({ message: "only the host can end the session" });
        }

        // check if session is already completed :
        if (session.status === "completed") {
            return res.status(400).json({ message: "Session is already completed" });
        }

        // only meaningful if a candidate actually joined the room
        if (session.participant) {
            if (!feedback || !feedback.verdict || !feedback.overallRating) {
                return res.status(400).json({
                    message: "Interview feedback (verdict and overall rating) is required to end the session",
                });
            }

            if (!VALID_VERDICTS.includes(feedback.verdict)) {
                return res.status(400).json({ message: "Invalid verdict value" });
            }

            const overallRating = Number(feedback.overallRating);
            if (!Number.isFinite(overallRating) || overallRating < 1 || overallRating > 5) {
                return res.status(400).json({ message: "overallRating must be a number between 1 and 5" });
            }

            session.feedback = {
                verdict: feedback.verdict,
                overallRating,
                ratings: {
                    problemSolving: feedback.ratings?.problemSolving,
                    codeQuality: feedback.ratings?.codeQuality,
                    communication: feedback.ratings?.communication,
                    technicalKnowledge: feedback.ratings?.technicalKnowledge,
                },
                remarks: feedback.remarks?.trim() || "",
                submittedBy: userId,
                submittedAt: new Date(),
            };
        }

        // delete stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({ hard: true });

        // delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        res.status(200).json({ session, message: "Session ended successfully" });
    } catch (error) {
        console.log("Error in endSession controller : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}