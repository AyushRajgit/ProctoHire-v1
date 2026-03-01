import { ActivityIcon, HistoryIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Active Sessions Card */}
      <div className="relative group rounded-[2rem] border border-white/10 bg-[#0A0F1C] p-8 overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2 tracking-wide uppercase">Active Sessions</p>
            <h3 className="text-5xl font-extrabold text-white">{activeSessionsCount}</h3>
          </div>
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.2)]">
            <ActivityIcon className="size-7 text-primary" />
          </div>
        </div>
      </div>

      {/* Recent Sessions Card */}
      <div className="relative group rounded-[2rem] border border-white/10 bg-[#0A0F1C] p-8 overflow-hidden hover:border-accent/50 transition-all duration-500 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-2 tracking-wide uppercase">Recent Sessions</p>
            <h3 className="text-5xl font-extrabold text-white">{recentSessionsCount}</h3>
          </div>
          <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <HistoryIcon className="size-7 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;