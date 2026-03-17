import { Link } from "react-router";
import { ArrowRightIcon, ZapIcon, CheckCircle2, PlayCircle, Terminal, Globe2, ShieldCheck, VideoIcon, Code2Icon, UsersIcon, Linkedin, Github, Mail, Heart, CheckCircle2Icon, LayoutDashboardIcon, PlayIcon, TerminalIcon, GlobeIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { teamMembers } from "../Server_Data/team";

function HomePage() {
  return (
    <div className='min-h-screen bg-[#030712] text-slate-200 selection:bg-primary/30 selection:text-white overflow-x-hidden'>
      {/* ADAPTIVE BACKGROUND GRID */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-20" />
      </div>

      {/* NAVBAR */}
      <nav className='fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#030712]/20 backdrop-blur-xl'>
        <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
          <Link to={'/'} className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative size-10 rounded-xl bg-black flex items-center justify-center border border-white/10">
                <Terminal className="size-5 text-primary" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white">Procto<span className="text-primary">Hire</span></span>
          </Link>

          <SignInButton mode="modal">
            <button className="relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none group">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#393BB2_50%,#E2E8F0_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl group-hover:bg-slate-900 transition-colors gap-2">
                Get Started <ArrowRightIcon className="size-4" />
              </span>
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main id="Hero-Section" className="relative z-10 max-w-7xl mx-auto px-6 py-38 pb-32">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v2.0 is now live: AI-Powered Insights
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 max-w-4xl leading-[1.1]">
            Engineering hiring, <br />
            <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">reimagined.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
            Eliminate bias and ensure technical integrity with our high-performance
            collaborative environment. Built for teams who care about <strong>trust</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-lg rounded-2xl px-10 text-white border-none hover:scale-105 transition-transform shadow-[0_0_20px_rgba(var(--p),0.3)]">
                Start Hiring Now
              </button>
            </SignInButton>
            <button className="btn btn-ghost btn-lg rounded-2xl gap-2 text-slate-300 hover:bg-white/5">
              <PlayCircle className="size-5" />
              Watch the demo
            </button>
          </div>
        </div>

        {/* INTERACTIVE MOCKUP */}
        <div className="relative group mx-auto max-w-5xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-[2rem] border border-white/10 bg-[#0A0F1C] p-2 shadow-2xl overflow-hidden">
            <div className="rounded-[1.5rem] border border-white/5 overflow-hidden bg-[#030712] relative aspect-video">
              <img
                src="/hero.png"
                className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
                alt="Editor Interface"
              />

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4">
                  <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="text-green-500 size-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Security Status</p>
                    <p className="text-sm font-bold text-white">Proctoring Active</p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="size-10 rounded-full border-2 border-[#030712] bg-slate-800" />
                  ))}
                  <div className="size-10 rounded-full border-2 border-[#030712] bg-primary flex items-center justify-center text-[10px] font-bold">+12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: VideoIcon, title: "HD Video Calls", desc: "Crystal clear video and audio for seamless communication during interviews" },
            { icon: Code2Icon, title: "Live Code Editor", desc: "Collaborate in real-time with syntax highlighting and multiple language support" },
            { icon: UsersIcon, title: "Easy Collaboration", desc: "Share your screen, discuss solutions, and learn from each other in real-time" }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/50 transition-all duration-300">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">From setup to success in seconds</h2>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {[
            { step: "01", title: "Create Room", desc: "Generate a secure interview link instantly.", icon: <LayoutDashboardIcon className="size-5" /> },
            { step: "02", title: "Join Face-to-Face", desc: "Connect via high-fidelity video and audio.", icon: <UsersIcon className="size-5" /> },
            { step: "03", title: "Solve Together", desc: "Write, run, and debug code collaboratively.", icon: <PlayIcon className="size-5" /> },
            { step: "04", title: "Review & Hire", desc: "Playback code history and make decisions.", icon: <CheckCircle2Icon className="size-5" /> },
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="size-12 rounded-full bg-[#050505] border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 z-10 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                {item.icon}
              </div>
              <div className="text-sm font-mono text-indigo-500 mb-2">Step {item.step}</div>
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPER / STUDENT AUDIENCE SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 flex flex-col justify-center">

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built for whoever is at the keyboard.</h2>

            <p className="text-slate-400 mb-8 leading-relaxed">Whether you are a hyper-growth startup hiring top talent, or a group of friends grinding LeetCode, our infrastructure scales to your needs.</p>

            <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors w-fit">

              Explore Use Cases <ArrowRightIcon className="size-4" />

            </button>

          </div>



          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">

            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 relative overflow-hidden group">

              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">

                <GlobeIcon className="size-24 text-indigo-500" />

              </div>

              <div className="relative z-10">

                <h4 className="text-xl font-semibold text-white mb-2">For Students</h4>

                <ul className="space-y-3 mt-6">

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-indigo-400" /> Mock interviews with peers</li>

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-indigo-400" /> Real-time DSA practice</li>

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-indigo-400" /> Placement preparation</li>

                </ul>

              </div>

            </div>



            <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 relative overflow-hidden group">

              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">

                <TerminalIcon className="size-24 text-fuchsia-500" />

              </div>

              <div className="relative z-10">

                <h4 className="text-xl font-semibold text-white mb-2">For Recruiters</h4>

                <ul className="space-y-3 mt-6">

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-fuchsia-400" /> Standardized environments</li>

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-fuchsia-400" /> Code playback & history</li>

                  <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2Icon className="size-4 text-fuchsia-400" /> Zero setup required</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TEAM SLIDE BAR */}
      <div id="Our-Team" className="py-36 pb-60 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Meet the <span className="text-primary italic">Visionaries</span></h2>
          <p className="text-slate-400">The engineers and designers building the future of technical trust.</p>
        </div>

        {/* INFINITE SCROLL CONTAINER */}
        <div className="relative flex overflow-hidden select-none cursor-pointer group/container">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030712] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030712] to-transparent z-20 pointer-events-none" />

          <div
            className="flex flex-nowrap gap-8 animate-scroll py-4 group-hover/container:[animation-play-state:paused] group-active/container:[animation-play-state:paused]"
          >
            {[...teamMembers, ...teamMembers].map((member, i) => (
              <div
                key={i}
                className="w-80 flex-shrink-0 group/card relative"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0A0F1C] transition-all duration-500 group-hover/card:border-primary/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">{member.role}</p>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{member.name}</h3>

                    <div className="flex gap-3 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                      <button
                        onClick={() => window.open(member.links.Linkedin, '_blank')}
                        className="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#0077b5] border border-white/10 transition-all"
                      >
                        <Linkedin className="size-5 text-white" />
                      </button>
                      <button
                        onClick={() => window.open(member.links.github, '_blank')}
                        className="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary border border-white/10 transition-all"
                      >
                        <Github className="size-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Spotlight Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--p),0.1),transparent_70%)] transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030712] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* BRAND COLUMN */}
            <div className="col-span-1 md:col-span-1">
              <Link to={'/'} className='flex items-center gap-3 mb-6 group'>
                <div className="relative size-9 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Terminal className="size-5 text-primary" />
                </div>
                <span className="font-bold text-xl tracking-tighter text-white">
                  Procto<span className="text-primary">Hire</span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The ultimate platform for collaborative coding interviews and technical trust. Built for elite engineering teams.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="size-5" /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="size-5" /></a>
              </div>
            </div>

            {/* LINK COLUMNS */}
            <div>
              <h4 className="text-white font-bold mb-6">Features</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-primary transition-colors">AI Proctoring</li>
                <li className="hover:text-primary transition-colors">Interviews</li>
                <li className="hover:text-primary transition-colors">Video Calling</li>

              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#Hero-Section" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#Our-Team" className="hover:text-primary transition-colors">Our Teams</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* NEWSLETTER COLUMN */}
            <div>
              <h4 className="text-white font-bold mb-6">Stay Updated</h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="absolute right-2 top-1.5 size-8 bg-primary rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Mail className="size-4 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 leading-tight">
                Get the latest updates on technical hiring and platform features.
              </p>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs">
              © 2026 ProctoHire Inc. All rights reserved.
            </p>

            {/* MADE WITH LOVE ICON SECTION */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-100 bg-white/5 px-4 py-2 rounded-full border border-white/5 group hover:border-primary/20 transition-colors">
              <span>Made with</span>
              <Heart className="size-3.5 text-red-500 fill-red-500 animate-pulse group-hover:scale-125 transition-transform" />
              <span>by the Visionaries</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;