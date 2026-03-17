import { useNavigate, useSearchParams } from "react-router";
import React, { useState } from "react";

function AIMockConstructionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const jobRole = searchParams.get("role") || "Software Engineer";
  const experienceLevel = searchParams.get("level") || "Beginner";
  const skills = searchParams.get("skills") || "General";

  const handleInitiateInterview = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole,
          jobLevel: experienceLevel,
          jobDescription: skills
        })
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      navigate("/ai-live-interview", {
        state: {
          jobRole,
          jobLevel: experienceLevel,
          jobDescription: skills,
          questions: data.questions
        }
      });

    } catch (error) {
      console.error("Error starting AI interview:", error);
      setLoading(false);
    }
  };

  return (
    // ✅ Full screen backdrop — clicking it goes back
    <div
      onClick={() => navigate(-1)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "24px"
      }}
    >
      {/* Dialog box — stop click from bubbling to backdrop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
        }}
      >
        {/* Icon */}
        <div style={{
          width: "56px",
          height: "56px",
          background: "linear-gradient(135deg, #0d9488, #0891b2)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          marginBottom: "20px"
        }}>
          🤖
        </div>

        {/* Title */}
        <h2 style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "8px"
        }}>
          Ready to start your interview?
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
          Make sure your camera and microphone are working. Once started, proctoring will be active.
        </p>

        {/* Interview details */}
        <div style={{
          background: "#1e293b",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#64748b" }}>Role</span>
            <span style={{ color: "white", fontWeight: "600" }}>{jobRole}</span>
          </div>
          <div style={{ height: "1px", background: "#334155" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#64748b" }}>Level</span>
            <span style={{ color: "white", fontWeight: "600" }}>{experienceLevel}</span>
          </div>
          <div style={{ height: "1px", background: "#334155" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#64748b" }}>Skills</span>
            <span style={{ color: "white", fontWeight: "600", textAlign: "right", maxWidth: "250px" }}>{skills}</span>
          </div>
        </div>

        {/* Rules checklist */}
        <div style={{ marginBottom: "28px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            "Keep your face visible on camera at all times",
            "Do not switch tabs during the interview",
            "Interview auto-terminates after 4 violations",
            "5 questions will be asked — answer verbally",
          ].map((rule, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#94a3b8" }}>
              <span style={{ color: "#0d9488", marginTop: "1px" }}>✓</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              padding: "12px",
              background: "transparent",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleInitiateInterview}
            disabled={loading}
            style={{
              flex: 2,
              padding: "12px",
              background: loading
                ? "#134e4a"
                : "linear-gradient(135deg, #0d9488, #0891b2)",
              border: "none",
              borderRadius: "10px",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: "16px", height: "16px",
                  border: "2px solid #ffffff40",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block"
                }} />
                Generating Questions...
              </>
            ) : (
              "🚀 Start Interview"
            )}
          </button>
        </div>

        {/* Spinner keyframe */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

export default AIMockConstructionPage;