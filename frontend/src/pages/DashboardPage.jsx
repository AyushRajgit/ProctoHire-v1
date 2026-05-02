import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import { toast } from "react-hot-toast";
import { LinkIcon, HistoryIcon, ArrowRightIcon, ActivityIcon, Code2Icon, BotIcon } from "lucide-react"; // Naye icons add kiye

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import InterviewHistory from "../components/InterviewHistory";

const BentoBox = ({ children, height = "h-[420px]" }) => (
  <div className={`${height} w-full flex flex-col rounded-2xl bg-[#0A0F1C] border border-white/10 shadow-lg overflow-hidden`}>
    <div className="flex-1 overflow-y-auto p-1
      [&::-webkit-scrollbar]:w-1.5 
      [&::-webkit-scrollbar-track]:bg-transparent 
      [&::-webkit-scrollbar-thumb]:bg-white/5
      hover:[&::-webkit-scrollbar-thumb]:bg-white/20 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      transition-colors"
    >
      <div className="min-h-full">
        {children}
      </div>
    </div>
  </div>
);

function DashboardPage() {          
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });
  const [createdRoomDetails, setCreatedRoomDetails] = useState(null);
  
  // Search Bar State
  const [joinLink, setJoinLink] = useState("");
  
  // Tabs State for History Section
  const [historyTab, setHistoryTab] = useState("live"); // 'live' or 'ai'

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          const sessionId = data?.session?._id || data?._id || data?.data?.session?._id;
          const session = data?.session || data?.data?.session;

          if (!sessionId) {
            toast.error("Invalid session response. Please check console.");
            return;
          }

          setShowCreateModal(false);
          setCreatedRoomDetails({
            id: sessionId,
            password: session.password
          });
        },
        onError: (error) => {
          console.error("Creation Error:", error);
          toast.error("Failed to create session!");
        }
      }
    );
  };

  const copyRoomDetails = () => {
    const roomLink = `${window.location.origin}/session/${createdRoomDetails.id}`;
    const textToCopy = `Join my Interview Room!\nRoom Link: ${roomLink}\nRoom Password: ${createdRoomDetails.password}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Room Details Copied to Clipboard!");
  };

  const handleJoinFromLink = (e) => {
    e.preventDefault();
    if (!joinLink.trim()) return;

    try {
      if (joinLink.includes(window.location.origin) || joinLink.includes('/session/')) {
        const url = new URL(joinLink);
        navigate(url.pathname + url.search);
      } else {
        navigate(`/session/${joinLink.trim()}`);
      }
    } catch (err) {
      navigate(`/session/${joinLink.trim()}`);
    }
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user || !user.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">

      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

      <Navbar />

      <main className="relative z-10 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} user={user} />

          {/* STATS CARDS */}
          <div className="mb-10">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-3xl mx-auto mb-14 relative z-20">
            <form 
              onSubmit={handleJoinFromLink} 
              className="relative flex items-center bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 shadow-2xl focus-within:border-teal-500/50 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all duration-300"
            >
              <div className="pl-4 pr-3 text-slate-400">
                <LinkIcon className="size-5" />
              </div>
              <input
                type="text"
                value={joinLink}
                onChange={(e) => setJoinLink(e.target.value)}
                placeholder="Paste Room Link or Session ID here..."
                className="flex-1 bg-transparent border-none text-white text-base focus:ring-0 py-2.5 outline-none placeholder:text-slate-500 w-full"
              />
              <button 
                type="submit" 
                disabled={!joinLink.trim()}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#030712] text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
              >
                Join Arena <ArrowRightIcon className="size-4" />
              </button>
            </form>
          </div>

          {/* LIVE ARENAS */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ActivityIcon className="size-5 text-teal-500" />
                Active Arenas
              </h2>
            </div>
            <BentoBox height="h-[380px]">
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                user={user}
              />
            </BentoBox>
          </div>

          {/* SESSION HISTORY */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 px-1">
              <div className="flex items-center gap-2">
                <HistoryIcon className="size-5 text-slate-400" />
                <h2 className="text-xl font-bold text-white">
                  Session History
                </h2>
              </div>

              <div className="flex items-center bg-[#0f172a] p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setHistoryTab("live")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    historyTab === "live"
                      ? "bg-[#1e293b] text-white shadow-sm border border-white/5"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Code2Icon className="size-4" /> Live Coding
                </button>
                <button
                  onClick={() => setHistoryTab("ai")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    historyTab === "ai"
                      ? "bg-teal-500/10 text-teal-400 shadow-sm border border-teal-500/20"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <BotIcon className="size-4" /> AI Mocks
                </button>
              </div>
            </div>

            {/* Single Wide Box for History */}
            <BentoBox height="h-[450px]">
              <div className="transition-opacity duration-300">
                {historyTab === "live" ? (
                  <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
                ) : (
                  <InterviewHistory />
                )}
              </div>
            </BentoBox>
          </div>

        </div>
      </main>

      {/* Room Creation Modal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />

      {/* Clean Success Modal */}
      {createdRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            
            <h3 className="text-xl font-bold text-white mb-2">Room Created Successfully</h3>
            <p className="text-slate-400 text-sm mb-6">Share these details with your candidate.</p>

            <div className="space-y-3 mb-8">
              <div className="bg-[#030712] p-4 rounded-lg border border-white/5 cursor-copy hover:border-teal-500/30 transition-colors" onClick={copyRoomDetails}>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Room Link</p>
                <p className="text-teal-400 font-mono text-sm break-all">{`${window.location.origin}/session/${createdRoomDetails.id}`}</p>
              </div>
              <div className="bg-[#030712] p-4 rounded-lg border border-white/5 cursor-copy hover:border-teal-500/30 transition-colors" onClick={copyRoomDetails}>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Room Password</p>
                <p className="text-white font-mono text-xl tracking-[0.2em] font-bold">{createdRoomDetails.password}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate(`/session/${createdRoomDetails.id}`)} className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors">
                Enter Room
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DashboardPage;