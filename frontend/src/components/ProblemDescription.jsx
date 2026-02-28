import { getDifficultyStyles } from "../lib/utils.js";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  if (!problem) return null;

  return (
    <div className="no-scrollbar transition-colors h-full overflow-y-auto bg-[#0A0F1C] text-slate-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-colors">

      {/* HEADER SECTION */}
      <div className=" p-6 bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">{problem.title}</h1>
          <span className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide whitespace-nowrap ${getDifficultyStyles(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>

        <p className="text-sm text-slate-400 font-medium mb-5">{problem.category}</p>

        {/* Problem Selector */}
        <div className="relative group">
          <select
            className="w-full appearance-none bg-[#030712] border border-white/10 hover:border-white/20 rounded-xl py-2.5 pl-4 pr-10 text-sm text-white font-medium focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0A0F1C] text-slate-200">
                {p.title}
              </option>
            ))}
          </select>
          {/* Dropdown Arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* PROBLEM DESCRIPTION */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Description</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            <p>{problem.description.text}</p>

            {/* Notes mapping */}
            {problem.description.notes?.length > 0 && (
              <ul className="list-disc list-inside space-y-1.5 mt-4 marker:text-primary">
                {problem.description.notes.map((note, idx) => (
                  <li key={idx} className="text-slate-400">
                    <span className="text-slate-300">{note}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        {problem.examples?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center size-5 rounded bg-white/10 text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <p className="font-semibold text-white text-sm">Example {idx + 1}</p>
                  </div>

                  <div className="font-mono text-sm space-y-2 text-slate-300">
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-slate-500 font-medium select-none">Input:</span>
                      <span className="text-primary/90">{example.input}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-slate-500 font-medium select-none">Output:</span>
                      <span className="text-emerald-400">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-3 border-t border-white/5 mt-3 text-slate-400 font-sans text-sm leading-relaxed">
                        <span className="font-semibold text-slate-300">Explanation:</span> {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSTRAINTS */}
        {problem.constraints?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-3">Constraints</h2>
            <div className="flex flex-wrap gap-2">
              {problem.constraints.map((constraint, idx) => (
                <div
                  key={idx}
                  className="bg-[#030712] border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-300"
                >
                  {constraint}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDescription;