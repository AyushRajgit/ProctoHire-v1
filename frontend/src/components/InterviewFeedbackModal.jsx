import { useState } from "react";
import { Loader2Icon, StarIcon } from "lucide-react";
import { VERDICT_OPTIONS, getVerdictStyles } from "../lib/utils";

const RATING_CRITERIA = [
  { key: "problemSolving", label: "Problem Solving" },
  { key: "codeQuality", label: "Code Quality" },
  { key: "communication", label: "Communication" },
  { key: "technicalKnowledge", label: "Technical Knowledge" },
];

function StarPicker({ value, onChange, size = "size-6" }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <StarIcon
            className={`${size} ${
              star <= value ? "fill-amber-400 text-amber-400" : "text-slate-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function InterviewFeedbackModal({ candidateName, onSubmit, onClose, isSubmitting }) {
  const [verdict, setVerdict] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [ratings, setRatings] = useState({
    problemSolving: 0,
    codeQuality: 0,
    communication: 0,
    technicalKnowledge: 0,
  });
  const [remarks, setRemarks] = useState("");

  const isValid = verdict && overallRating > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      verdict,
      overallRating,
      ratings,
      remarks,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-white mb-1">Interview Feedback</h3>
        <p className="text-slate-400 text-sm mb-6">
          Record your evaluation for {candidateName || "the candidate"} before closing this room.
          This cannot be edited later.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* VERDICT */}
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">
              Verdict <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {VERDICT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setVerdict(option.value)}
                  className={`px-3 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                    verdict === option.value
                      ? getVerdictStyles(option.value) + " ring-2 ring-offset-0 ring-current"
                      : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* OVERALL RATING */}
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <StarPicker value={overallRating} onChange={setOverallRating} />
          </div>

          {/* SUB RATINGS */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white block">
              Scorecard <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            {RATING_CRITERIA.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400">{label}</span>
                <StarPicker
                  size="size-4"
                  value={ratings[key]}
                  onChange={(val) => setRatings((prev) => ({ ...prev, [key]: val }))}
                />
              </div>
            ))}
          </div>

          {/* REMARKS */}
          <div>
            <label className="text-sm font-semibold text-white mb-2 block">
              Remarks <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Notes on strengths, gaps, and justification for the verdict..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#030712] font-bold transition-colors shadow-lg shadow-teal-500/25 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2Icon className="animate-spin size-5" /> : "Submit & End Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InterviewFeedbackModal;
