import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        verdict: {
            type: String,
            enum: ["strong_hire", "hire", "no_hire", "strong_no_hire"],
            required: true,
        },
        overallRating: { type: Number, min: 1, max: 5, required: true },
        ratings: {
            problemSolving: { type: Number, min: 1, max: 5 },
            codeQuality: { type: Number, min: 1, max: 5 },
            communication: { type: Number, min: 1, max: 5 },
            technicalKnowledge: { type: Number, min: 1, max: 5 },
        },
        remarks: { type: String, trim: true, maxlength: 2000 },
        submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        submittedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const sessionSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["easy","medium","hard"],
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status: {
        type: String,
        enum: ["active","completed"],
        default: "active"
    },
    // stream video call ID
    callId: {
        type: String,
        default: "",
    }, 
    password: {
    type: String,
    required: true // Har room ka password hona zaroori hai
    },
    // interviewer's post-interview evaluation (verdict, ratings, remarks)
    feedback: {
        type: feedbackSchema,
        default: null,
    },
}, {timestamps: true});

export const Session = mongoose.model("session",sessionSchema);