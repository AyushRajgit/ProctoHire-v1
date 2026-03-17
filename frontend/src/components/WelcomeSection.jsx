import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, PlusIcon, TerminalSquare } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden mb-10">
      
      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-12 bg-[#0A0F1C] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden z-10 group/welcome">
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen transition-all duration-700 group-hover/welcome:bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="flex-1">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6 shadow-sm uppercase tracking-widest backdrop-blur-md">
              <TerminalSquare className="size-3.5" />
              Your dashboard
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Welcome back, <br className="hidden md:block lg:hidden" />
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent italic">
                {user?.firstName || "Developer"}
              </span>!
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed font-medium">
              Eliminate bias and ensure technical integrity with our high-performance collaborative environment.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto pt-4 md:pt-0">
            <button
              onClick={onCreateSession}
              className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(var(--p),0.3)] hover:shadow-[0_0_50px_rgba(var(--p),0.5)] border border-white/10 overflow-hidden"
            >
              
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <PlusIcon className="size-6 relative z-10" />
              <span className="relative z-10">Launch Session</span>
              <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;