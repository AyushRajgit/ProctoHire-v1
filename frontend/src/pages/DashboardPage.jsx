import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar.jsx';
import { Settings, Cpu, ArrowLeft, Sparkles } from 'lucide-react';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-primary/30 overflow-hidden flex flex-col">
      
      {/* === AMBIENT BACKGROUND === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Deep ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[180px] rounded-full mix-blend-screen" />
      </div>

      <Navbar />

      {/* === MAIN DESIGN CENTERPIECE === */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 -mt-16">
        
        {/* THE ANIMATED "GEAR ENGINE" */}
        <div className="relative flex items-center justify-center size-72 md:size-96 mb-12">
          
          {/* 1. Outer HUD Track (Dashed, slow clockwise) */}
          <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-white/10 border-t-primary/40 border-r-primary/40 animate-[spin_20s_linear_infinite]" />
          
          {/* 2. Orbiting Glow Node (Attaches to a separate spinning container) */}
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] size-2 bg-primary rounded-full shadow-[0_0_15px_#10b981]" />
          </div>

          {/* 3. Massive Background Gear (Faint, slow counter-clockwise) */}
          <Settings 
            className="absolute size-64 text-white/5 animate-[spin_15s_linear_infinite_reverse]" 
            strokeWidth={1} 
          />

          {/* 4. Middle HUD Track (Dotted, fast counter-clockwise) */}
          <div className="absolute inset-10 rounded-full border-2 border-dotted border-indigo-500/30 animate-[spin_10s_linear_infinite_reverse]" />

          {/* 5. Inner Primary Gear (Glowing, medium clockwise) */}
          <Settings 
            className="absolute size-40 text-primary/20 animate-[spin_8s_linear_infinite] drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
            strokeWidth={1.5} 
          />

          {/* 6. Central Core Assembly (Glassmorphism sphere) */}
          <div className="relative flex items-center justify-center size-24 rounded-full bg-[#0A0F1C]/80 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] z-20 overflow-hidden group">
             {/* Core internal rotating gradient */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-indigo-500/30 opacity-50 animate-[spin_4s_linear_infinite]" />
             
             {/* Core CPU Icon */}
             <Cpu className="relative size-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>

          {/* 7. Floating Sparkles */}
          <div className="absolute top-6 right-10">
             <Sparkles className="size-5 text-amber-400 animate-pulse duration-[2000ms]" />
          </div>
          <div className="absolute bottom-10 left-10">
             <Sparkles className="size-4 text-primary animate-bounce duration-[3000ms]" />
          </div>
        </div>


        {/* MINIMAL TYPOGRAPHY */}
        <div className="text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold tracking-[0.2em] text-primary/90 uppercase shadow-inner">
            <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#10b981]" />
            System Upgrading
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary to-teal-400 animate-gradient-x">Under</span> Construction 
          </h1>
        </div>

        {/* SUBTLE BACK BUTTON */}
        <div className="mt-16">
          <Link 
            to="/problems" 
            className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors tracking-[0.1em] uppercase"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Return to Base
          </Link>
        </div>

      </main>
    </div>
  );
}

export default DashboardPage;