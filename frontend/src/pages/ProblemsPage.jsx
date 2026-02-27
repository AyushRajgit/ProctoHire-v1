import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar.jsx"; 
import { PROBLEMS } from "../Server_Data/problems.js"; 
import { Search, Filter, Code2, TerminalSquare, ArrowRight, Zap, BookOpen } from "lucide-react";

function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // Filter logic
  const problemsList = Object.values(PROBLEMS);
  const filteredProblems = problemsList.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  // Difficulty Badge Styling mapping
  const getDifficultyStyles = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* BACKGROUND GRID (Matches Homepage) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-30" />
      </div>

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-4">
              <BookOpen className="size-4" />
              <span>Interview Bank</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Coding <span className="text-primary">Challenges</span>
            </h1>
            <p className="text-slate-400 mt-3 max-w-xl">
              Master the algorithms and data structures required to pass elite technical interviews. Code, test, and verify your logic.
            </p>
          </div>

          {/* AVAILABLE PROBLEMS */}
          <div className="flex gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 min-w-[120px]">
              <p className="text-xs text-slate-500 font-medium mb-1">Total Available</p>
              <p className="text-2xl font-black text-white">{problemsList.length}</p>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search problems by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-lg"
            />
          </div>

          {/* DIFFICULTY FILTER */}
          <div className="flex items-center gap-2 bg-[#0A0F1C] border border-white/10 rounded-xl p-1.5 shadow-lg overflow-x-auto">
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  difficultyFilter === level 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-3">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <Link 
                to={`/problems/${problem.id}`} 
                key={problem.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="hidden sm:flex size-10 rounded-xl bg-[#030712] border border-white/10 items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    <TerminalSquare className="size-5 text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      {problem.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
                  {/* DIFFICULTY BADGE */}
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${getDifficultyStyles(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>

                  {/* SOLVE BUTTON */}
                  <button className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">
                    Solve
                    <ArrowRight className="size-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </button>
                </div>
              </Link>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 border-dashed rounded-3xl bg-white/[0.01]">
              <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Search className="size-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No problems found</h3>
              <p className="text-slate-500 max-w-md">
                We couldn't find any challenges matching "{searchQuery}". Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setDifficultyFilter("All"); }}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default ProblemsPage;