import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import { toast } from "react-hot-toast";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  
  // Clerk se user data aur loading state nikal li
  const { user, isLoaded } = useUser(); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  // Nayi states (Room Create hone ke baad Link dikhane ke liye)
  const [createdRoomDetails, setCreatedRoomDetails] = useState(null);

  // Nayi states (Active Sessions se manually join karne ke liye)
  const [joinRoomId, setJoinRoomId] = useState(null);
  const [manualPassword, setManualPassword] = useState("");

  // API Hooks
  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  // Room Create karne ka logic
  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          console.log("API response:", data);

          const sessionId = data?.session?._id || data?._id || data?.data?.session?._id;
          const session = data?.session || data?.data?.session;

          if (!sessionId) {
            toast.error("Invalid session response. Please check console.");
            return;
          }

          setShowCreateModal(false);
          
          // 🔥 Direct navigate nahi karna! Password modal dikhana hai
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

  // Host ko invite link copy karne ka feature
  const copyRoomDetails = () => {
    const magicLink = `${window.location.origin}/session/${createdRoomDetails.id}?pwd=${createdRoomDetails.password}`;
    const textToCopy = `Join my Interview Room!\nMagic Link: ${magicLink}\n\nOr join manually with Password: ${createdRoomDetails.password}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Room Details Copied to Clipboard!");
  };

  // Active Sessions list se join button click handle karna
  const handleJoinClick = (sessionId) => {
      // Pura join api toh us page pe hai, yahan se bas id leke page pe redirect karo
      // Wahan session page khud password mangega
      navigate(`/session/${sessionId}`);
  }

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user || !user.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-primary/30 overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
            </div>
            
            <div className="lg:col-span-2">
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>
          </div>

          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          
        </div>
      </main>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />

      {createdRoomDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2">Room Created! 🎉</h3>
              <p className="text-slate-400 text-sm mb-6">Share these details with your candidate so they can join.</p>
              
              <div className="space-y-4 mb-6">
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                     <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Room Link</p>
                     <p className="text-teal-400 font-mono text-sm break-all">{`${window.location.origin}/session/${createdRoomDetails.id}`}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5">
                     <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">Room Password</p>
                     <p className="text-white font-mono text-xl tracking-[0.2em]">{createdRoomDetails.password}</p>
                  </div>
              </div>

              <div className="flex gap-3">
                 <button onClick={copyRoomDetails} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
                    Copy Details
                 </button>
                 
                 <button onClick={() => navigate(`/session/${createdRoomDetails.id}`)} className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#030712] font-bold transition-colors shadow-lg shadow-teal-500/25">
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