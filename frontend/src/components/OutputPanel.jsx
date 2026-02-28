import React from "react";
import { Terminal, CheckCircle2, XCircle, Activity } from "lucide-react";

function OutputPanel({ 
  output, 
  isRunning, 
  testCases, 
  activeTab, 
  setActiveTab, 
  activeCaseIdx, 
  setActiveCaseIdx 
}) {
  const activeCase = testCases[activeCaseIdx] || testCases[0];

  const cleanString = (str) => String(str).replace(/\s+/g, '').trim();
  
  const isCorrect = output?.success && 
    cleanString(output.output) === cleanString(activeCase.output);

  return (
    <div className="h-full flex flex-col bg-[#02040a] border-t border-white/5">
      
      {/* PANEL TABS */}
      <div className="flex items-center bg-[#0A0F1C] border-b border-white/5 px-2">
        <button
          onClick={() => setActiveTab("testcases")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "testcases"
              ? "text-slate-200 border-primary bg-white/[0.03]"
              : "text-slate-500 border-transparent hover:text-slate-300"
          }`}
        >
          <Terminal className="size-3.5" />
          Test Cases
        </button>
        <button
          onClick={() => setActiveTab("result")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "result"
              ? "text-slate-200 border-primary bg-white/[0.03]"
              : "text-slate-500 border-transparent hover:text-slate-300"
          }`}
        >
          <Activity className="size-3.5" />
          Test Result
        </button>
      </div>

      {/* PANEL CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden">
        
        {isRunning ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 animate-pulse">
            <Activity className="size-8" />
            <p className="text-sm font-bold uppercase tracking-widest">Executing Code...</p>
          </div>
        ) : activeTab === "testcases" ? (
          
          /* TEST CASES VIEW */
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {testCases.slice(0, 3).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCaseIdx === idx
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.02] text-slate-500 hover:bg-white/[0.05]"
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Input:</p>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                  {activeCase.input}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Expected Output:</p>
                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 font-mono text-sm text-emerald-400">
                  {activeCase.output}
                </div>
              </div>
            </div>
          </div>
          
        ) : (
          
          /* TEST RESULTS VIEW */
          <div className="space-y-4">
            {!output ? (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm font-medium h-32">
                Run your code to see results here.
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  {output.error ? (
                    <span className="flex items-center gap-2 text-rose-500 text-lg font-black">
                      <XCircle className="size-5" /> Error
                    </span>
                  ) : isCorrect ? (
                    <span className="flex items-center gap-2 text-emerald-500 text-lg font-black">
                      <CheckCircle2 className="size-5" /> Accepted
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-rose-500 text-lg font-black">
                      <XCircle className="size-5" /> Wrong Answer
                    </span>
                  )}
                </div>

                {output.error ? (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 font-mono text-sm text-rose-400 whitespace-pre-wrap">
                    {output.error}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-1">Input:</p>
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                        {activeCase.input}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-1">Actual Output:</p>
                      <div className={`bg-white/[0.02] border border-white/5 rounded-lg p-3 font-mono text-sm whitespace-pre-wrap ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {output.output || "No output generated"}
                      </div>
                    </div>
                    {!isCorrect && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1">Expected Output:</p>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 font-mono text-sm text-emerald-400">
                          {activeCase.output}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;