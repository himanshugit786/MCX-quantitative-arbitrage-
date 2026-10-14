import React, { useState } from 'react';

interface DeskSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMockTickActive: boolean;
  onToggleMockTick: () => void;
}

export const DeskSettingsModal: React.FC<DeskSettingsModalProps> = ({
  isOpen,
  onClose,
  isMockTickActive,
  onToggleMockTick,
}) => {
  const [algoEngineActive, setAlgoEngineActive] = useState<boolean>(true);
  const [zScoreThreshold, setZScoreThreshold] = useState<number>(1.8);
  const [autoHedge, setAutoHedge] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">settings</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-slate-900">Desk Engine Settings</h3>
              <p className="text-[11px] text-slate-500 font-jetbrains">Algo-Alpha 999 • Quantitative Gateway</p>
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
        <div className="p-4 space-y-4 text-xs">
          {/* Feed & Ticks */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-900 block">MCX Live Tick Simulator</span>
                <span className="text-[11px] text-slate-500">Live prices oscillate within historical micro-spreads</span>
              </div>
              <button
                onClick={onToggleMockTick}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                  isMockTickActive ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
              <div>
                <span className="font-semibold text-slate-900 block">Algo-Alpha Auto Hedge</span>
                <span className="text-[11px] text-slate-500">Auto-routes leg on +2.0σ breakout breach</span>
              </div>
              <button
                onClick={() => setAutoHedge(!autoHedge)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                  autoHedge ? 'bg-amber-700 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>
          </div>

          {/* Sigma Entry Threshold */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">Sigma Divergence Entry:</span>
              <span className="font-jetbrains font-bold text-amber-800">+{zScoreThreshold.toFixed(1)}σ</span>
            </div>
            <input
              type="range"
              min="1.2"
              max="2.5"
              step="0.1"
              value={zScoreThreshold}
              onChange={(e) => setZScoreThreshold(parseFloat(e.target.value))}
              className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-jetbrains">
              <span>Conservative (2.5σ)</span>
              <span>Aggressive (1.2σ)</span>
            </div>
          </div>

          {/* Trader Profile Details */}
          <div className="p-2.5 rounded-lg border border-slate-200 space-y-1 text-[11px] text-slate-600">
            <div className="flex justify-between">
              <span>Desk ID:</span>
              <span className="font-jetbrains font-semibold text-slate-900">ARB-MUM-999</span>
            </div>
            <div className="flex justify-between">
              <span>SEBI Registration:</span>
              <span className="font-jetbrains text-slate-800">INZ000214838</span>
            </div>
            <div className="flex justify-between">
              <span>MCX Member Code:</span>
              <span className="font-jetbrains text-slate-800">56120 (Algo-Wholesale)</span>
            </div>
            <div className="flex justify-between">
              <span>Depository:</span>
              <span className="font-jetbrains text-emerald-700 font-semibold">C保管 Vault (3,320g Locked)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-headline-sm text-xs font-semibold"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
