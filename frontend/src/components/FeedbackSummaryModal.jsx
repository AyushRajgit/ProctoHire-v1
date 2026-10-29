import { StarIcon, XIcon } from "lucide-react";
import { getVerdictLabel, getVerdictStyles } from "../lib/utils";

const RATING_CRITERIA = [
  { key: "problemSolving", label: "Problem Solving" },
  { key: "codeQuality", label: "Code Quality" },
  { key: "communication", label: "Communication" },
  { key: "technicalKnowledge", label: "Technical Knowledge" },
];

function Stars({ value = 0 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`size-4 ${star <= value ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
        />
      ))}
    </div>
  );
}

function FeedbackSummaryModal({ session, onClose }) {
  const feedback = session?.feedback;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <XIcon className="size-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-1">{session?.problem}</h3>
        <p className="text-slate-400 text-sm mb-6">Interview feedback</p>

        {!feedback ? (
          <div className="text-center py-10 text-slate-500">
            No feedback was recorded for this session.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1.5 rounded-full border text-sm font-bold ${getVerdictStyles(feedback.verdict)}`}
              >
                {getVerdictLabel(feedback.verdict)}
              </span>
              <Stars value={feedback.overallRating} />
            </div>

            {feedback.ratings && (
              <div className="space-y-2.5 border-t border-white/5 pt-5">
                {RATING_CRITERIA.map(({ key, label }) =>
                  feedback.ratings[key] ? (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{label}</span>
                      <Stars value={feedback.ratings[key]} />
                    </div>
                  ) : null
                )}
              </div>
            )}

            {feedback.remarks && (
              <div className="border-t border-white/5 pt-5">
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                  Remarks
                </p>
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {feedback.remarks}
                </p>
              </div>
            )}

            {feedback.submittedAt && (
              <p className="text-xs text-slate-600 border-t border-white/5 pt-4">
                Submitted {new Date(feedback.submittedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackSummaryModal;
