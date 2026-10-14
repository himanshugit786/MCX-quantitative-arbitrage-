import React, { useState } from 'react';

interface ExecuteSpreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lots?: number;
  onExecuted?: (details: { lots: number; alpha: string }) => void;
}

export const ExecuteSpreadModal: React.FC<ExecuteSpreadModalProps> = ({
  isOpen,
  onClose,
  lots: initialLots = 1,
  onExecuted,
}) => {
  const [lotMultiplier, setLotMultiplier] = useState<number>(initialLots);
  const [slippageBps, setSlippageBps] = useState<number>(0.5);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const goldpetalPrice = 7162.80;
  const goldmPrice = 7142.50;
  const currentSpread = (goldpetalPrice - goldmPrice).toFixed(2);
  const fairSpread = 12.40;
  const alphaPerGram = (parseFloat(currentSpread) - fairSpread).toFixed(2);
  const totalAlpha = (parseFloat(alphaPerGram) * 100 * lotMultiplier).toLocaleString('en-IN');
  const requiredMargin = (68500 * lotMultiplier).toLocaleString('en-IN');

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onExecuted?.({
          lots: lotMultiplier,
          alpha: `+₹${totalAlpha}`,
        });
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">balance</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-slate-900">Relative Value Spread Router</h3>
              <p className="text-[11px] text-slate-500 font-jetbrains">MCX Algo-Alpha 999 • Tick Routing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5">
          {/* Signal summary banner */}
          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span className="text-[11px] text-amber-900 font-medium">
                Signal: <strong className="font-jetbrains text-amber-950">+2.34σ Basis Richness</strong>
              </span>
            </div>
            <span className="text-[10px] bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded font-jetbrains font-bold">
              +₹{alphaPerGram}/g ALPHA
            </span>
          </div>

          {/* Dual Leg Execution Box */}
          <div className="space-y-2">
            <span className="text-[10px] font-jetbrains text-slate-500 uppercase tracking-wider font-semibold">
              Execution Legs (Synthetic Ratio 100:1)
            </span>

            {/* Leg 1 */}
            <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200/70 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded font-jetbrains">
                    SELL / SHORT
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-slate-900">
                    GOLDPETAL OCT24
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-jetbrains">
                  {100 * lotMultiplier} Lots (100g) • 999 Purity
                </span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains text-xs font-bold text-rose-700">₹{goldpetalPrice.toFixed(2)}/g</span>
                <span className="block text-[10px] text-slate-500 font-jetbrains">Limit Pegged</span>
              </div>
            </div>

            {/* Leg 2 */}
            <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded font-jetbrains">
                    BUY / LONG
                  </span>
                  <span className="font-headline-sm text-xs font-semibold text-slate-900">
                    GOLDM OCT24
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-jetbrains">
                  {1 * lotMultiplier} Lot (100g) • 995 Purity Scaled
                </span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains text-xs font-bold text-emerald-700">₹{goldmPrice.toFixed(2)}/g</span>
                <span className="block text-[10px] text-slate-500 font-jetbrains">Scaled 995→999</span>
              </div>
            </div>
          </div>

          {/* Lot Multiplier Controls */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-700 font-medium">Spread Order Size:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 5, 10].map((l) => (
                <button
                  key={l}
                  onClick={() => setLotMultiplier(l)}
                  className={`px-2.5 py-1 rounded text-xs font-jetbrains transition-all ${
                    lotMultiplier === l
                      ? 'bg-amber-700 text-white font-bold shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {l}x
                </button>
              ))}
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Gross Basis Spread:</span>
              <span className="font-jetbrains font-semibold text-slate-900">+₹{currentSpread}/g</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Target Mean Parity:</span>
              <span className="font-jetbrains text-slate-900">₹{fairSpread.toFixed(2)}/g</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Expected Alpha Recovery:</span>
              <span className="font-jetbrains font-bold text-emerald-700">+₹{totalAlpha}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Required SPAN Margin:</span>
              <span className="font-jetbrains font-semibold text-slate-900">₹{requiredMargin}</span>
            </div>
          </div>

          {/* Slippage tolerance slider */}
          <div className="pt-1 border-t border-slate-200">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Max Allowable Slippage:</span>
              <span className="font-jetbrains font-bold text-slate-800">{slippageBps} bps (₹0.35/g)</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={slippageBps}
              onChange={(e) => setSlippageBps(parseFloat(e.target.value))}
              className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={onClose}
            disabled={isExecuting}
            className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 text-slate-700 font-headline-sm text-xs hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting || isSuccess}
            className="flex-[2] py-2.5 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-headline-sm text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            {isExecuting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Routing to MCX Desk...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Filled & Leg-Matched!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">balance</span>
                <span>Confirm Relative Value Arb</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
