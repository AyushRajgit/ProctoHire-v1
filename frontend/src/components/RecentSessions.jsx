import { ClockIcon, CalendarIcon, ActivityIcon } from "lucide-react";
import { Link } from "react-router";

function RecentSessions({ sessions, isLoading }) {
  // 1. Premium Loading State
  if (isLoading) {
    return (
      <div className="relative rounded-[2rem] border border-white/5 bg-gradient-to-b from-[#0A0F1C] to-[#030712] p-8 shadow-2xl mt-8 flex justify-center items-center h-48 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <span className="loading loading-spinner loading-lg text-primary relative z-10"></span>
      </div>
    );
  }

  // 2. Premium Empty State (Jab history khali ho)
  if (!sessions || sessions.length === 0) {
    return (
      <div className="relative rounded-[2rem] border border-white/5 bg-gradient-to-b from-[#0A0F1C] to-[#030712] p-12 shadow-2xl mt-8 text-center flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing Icon Placeholder */}
        <div className="relative z-10 size-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 shadow-inner">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
          <ClockIcon className="size-8 text-slate-500 relative z-10" />
        </div>
        
        <h3 className="relative z-10 text-2xl font-bold text-white mb-3 tracking-tight">No History Yet</h3>
        <p className="relative z-10 text-slate-400 max-w-md mx-auto font-medium">
          Your completed technical interviews and collaborative coding sessions will be securely archived here.
        </p>
      </div>
    );
  }

  // 3. Ultra-Premium Populated State
  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-[#0A0F1C] p-8 md:p-10 shadow-2xl overflow-hidden mt-8">
      
      {/* Ambient Inner Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <h3 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.2)]">
            <ActivityIcon className="size-6 text-primary" />
          </div>
          Session History
        </h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {sessions.map((session) => (
          /* Animated Card Wrapper */
          <div 
            key={session._id}
            className="group relative rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_40px_-10px_rgba(var(--p),0.3)]"
          >
            {/* Border Gradient Magic (dikhega jab hover karoge) */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent group-hover:from-primary/50 group-hover:to-transparent opacity-50 transition-colors duration-500 -z-10" />

            {/* Inner Card Content */}
            <div className="relative h-full p-6 md:p-7 rounded-2xl bg-[#0A0F1C] border border-white/5 overflow-hidden flex flex-col justify-between">
              
              {/* Subtle top-right corner glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-500" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 pr-4">
                    {session.problem}
                  </h4>
                  
                  {/* Sleek Pulsing Badge */}
                  <span className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    Completed
                  </span>
                </div>
                
                {/* Difficulty Tag (agar data me hai toh) */}
                {session.difficulty && (
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-300 capitalize mb-6">
                    {session.difficulty}
                  </span>
                )}
              </div>
              
              {/* Footer of the Card */}
              <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-white/5">
                  <CalendarIcon className="size-3.5" />
                  {new Date(session.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                  })}
                </div>
                
                {/* Sleek Animated Link */}
                <Link 
                  to={`/session/${session._id}`}
                  className="text-sm font-bold text-slate-300 group-hover:text-primary transition-colors flex items-center gap-1.5 bg-transparent px-3 py-1.5 rounded-lg hover:bg-primary/10"
                >
                  Review 
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSessions;