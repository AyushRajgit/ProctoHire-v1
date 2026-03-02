import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon, ActivityIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // PREMIUM LOADING STATE
  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#0A0F1C]/50 backdrop-blur-sm">
        <div className="relative size-20 flex items-center justify-center mb-6">
          <div className="absolute inset-0 border-4 border-teal-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
          <Loader2Icon className="size-8 text-teal-400" />
        </div>
        <p className="text-xl font-bold text-white tracking-tight">Joining Secure Room...</p>
        <p className="text-slate-500 mt-2 font-medium">Establishing end-to-end encrypted video stream</p>
      </div>
    );
  }

  return (
    // SPACING FIX: p-4 to give breathing room from the edges, gap-6 instead of gap-4
    <div className="h-full flex gap-6 relative str-video p-4 bg-[#0A0F1C]/30">
      
      {/* LEFT SIDE - VIDEO & CONTROLS */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* TOP BAR - Glassmorphic */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#030712]/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-4">
            {/* Live Indicator */}
            <div className="flex items-center justify-center size-10 rounded-xl bg-teal-500/10 border border-teal-500/20 shadow-inner">
              <ActivityIcon className="size-5 text-teal-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white leading-tight">Secure Channel</span>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                {participantCount} {participantCount === 1 ? "participant" : "participants"} active
              </div>
            </div>
          </div>

          {/* Chat Toggle Button - Premium Style */}
          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 border ${
                isChatOpen 
                  ? "bg-teal-500/20 text-teal-400 border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.15)]" 
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              title={isChatOpen ? "Hide chat" : "Show chat"}
            >
              <MessageSquareIcon className="size-4" />
              {isChatOpen ? "Close Chat" : "Open Chat"}
            </button>
          )}
        </div>

        {/* MAIN VIDEO AREA - Deep Dark Wrapper */}
        <div className="flex-1 bg-[#030712] border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
          <SpeakerLayout />
        </div>

        {/* BOTTOM CONTROLS WRAPPER */}
        <div className="bg-[#030712]/60 border border-white/5 rounded-2xl p-3 flex justify-center backdrop-blur-md shadow-lg">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* RIGHT SIDE - CHAT SECTION */}
      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-2xl border shadow-2xl overflow-hidden bg-[#030712] transition-all duration-300 ease-in-out relative ${
            isChatOpen 
              ? "w-[380px] opacity-100 translate-x-0 border-white/10" 
              : "w-0 opacity-0 translate-x-10 pointer-events-none border-transparent"
          }`}
        >
          {isChatOpen && (
            <>
              {/* Subtle Ambient Glow inside chat */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />

              {/* Chat Header */}
              <div className="bg-[#0A0F1C]/80 p-5 border-b border-white/5 flex items-center justify-between relative z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 shadow-inner">
                    <MessageSquareIcon className="size-5 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Session Chat</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  title="Close chat"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              {/* Stream Chat Component Container */}
              <div className="flex-1 overflow-hidden stream-chat-dark relative z-10 bg-transparent">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput focus />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;