import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function InterviewHistory() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); 

  // Backend URL variable
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/interview/history/${user.id}`);
        const data = await res.json();
        setInterviews(data.interviews || []);
      } catch (err) {
        console.error("Failed to fetch interviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchInterviews();
  }, [user]);

  const handleDelete = async (sessionId) => {
    const confirmed = window.confirm("Delete this interview report? This cannot be undone.");
    if (!confirmed) return;

    setDeletingId(sessionId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/interview/delete/${sessionId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setInterviews((prev) => prev.filter((i) => i.sessionId !== sessionId));
    } catch (err) {
      console.error("Failed to delete interview:", err);
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7.5) return "#22c55e";
    if (score >= 5) return "#f59e0b";
    return "#ef4444";
  };

  const getStatusBadge = (status) => {
    if (status === "completed") return { label: "Completed", bg: "#14532d", color: "#22c55e" };
    if (status === "terminated") return { label: "Terminated", bg: "#450a0a", color: "#ef4444" };
    return { label: status, bg: "#1e293b", color: "#94a3b8" };
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (start, end) => {
    if (!start || !end) return "N/A";
    const mins = Math.round((new Date(end) - new Date(start)) / 60000);
    return `${mins} min`;
  };

  if (loading) {
    return (
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "white", marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
          🎯 AI Interview History
        </h2>
        <div style={{ color: "#94a3b8", padding: "40px", textAlign: "center" }}>
          Loading interviews...
        </div>
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "white", marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
          🎯 AI Interview History
        </h2>
        <div style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "48px",
          textAlign: "center",
          color: "#94a3b8"
        }}>
          <p style={{ fontSize: "40px", marginBottom: "12px" }}>🤖</p>
          <p style={{ fontSize: "16px", marginBottom: "8px", color: "white" }}>No interviews yet</p>
          <p style={{ fontSize: "14px" }}>Start an AI mock interview to see your history here.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ color: "white", marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
        🎯 AI Interview History
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {interviews.map((interview) => {
          const badge = getStatusBadge(interview.status);
          const scoreColor = getScoreColor(interview.overallScore);
          const violationCount = interview.violations?.length || 0;
          const isDeleting = deletingId === interview.sessionId;

          return (
            <div
              key={interview.sessionId}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                opacity: isDeleting ? 0.5 : 1,  
                transition: "opacity 0.2s"
              }}
            >
              {/* Left — role and meta */}
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "18px" }}>💼</span>
                  <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                    {interview.jobRole}
                  </span>
                  <span style={{
                    background: badge.bg,
                    color: badge.color,
                    padding: "2px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {badge.label}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "16px", color: "#64748b", fontSize: "13px" }}>
                  <span>📅 {formatDate(interview.startTime)}</span>
                  <span>⏱ {formatDuration(interview.startTime, interview.endTime)}</span>
                  <span>🎓 {interview.jobLevel}</span>
                  {violationCount > 0 && (
                    <span style={{ color: "#ef4444" }}>⚠ {violationCount} violations</span>
                  )}
                </div>
              </div>

              {/* Right — score, view button, delete button */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: scoreColor,
                    lineHeight: 1
                  }}>
                    {interview.overallScore?.toFixed(1) ?? "—"}
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                    out of 10
                  </div>
                </div>

                {/* View Report button */}
                <button
                  onClick={() => navigate(`/interview-report/${interview.sessionId}`)}
                  style={{
                    padding: "8px 18px",
                    background: "transparent",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={e => {
                    e.target.style.borderColor = "#0ea5e9";
                    e.target.style.color = "#0ea5e9";
                  }}
                  onMouseLeave={e => {
                    e.target.style.borderColor = "#334155";
                    e.target.style.color = "#94a3b8";
                  }}
                >
                  View Report →
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(interview.sessionId)}
                  disabled={isDeleting}
                  style={{
                    padding: "8px 14px",
                    background: "transparent",
                    border: "1px solid #450a0a",
                    borderRadius: "8px",
                    color: "#ef4444",
                    cursor: isDeleting ? "not-allowed" : "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={e => {
                    if (!isDeleting) {
                      e.target.style.background = "#450a0a";
                      e.target.style.color = "#fca5a5";
                    }
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#ef4444";
                  }}
                >
                  {isDeleting ? "Deleting..." : "🗑 Delete"}
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InterviewHistory;