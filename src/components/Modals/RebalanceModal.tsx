import React, { useState } from 'react';

interface RebalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRebalanceSuccess?: () => void;
}

export const RebalanceModal: React.FC<RebalanceModalProps> = ({
  isOpen,
  onClose,
  onRebalanceSuccess,
}) => {
  const [isRebalancing, setIsRebalancing] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsRebalancing(true);
    setTimeout(() => {
      setIsRebalancing(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        onRebalanceSuccess?.();
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">tune</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-slate-900">Rebalance Portfolio Legs</h3>
              <p className="text-[11px] text-slate-500 font-jetbrains">Spot Beta Neutrality Optimization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-jetbrains uppercase">Current Beta</span>
              <div className="text-lg font-jetbrains font-bold text-amber-700">0.04</div>
              <span className="text-[10px] text-slate-500">Slight Long Purity Bias</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-jetbrains uppercase">Target Beta</span>
              <div className="text-lg font-jetbrains font-bold text-emerald-800">0.00</div>
              <span className="text-[10px] text-emerald-600 font-medium">True Market Neutral</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-jetbrains text-slate-500 uppercase tracking-wider font-semibold">
              Proposed Leg Adjustments
            </span>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/80">
                <span className="font-medium text-slate-800">GOLDPETAL (Retail Leg)</span>
                <span className="font-jetbrains text-rose-700 font-semibold">-40 Lots (-40g)</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-slate-200/80">
                <span className="font-medium text-slate-800">GOLDTEN (Hedge Leg)</span>
                <span className="font-jetbrains text-emerald-700 font-semibold">+4 Lots (+40g)</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-500">Estimated Turnover Drag:</span>
                <span className="font-jetbrains text-slate-700">₹182.40 (0.007%)</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-700 text-[18px]">verified_user</span>
            <span>
              Initial Margin Requirement will remain at <strong>142.3%</strong> of regulatory floor.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100"
          >
            Dismiss
          </button>
          <button
            onClick={handleConfirm}
            disabled={isRebalancing || done}
            className="flex-1 py-2 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-headline-sm text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            {isRebalancing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Executing Legs...</span>
              </>
            ) : done ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Beta 0.00 Synced</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">autorenew</span>
                <span>Rebalance Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
