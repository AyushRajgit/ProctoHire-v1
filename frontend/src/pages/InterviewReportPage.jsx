import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function InterviewReportPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; 
        
        console.log(`Fetching report for session: ${sessionId}`);
        
        const res = await fetch(`${baseUrl}/api/interview/report/${sessionId}`);
      
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Backend Response:", data); 
        if (data.interview) {
          setInterview(data.interview);
        } else {
          setInterview(data); 
        }

      } catch (err) {
        console.error("Failed to fetch report:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchReport();
    }
  }, [sessionId]);

  const getScoreColor = (score) => {
    if (score >= 7.5) return "#22c55e";
    if (score >= 5) return "#f59e0b";
    return "#ef4444";
  };

  const getRecommendation = (score) => {
    if (score >= 7.5) return { label: "Strong Hire ✅", color: "#22c55e" };
    if (score >= 6) return { label: "Hire 👍", color: "#86efac" };
    if (score >= 4) return { label: "Maybe 🤔", color: "#f59e0b" };
    return { label: "No Hire ❌", color: "#ef4444" };
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  const formatDuration = (start, end) => {
    if (!start || !end) return "N/A";
    const mins = Math.round((new Date(end) - new Date(start)) / 60000);
    return `${mins} minutes`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
        Loading report...
      </div>
    );
  }

  if (!interview) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
        Report not found.
      </div>
    );
  }

  const recommendation = getRecommendation(interview.overallScore);
  const violationCount = interview.violations?.length || 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "40px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "transparent",
            border: "1px solid #334155",
            color: "#94a3b8",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "32px",
            fontSize: "14px"
          }}
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div style={{
          background: "#1e293b",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          border: "1px solid #334155"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
                📋 Interview Report
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "4px" }}>
                📅 {formatDate(interview.startTime)}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "4px" }}>
                ⏱ Duration: {formatDuration(interview.startTime, interview.endTime)}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                💼 {interview.jobRole} — {interview.jobLevel}
              </p>
            </div>

            {/* Overall score */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "56px",
                fontWeight: "800",
                color: getScoreColor(interview.overallScore),
                lineHeight: 1
              }}>
                {interview.overallScore?.toFixed(1) ?? "—"}
              </div>
              <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>Overall Score</div>
              <div style={{
                marginTop: "8px",
                color: recommendation.color,
                fontWeight: "600",
                fontSize: "14px"
              }}>
                {recommendation.label}
              </div>
            </div>
          </div>

          {/* Proctoring summary */}
          {violationCount > 0 && (
            <div style={{
              marginTop: "20px",
              background: "#450a0a",
              border: "1px solid #7f1d1d",
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>⚠️</span>
              <span style={{ color: "#fca5a5", fontSize: "14px" }}>
                {violationCount} proctoring violation{violationCount > 1 ? "s" : ""} detected during this interview
              </span>
            </div>
          )}
        </div>

        {/* Questions breakdown */}
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
          📝 Question Breakdown
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {interview.questions?.map((q, index) => (
            <div
              key={index}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              {/* Question header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "600" }}>
                  Q{index + 1}
                </span>
                <span style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: getScoreColor(q.score)
                }}>
                  {q.score}/10
                </span>
              </div>

              {/* Score bar */}
              <div style={{
                background: "#0f172a",
                borderRadius: "4px",
                height: "6px",
                marginBottom: "16px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${(q.score / 10) * 100}%`,
                  height: "100%",
                  background: getScoreColor(q.score),
                  borderRadius: "4px",
                  transition: "width 0.5s ease"
                }} />
              </div>

              <p style={{ color: "white", fontWeight: "500", marginBottom: "12px", fontSize: "15px" }}>
                {q.question}
              </p>

              {q.answer && (
                <div style={{
                  background: "#0f172a",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px"
                }}>
                  <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "4px", fontWeight: "600" }}>
                    CANDIDATE ANSWER
                  </p>
                  <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
                    {q.answer}
                  </p>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {q.strengths && (
                  <div style={{
                    background: "#052e16",
                    border: "1px solid #14532d",
                    borderRadius: "8px",
                    padding: "12px"
                  }}>
                    <p style={{ color: "#86efac", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                      ✅ STRENGTHS
                    </p>
                    <p style={{ color: "#bbf7d0", fontSize: "13px", lineHeight: "1.5" }}>
                      {q.strengths}
                    </p>
                  </div>
                )}

                {q.improvements && (
                  <div style={{
                    background: "#431407",
                    border: "1px solid #7c2d12",
                    borderRadius: "8px",
                    padding: "12px"
                  }}>
                    <p style={{ color: "#fdba74", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                      🔧 IMPROVEMENTS
                    </p>
                    <p style={{ color: "#fed7aa", fontSize: "13px", lineHeight: "1.5" }}>
                      {q.improvements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Violations log */}
        {violationCount > 0 && (
          <>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
              🚨 Proctoring Log
            </h2>
            <div style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "32px"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {interview.violations?.map((v, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "#0f172a",
                      borderRadius: "6px",
                      fontSize: "13px"
                    }}
                  >
                    <span style={{ color: "#fca5a5" }}>
                      ⚠ {v.type?.replace(/_/g, " ").toUpperCase()}
                    </span>
                    <span style={{ color: "#64748b" }}>
                      {new Date(v.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default InterviewReportPage;