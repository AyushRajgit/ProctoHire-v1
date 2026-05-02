import { Code2Icon, PlayCircleIcon, UsersIcon, ArrowRightIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";


function ActiveSessions({ sessions, isLoading, isUserInSession, user }) {
  return (
    <div className="lg:col-span-2 relative rounded-[2rem] border border-white/10 bg-[#0A0F1C] p-8 flex flex-col h-full shadow-lg">

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
          </span>
          Live Rooms
        </h3>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-teal-500"></span>
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-white/5 border-dashed rounded-3xl bg-white/[0.02]">
          <Code2Icon className="size-12 text-slate-600 mb-4" />
          <p className="text-slate-400 font-medium">No active sessions right now.</p>
          <p className="text-slate-500 text-sm mt-1">Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-teal-500/30 hover:bg-white/[0.04] transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shrink-0 text-teal-400 transition-colors">
                  <Code2Icon className="size-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-0.5 group-hover:text-teal-400 transition-colors duration-200">
                    {session.problem}
                  </h4>


                  {/* Hosted By Info */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-2.5 uppercase tracking-wide">
                    <UserIcon className="size-3" />
                    <span>
                      Hosted by{" "}
                      <span className="text-teal-400/80">
                        {user?.firstName || "User"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 uppercase tracking-wider font-semibold text-slate-300">
                      {session.difficulty}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      <UsersIcon className="size-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-300">{session.participant ? "2/2" : "1/2"}</span>
                    </span>
                  </div>
                </div>
              </div>

              {isUserInSession(session) ? (
                /* REJOIN BUTTON */
                <Link
                  to={`/session/${session._id}`}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <PlayCircleIcon className="size-4" />
                  <span>Rejoin</span>
                </Link>
              ) : (
                /* JOIN BUTTON */
                <Link
                  to={`/session/${session._id}`}
                  className={`px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-opacity ${session.participant
                      ? "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:opacity-90"
                    }`}
                  onClick={(e) => session.participant && e.preventDefault()}
                >
                  <span>{session.participant ? "Room Full" : "Join Session"}</span>
                  {!session.participant && (
                    <ArrowRightIcon className="size-4" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveSessions;