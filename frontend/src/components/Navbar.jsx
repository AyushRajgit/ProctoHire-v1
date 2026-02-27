import { LayoutDashboardIcon, BookOpenIcon, Terminal } from "lucide-react";
import { Link, useLocation } from "react-router";
import { UserButton } from "@clerk/clerk-react"; 

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
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
          
          {/* PROBLEMS PAGE LINK */}
          <Link 
            to={"/problems"}
            className={`flex items-center gap-x-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isActive("/problems")
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
            className={`flex items-center gap-x-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isActive("/dashboard")
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.1)]" 
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <LayoutDashboardIcon className={`size-4 ${isActive("/dashboard") ? "fill-primary/20" : ""}`} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          {/* USER PROFILE BUTTON */}
          <div className="ml-2 pl-4 border-l border-white/10 flex items-center justify-center">
            {/* Using Clerk's appearance prop to make it blend better with the dark theme */}
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
  );
}

export default Navbar;