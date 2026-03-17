import { LayoutDashboardIcon, BookOpenIcon, Terminal, BotIcon, XIcon, BriefcaseIcon, GraduationCapIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiConfig, setAiConfig] = useState({ role: "", level: "Beginner" });

  const handleStartAiMock = (e) => {
    e.preventDefault();
    if (!aiConfig.role || !aiConfig.level) return;

    // Close modal
    setShowAiModal(false);

    // URL me parameters encode karke add kar rahe hain (ab skills bhi included hai)
    const urlParams = new URLSearchParams({
      role: aiConfig.role,
      level: aiConfig.level,
      skills: aiConfig.skills || "Not Specified" // Naya param
    }).toString();

    // Redirect to the AI mock page with all the details
    navigate(`/ai-mock?${urlParams}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to={'/'} className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative size-10 rounded-xl bg-[#0A0F1C] flex items-center justify-center border border-white/10">
                <Terminal className="size-5 text-primary" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white">
              Procto<span className="text-primary">Hire</span>
            </span>
          </Link>

          {/* NAVIGATION LINKS & AUTH */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* AI MOCK BUTTON */}
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-x-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 text-teal-400 hover:text-white hover:bg-teal-500/10 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)] group"
            >
              <BotIcon className="size-4 group-hover:animate-bounce" />
              <span className="hidden sm:inline">AI Mock</span>
            </button>

            {/* PROBLEMS PAGE LINK */}
            <Link
              to={"/problems"}
              className={`flex items-center gap-x-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${isActive("/problems")
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <BookOpenIcon className={`size-4 ${isActive("/problems") ? "fill-primary/20" : ""}`} />
              <span className="hidden sm:inline">Problems</span>
            </Link>

            {/* DASHBOARD PAGE LINK */}
            <Link
              to={"/dashboard"}
              className={`flex items-center gap-x-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${isActive("/dashboard")
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.1)]"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <LayoutDashboardIcon className={`size-4 ${isActive("/dashboard") ? "fill-primary/20" : ""}`} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* USER PROFILE BUTTON */}
            <div className="ml-2 pl-4 border-l border-white/10 flex items-center justify-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-9 border border-white/10 shadow-lg transition-transform hover:scale-105"
                  }
                }}
              />
            </div>

          </div>
        </div>
      </nav>

      {/* AI MOCK SETUP MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#030712]/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#0A0F1C] border border-white/10 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">

            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-colors"
            >
              <XIcon className="size-5" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="size-12 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                <BotIcon className="size-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">AI Mock Setup</h3>
                <p className="text-sm text-slate-400">Tailor your AI interviewer</p>
              </div>
            </div>

            <form onSubmit={handleStartAiMock} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Role Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <BriefcaseIcon className="size-4 text-teal-500" /> Target Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Developer"
                    className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600"
                    value={aiConfig.role}
                    onChange={(e) => setAiConfig({ ...aiConfig, role: e.target.value })}
                    autoFocus
                  />
                </div>

                {/* Years of Experience Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <GraduationCapIcon className="size-4 text-teal-500" /> Experience Level
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all cursor-pointer"
                      value={aiConfig.level}
                      onChange={(e) => setAiConfig({ ...aiConfig, level: e.target.value })}
                    >
                      <option value="Fresher" className="bg-[#0A0F1C]">Fresher (0 Years)</option>
                      <option value="Beginner" className="bg-[#0A0F1C]">Beginner (1-2 Years)</option>
                      <option value="Intermediate" className="bg-[#0A0F1C]">Intermediate (3-5 Years)</option>
                      <option value="Professional" className="bg-[#0A0F1C]">Expert (5+ Years)</option>
                    </select>
                    {/* Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Skills Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Terminal className="size-4 text-teal-500" /> Core Tech Stack
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Node.js, MongoDB, AWS..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600"
                  value={aiConfig.skills || ""}
                  onChange={(e) => setAiConfig({ ...aiConfig, skills: e.target.value })}
                />
              </div>

              {/* Resume / Job Description Paste Area */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpenIcon className="size-4 text-teal-500" /> Paste Resume or Job Description
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded">Optional</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste your resume text or the target job description here to get highly personalized questions..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600 resize-none custom-scrollbar"
                  value={aiConfig.resumeText || ""}
                  onChange={(e) => setAiConfig({ ...aiConfig, resumeText: e.target.value })}
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-[#030712] font-extrabold text-base transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <BotIcon className="size-5" /> Initialize AI Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;