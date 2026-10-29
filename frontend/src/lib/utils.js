export const getDifficultyStyles = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hard": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

export const VERDICT_OPTIONS = [
  { value: "strong_hire", label: "Strong Hire" },
  { value: "hire", label: "Hire" },
  { value: "no_hire", label: "No Hire" },
  { value: "strong_no_hire", label: "Strong No Hire" },
];

export const getVerdictLabel = (verdict) =>
  VERDICT_OPTIONS.find((v) => v.value === verdict)?.label || verdict;

export const getVerdictStyles = (verdict) => {
  switch (verdict) {
    case "strong_hire": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "hire": return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    case "no_hire": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "strong_no_hire": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};