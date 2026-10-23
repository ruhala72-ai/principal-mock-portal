import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const PracticeDisclaimerBanner: React.FC<Props> = ({ compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-semibold text-amber-800">Practice Mock Portal:</span>
          <span className="truncate">Sample practice model questions (not official previous year papers).</span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-amber-800 underline text-[11px] shrink-0 font-medium ml-2 cursor-pointer hover:text-amber-950"
        >
          {expanded ? 'Hide' : 'Details'}
        </button>
        {expanded && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-amber-200 text-left">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Practice Questions Notice
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                All questions provided in this portal are <strong>model practice questions</strong> designed to test conceptual understanding of relevant laws, acts, rules, and administrative duties (e.g. CCS Rules, GFR, RTE, POCSO, UP Intermediate Education Act 1921).
              </p>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                <strong>Important:</strong> These are NOT verified previous-year question papers (PYQs) officially published by UPSC or UPPSC. They are strictly for practice and self-assessment simulation.
              </p>
              <button
                onClick={() => setExpanded(false)}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
              >
                Understood / समझ लिया
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-amber-900 shadow-xs mb-4">
      <div className="flex items-start gap-2.5">
        <div className="p-1.5 bg-amber-100 rounded-lg shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-amber-900 flex items-center gap-1.5">
              <span>अभ्यास प्रश्न सूचना (Practice Questions Advisory)</span>
            </h4>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-amber-800 hover:text-amber-950 text-xs flex items-center gap-1 font-medium"
            >
              <span>{expanded ? 'संक्षिप्त करें' : 'विस्तार से देखें'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="mt-1 text-amber-800/90 leading-relaxed text-xs">
            इस पोर्टल में प्रस्तुत सभी प्रश्न <strong>मॉडल अभ्यास प्रश्न (Practice Questions)</strong> हैं, जो संबंधित अधिनियमों, नियमों (CCS, GFR, RTE, पॉक्सो, उ.प्र. इंटरमीडिएट शिक्षा अधिनियम 1921) की तैयारी हेतु तैयार किए गए हैं।
          </p>

          {expanded && (
            <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 space-y-1.5 text-[12px] text-amber-900">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Not Official PYQs:</strong> These sample questions are curated for examination simulation and learning reinforcement. They should not be misconstrued as verified official previous-year papers released by UPSC or UPPSC.
                </p>
              </div>
              <p className="text-amber-800">
                You can add, edit, or import your own official previous year questions in the <strong>Question Bank</strong> tab.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
