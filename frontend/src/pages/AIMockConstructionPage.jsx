import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeftIcon, BotIcon, SparklesIcon, BriefcaseIcon, GraduationCapIcon, TerminalIcon } from "lucide-react";
import Navbar from "../components/Navbar";

function AIMockConstructionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL parameters se details extract kar rahe hain
  const jobRole = searchParams.get("role") || "Software Engineer";
  const experienceLevel = searchParams.get("level") || "Beginner";
  const skills = searchParams.get("skills") || "General";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-teal-500/30 flex flex-col overflow-hidden relative">

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 border-b border-white/5 bg-[#030712]/50 backdrop-blur-md">
        <Navbar />
      </div>

      {/* ML Moal Integration goes here... */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 mt-16">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-200">
          Hey <span className="text-white">Swasti</span>, this is your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 font-extrabold">Arena.</span> Go and ace it! ✨
        </h1>
      </main>
    </div>
  );
}

export default AIMockConstructionPage;