import React, { useState } from 'react';

interface PositionSizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PositionSizerModal: React.FC<PositionSizerModalProps> = ({ isOpen, onClose }) => {
  const [riskTolerancePct, setRiskTolerancePct] = useState<number>(1.5);
  const [contractType, setContractType] = useState<string>('GOLDM');

  if (!isOpen) return null;

  const portfolioNav = 2485420;
  const maxVarCapital = (portfolioNav * (riskTolerancePct / 100)).toFixed(0);
  const lotMargin = contractType === 'GOLDM' ? 68500 : 7650;
  const maxSafeLots = Math.floor((portfolioNav * 0.25) / lotMargin);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">calculate</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-slate-900">Quantitative Position Sizer</h3>
              <p className="text-[11px] text-slate-500 font-jetbrains">VaR 99% & SPAN Margin Bound</p>
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
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Contract Instrument</label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-jetbrains">
              {['GOLDM', 'GOLDPETAL', 'GOLDTEN'].map((sym) => (
                <button
                  key={sym}
                  onClick={() => setContractType(sym)}
                  className={`py-1.5 rounded-lg border transition-all ${
                    contractType === sym
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">1-Day VaR Risk Allocation:</span>
              <span className="font-jetbrains font-bold text-amber-800">{riskTolerancePct}% (₹{parseInt(maxVarCapital).toLocaleString('en-IN')})</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={riskTolerancePct}
              onChange={(e) => setRiskTolerancePct(parseFloat(e.target.value))}
              className="w-full accent-amber-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Results Grid */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Max Conservative Sizing:</span>
              <span className="font-jetbrains font-bold text-slate-900">{maxSafeLots} Lots</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Capital Deployment:</span>
              <span className="font-jetbrains font-semibold text-slate-900">
                ₹{(maxSafeLots * lotMargin).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Regulatory Floor Buffer:</span>
              <span className="font-jetbrains font-semibold text-emerald-700">+42.3% headroom</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Depository Physical Lock:</span>
              <span className="font-jetbrains text-slate-700">
                {contractType === 'GOLDM' ? `${maxSafeLots * 100}g` : `${maxSafeLots * 1}g`} C保管
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-headline-sm text-xs font-semibold"
          >
            Apply to Sizer
          </button>
        </div>
      </div>
    </div>
  );
};
