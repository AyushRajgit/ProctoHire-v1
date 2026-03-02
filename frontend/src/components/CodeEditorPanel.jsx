import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, ChevronDown, Cpu, Zap, Settings2, Globe } from "lucide-react";
import { LANGUAGE_CONFIG } from "../Server_Data/problems";

function CodeEditorPanel({
  code,
  selectedLanguage,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode
}) {
  const currentLang = LANGUAGE_CONFIG[selectedLanguage] || LANGUAGE_CONFIG.javascript;

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("ultra-noir", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6272a4", fontStyle: "italic" },
        { token: "keyword", foreground: "ff79c6", fontStyle: "bold" },
        { token: "string", foreground: "50fa7b" },
        { token: "number", foreground: "bd93f9" },
        { token: "type", foreground: "8be9fd" },
      ],
      colors: {
        "editor.background": "#02040a",
        "editor.lineHighlightBackground": "#ffffff08",
        "editorCursor.foreground": "#10b981",
        "editorIndentGuide.background": "#ffffff10",
        "editorIndentGuide.activeBackground": "#10b98150",
        "editor.selectionBackground": "#3b82f640",
      },
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#02040a] border-l border-white/5 relative group">
      {/* TOP TOOLBAR */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#02040a] border-b border-white/5">
        <div className="flex items-center gap-4">
          
          {/* DYNAMIC LANGUAGE*/}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-xl shadow-inner">
            <div className="relative size-6 flex items-center justify-center rounded-lg bg-[#0A0F1C] border border-white/5 overflow-hidden">
               <img 
                 src={currentLang.icon} 
                 alt={currentLang.name} 
                 className="size-4 object-contain z-10"
               />
               {/* Background Glow matching the language icon */}
               <div className="absolute inset-0 bg-primary/10 blur-sm" />
            </div>
            
            <div className="relative group">
              <select
                className="appearance-none bg-transparent text-sm font-bold text-slate-200 focus:outline-none cursor-pointer pr-5"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
              >
                {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                  <option key={key} value={key} className="bg-[#02040a] text-slate-200">
                    {lang.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-3 text-slate-500 pointer-events-none group-hover:text-white transition-colors" />
            </div>
          </div>

        </div>

        <button
          onClick={onRunCode}
          disabled={isRunning}
          className={`group relative flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            isRunning 
            ? "opacity-50 cursor-not-allowed" 
            : "text-white active:scale-95 overflow-hidden"
          }`}
        >
          {/* Animated Background */}
          {!isRunning && (
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_100%] animate-shimmer group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all" />
          )}
          {isRunning && <div className="absolute inset-0 bg-slate-800" />}

          <div className="relative z-10 flex items-center gap-2">
            {isRunning ? <Loader2Icon className="size-3 animate-spin" /> : <PlayIcon className="size-3 fill-current" />}
            {isRunning ? "Compiling" : "Execute"}
          </div>
        </button>
      </div>

      {/* EDITOR WORKSPACE */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={currentLang.monacoLang}
          value={code}
          theme="ultra-noir"
          beforeMount={handleEditorWillMount}
          onChange={onCodeChange}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            padding: { top: 20, bottom: 20 },
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            lineHeight: 1.6,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
            }
          }}
        />
      </div>

      {/* FOOTER STATUS BAR */}
      <div className="flex items-center justify-between px-6 py-2 bg-[#02040a] border-t border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Cpu className="size-3" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Engine: Judge0 API</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">
             System Ready
          </span>
          <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        </div>
      </div>
    </div>
  );
}

export default CodeEditorPanel;