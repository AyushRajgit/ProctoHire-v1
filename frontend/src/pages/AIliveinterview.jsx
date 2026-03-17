import React, { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

const AiLiveInterview = () => {
  const [violations, setViolations] = useState(0);
  const [warning, setWarning] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const [showEndDialog, setShowEndDialog] = useState(false); // ✅ NEW
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const streamRef = useRef(null);
  const lastViolationRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    jobRole,
    jobLevel,
    jobDescription,
    questions = [],
  } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [finalScores, setFinalScores] = useState([]);
  const recognitionRef = useRef(null);

  const sessionIdRef = useRef(null);
  const answersRef = useRef([]);
  const violationsLogRef = useRef([]);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/ai-mock");
    }
  }, []);

  useEffect(() => {
    const createSession = async () => {
      try {
        const res = await fetch("/api/interview/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobRole,
            jobLevel,
            jobDescription,
            candidateId: user?.id
          })
        });
        const data = await res.json();
        sessionIdRef.current = data.sessionId;
        console.log("✅ Session created:", data.sessionId);
      } catch (err) {
        console.error("Failed to create session:", err);
      }
    };

    if (jobRole && user?.id) createSession();
  }, [user?.id]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68");
        console.log("✅ Face model loaded");
        setModelsLoaded(true);
      } catch (err) {
        console.error("Model load error:", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera Error:", err);
      }
    };
    startCamera();
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const logViolation = (type) => {
    violationsLogRef.current.push({ type, timestamp: new Date().toISOString() });
  };

  useEffect(() => {
    if (!modelsLoaded) return;

    const interval = setInterval(async () => {
      const video = videoRef.current;
      if (!video) return;
      const canvas = canvasRef.current;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      const resized = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resized);

      const now = Date.now();

      if (detections.length === 0) {
        setWarning("⚠ FACE NOT DETECTED");
        if (now - lastViolationRef.current > 3000) {
          setViolations((prev) => prev + 1);
          logViolation("no_face");
          lastViolationRef.current = now;
        }
      } else if (detections.length > 1) {
        setWarning("⚠ MULTIPLE FACES DETECTED");
        if (now - lastViolationRef.current > 3000) {
          setViolations((prev) => prev + 1);
          logViolation("multiple_faces");
          lastViolationRef.current = now;
        }
      } else {
        setWarning("");
      }

      if (detections.length === 1) {
        const landmarks = detections[0].landmarks;
        const nose = landmarks.getNose()[3];
        const leftEye = landmarks.getLeftEye()[0];
        const rightEye = landmarks.getRightEye()[3];
        const faceCenter = (leftEye.x + rightEye.x) / 2;
        const noseOffset = nose.x - faceCenter;
        const now = Date.now();

        if (noseOffset < -20) {
          setWarning("⚠ Looking LEFT");
          if (now - lastViolationRef.current > 3000) {
            setViolations((prev) => prev + 1);
            logViolation("looking_left");
            lastViolationRef.current = now;
          }
        } else if (noseOffset > 20) {
          setWarning("⚠ Looking RIGHT");
          if (now - lastViolationRef.current > 3000) {
            setViolations((prev) => prev + 1);
            logViolation("looking_right");
            lastViolationRef.current = now;
          }
        }

        const eyeDistance = Math.abs(leftEye.x - rightEye.x);
        if (eyeDistance < 40) {
          setWarning("⚠ Looking Away / Turning Head");
          if (now - lastViolationRef.current > 3000) {
            setViolations((prev) => prev + 1);
            logViolation("looking_away");
            lastViolationRef.current = now;
          }
        }

        const box = detections[0].detection.box;
        if (box.width < 80) {
          setWarning("⚠ Too far from camera");
          if (now - lastViolationRef.current > 3000) {
            setViolations((prev) => prev + 1);
            logViolation("too_far");
            lastViolationRef.current = now;
          }
        }
      }
    }, 700);

    return () => clearInterval(interval);
  }, [modelsLoaded]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("⚠️ Tab switching detected!");
        setViolations((prev) => prev + 1);
        logViolation("tab_switch");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (violations >= 4) {
      if (timerRef.current) clearInterval(timerRef.current);
      stopCamera();
      setTimeout(async () => {
        alert("Interview terminated due to suspicious activity.");
        await saveAndExit(true);
      }, 100);
    }
  }, [violations]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (questions.length > 0) speak(questions[currentIndex]);
  }, [currentIndex, questions]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Speech Recognition not supported"); return; }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += t + " ";
      }
      setTranscript((prev) => prev + finalTranscript);
    };
    recognition.onerror = (event) => { console.error(event.error); setIsListening(false); };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) { recognitionRef.current.stop(); setIsListening(false); }
  };

  const evaluateAnswer = async () => {
    if (!transcript.trim()) { alert("Please provide an answer before submitting."); return; }
    try {
      const res = await fetch("/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questions[currentIndex], answer: transcript, jobRole, jobLevel }),
      });
      if (!res.ok) throw new Error("Failed to evaluate answer");
      const data = await res.json();
      if (data.error) { alert("Error: " + data.error); return; }
      setFeedback(data.feedback);
      setFinalScores((prev) => [...prev, data.feedback.score]);
      answersRef.current.push({
        question: questions[currentIndex],
        answer: transcript,
        score: data.feedback.score,
        strengths: data.feedback.strengths,
        improvements: data.feedback.improvements,
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Failed to evaluate answer. Please try again.");
    }
  };

  const saveAndExit = async (terminatedEarly = false) => {
    try {
      if (sessionIdRef.current) {
        await fetch("/api/interview/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            questions: answersRef.current,
            violations: violationsLogRef.current,
            terminatedEarly,
          }),
        });
        console.log("✅ Interview saved to DB");
      }
    } catch (err) {
      console.error("Failed to save interview:", err);
    }
    stopCamera();
    navigate("/dashboard");
  };

  const nextQuestion = async () => {
    setTranscript("");
    setFeedback(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const scores = answersRef.current.map((a) => a.score);
      const total = scores.reduce((a, b) => a + b, 0) / scores.length;
      alert(`Interview Completed 🎉\nAverage Score: ${total.toFixed(1)}/10`);
      if (timerRef.current) clearInterval(timerRef.current);
      await saveAndExit(false);
    }
  };

  // ✅ CHANGED — now opens dialog instead of immediately ending
  const endInterview = () => {
    setShowEndDialog(true);
  };

  // ✅ NEW — called when user confirms end in the dialog
  const confirmEndInterview = async () => {
    setShowEndDialog(false);
    if (timerRef.current) clearInterval(timerRef.current);
    await saveAndExit(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "white" }}>

      {/* ✅ NEW — End Interview Confirmation Dialog */}
      {showEndDialog && (
        <div
          onClick={() => setShowEndDialog(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 100, padding: "24px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f172a", border: "1px solid #334155",
              borderRadius: "20px", padding: "36px", maxWidth: "420px",
              width: "100%", boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
            }}
          >
            {/* Icon */}
            <div style={{
              width: "52px", height: "52px", background: "#450a0a",
              borderRadius: "14px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "24px", marginBottom: "20px"
            }}>
              ⚠️
            </div>

            <h2 style={{ color: "white", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              End Interview?
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "12px" }}>
              Are you sure you want to end the interview early?
            </p>

            {/* Progress summary */}
            <div style={{
              background: "#1e293b", borderRadius: "10px", padding: "14px 16px",
              marginBottom: "24px", display: "flex", justifyContent: "space-between",
              fontSize: "13px"
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>
                  {currentIndex + 1} / {questions.length}
                </div>
                <div style={{ color: "#64748b", marginTop: "2px" }}>Questions</div>
              </div>
              <div style={{ width: "1px", background: "#334155" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>
                  {formatTime()}
                </div>
                <div style={{ color: "#64748b", marginTop: "2px" }}>Time Elapsed</div>
              </div>
              <div style={{ width: "1px", background: "#334155" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{
                  color: violations > 0 ? "#ef4444" : "white",
                  fontWeight: "700", fontSize: "18px"
                }}>
                  {violations} / 4
                </div>
                <div style={{ color: "#64748b", marginTop: "2px" }}>Violations</div>
              </div>
            </div>

            <p style={{ color: "#475569", fontSize: "12px", marginBottom: "24px" }}>
              Your progress so far will be saved. You can view the partial report on your dashboard.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowEndDialog(false)}
                style={{
                  flex: 1, padding: "12px", background: "transparent",
                  border: "1px solid #334155", borderRadius: "10px",
                  color: "#94a3b8", cursor: "pointer", fontSize: "14px", fontWeight: "500"
                }}
              >
                Continue Interview
              </button>

              <button
                onClick={confirmEndInterview}
                style={{
                  flex: 1, padding: "12px",
                  background: "#dc2626",
                  border: "none", borderRadius: "10px",
                  color: "white", cursor: "pointer",
                  fontSize: "14px", fontWeight: "700"
                }}
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDE — AI INTERVIEWER */}
      <div style={{
        flex: 1, padding: "40px", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", borderRight: "1px solid #1e293b"
      }}>
        <img src="/male_commercial.jpg" alt="AI Interviewer"
          style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "20px", background: "#1e293b", padding: "15px" }}
        />
        <h2 style={{ marginBottom: "30px" }}>AI Interviewer</h2>

        {questions.length > 0 && (
          <>
            <h3>Question {currentIndex + 1} of {questions.length}</h3>
            <p style={{ maxWidth: "500px", textAlign: "center", fontSize: "18px" }}>
              {questions[currentIndex]}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={startListening} disabled={isListening}
                style={{ padding: "10px 20px", background: isListening ? "#94a3b8" : "#22c55e", border: "none", borderRadius: "8px", cursor: isListening ? "not-allowed" : "pointer", fontWeight: "bold", color: "white" }}>
                {isListening ? "🎤 Listening..." : "🎤 Start Speaking"}
              </button>
              <button onClick={stopListening} disabled={!isListening}
                style={{ padding: "10px 20px", background: !isListening ? "#ef4444" : "#94a3b8", border: "none", borderRadius: "8px", cursor: !isListening ? "pointer" : "not-allowed", fontWeight: "bold", color: "white" }}>
                🛑 Stop
              </button>
            </div>

            <p style={{ marginTop: "20px" }}><strong>Your Answer:</strong> {transcript}</p>

            <button onClick={evaluateAnswer}
              style={{ marginTop: "10px", padding: "10px 20px", background: "#3b82f6", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Submit Answer
            </button>

            {feedback && (
              <div style={{ marginTop: "25px", textAlign: "center" }}>
                <h4>AI Feedback</h4>
                <p>Score: {feedback.score}/10</p>
                <p>Strengths: {feedback.strengths}</p>
                <p>Improvements: {feedback.improvements}</p>
                <button onClick={nextQuestion}
                  style={{ marginTop: "10px", padding: "10px 20px", background: "#f59e0b", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                  {currentIndex < questions.length - 1 ? "Next Question →" : "Finish Interview 🎉"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* RIGHT SIDE — CANDIDATE CAMERA */}
      <div style={{ flex: 1, background: "#111", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video ref={videoRef} autoPlay muted
          style={{ width: "90%", height: "90%", objectFit: "cover", borderRadius: "12px" }} />
        <canvas ref={canvasRef}
          style={{ position: "absolute", width: "90%", height: "90%" }} />

        {warning && (
          <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", background: "#dc2626", color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}>
            ⚠ {warning}
          </div>
        )}

        <div style={{ position: "absolute", top: "20px", left: "20px", background: "red", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "13px" }}>
          ● Interview Active
        </div>
        <div style={{ position: "absolute", top: "20px", right: "20px", background: "#1e293b", padding: "6px 12px", borderRadius: "6px" }}>
          ⏱ {formatTime()}
        </div>

        <button onClick={endInterview}
          style={{ position: "absolute", bottom: "20px", right: "20px", padding: "10px 20px", background: "#ef4444", border: "none", borderRadius: "8px", color: "white", cursor: "pointer" }}>
          End Interview
        </button>

        <div style={{ position: "absolute", bottom: "20px", left: "20px", background: "#1e293b", padding: "8px 12px", borderRadius: "6px" }}>
          Violations: {violations} / 4
        </div>
      </div>
    </div>
  );
};

export default AiLiveInterview;