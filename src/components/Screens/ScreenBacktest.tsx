import React, { useState } from 'react';

export const ScreenBacktest: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'3M' | '6M' | '1Y' | '3Y'>('1Y');

  return (
    <div className="flex flex-col w-full pb-6 space-y-3 max-w-7xl mx-auto px-2 lg:px-4">
      {/* Top Backtest HUD */}
      <div className="bg-slate-50 px-3 sm:px-4 py-3 border-b border-slate-200/80 shadow-xs rounded-xl mx-2 sm:mx-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">query_stats</span>
            <div>
              <span className="font-headline-sm text-sm sm:text-base font-bold text-slate-900 block">
                Walk-Forward Statistical Backtest
              </span>
              <span className="font-jetbrains font-mono text-[10px] text-slate-500">
                Algo-Alpha 999 • Out-of-Sample Monte Carlo Validation
              </span>
            </div>
          </div>
          <span className="font-jetbrains font-mono text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
            SHARPE 3.14
          </span>
        </div>

        {/* Period Pills */}
        <div className="flex items-center justify-between bg-white p-1 rounded-lg border border-slate-200 font-jetbrains font-mono text-[10px]">
          {(['3M', '6M', '1Y', '3Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded transition-all font-semibold cursor-pointer ${
                selectedPeriod === period
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Quadrant: 4 columns on desktop */}
      <div className="px-2 sm:px-3 grid grid-cols-2 lg:grid-cols-4 gap-2.5 font-jetbrains font-mono">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Net Alpha Return</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700">+38.4%</div>
          <span className="font-sans text-[11px] text-slate-500">vs +14.2% MCX Spot</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Annualized Sharpe</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">3.14</div>
          <span className="font-sans text-[11px] text-slate-500">Sortino Ratio: 4.08</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Max System Drawdown</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">-2.80%</div>
          <span className="font-sans text-[11px] text-slate-500">Duration: 4.5 trading days</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Arb Win Rate</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900">86.2%</div>
          <span className="font-sans text-[11px] text-slate-500">Profit Factor: 3.42</span>
        </div>
      </div>

      {/* Equity Curve SVG Chart */}
      <div className="px-2 sm:px-3">
        <div className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-1">
            <span className="font-headline-sm text-xs sm:text-sm font-bold text-slate-900">
              Cumulative Growth of ₹10,00,000 Capital (Walk-Forward Verification)
            </span>
            <div className="flex items-center gap-3 font-jetbrains font-mono text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-amber-700"></span>
                <span className="font-semibold text-slate-900">Algo-Alpha 999</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-0.5 bg-slate-300"></span>
                <span>Spot Buy-Hold</span>
              </span>
            </div>
          </div>

          <div className="w-full h-52 sm:h-64 bg-slate-50 rounded-lg p-2.5 relative overflow-hidden border border-slate-200/80">
            <svg className="w-full h-full" viewBox="0 0 340 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="equityGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b45309" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="30" y2="30" />
              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="65" y2="65" />
              <line stroke="#e2e8f0" strokeDasharray="3 3" x1="0" x2="340" y1="95" y2="95" />

              <polyline
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                points="10,105 50,98 90,102 130,90 170,95 210,85 250,88 290,78 330,75"
              />

              <path
                d="M 10,105 L 50,92 L 90,80 L 130,72 L 170,58 L 210,48 L 250,38 L 290,26 L 330,16 L 330,120 L 10,120 Z"
                fill="url(#equityGrad)"
              />

              <polyline
                fill="none"
                stroke="#b45309"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10,105 50,92 90,80 L 130,72 L 170,58 L 210,48 L 250,38 L 290,26 L 330,16"
              />

              <circle cx="330" cy="16" r="3.5" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 font-jetbrains font-mono pt-0.5">
            <span>T-365 Days</span>
            <span>T-180 Days</span>
            <span>T-90 Days</span>
            <span className="font-bold text-slate-900">Current (₹13.84L • +38.4%)</span>
          </div>
        </div>
      </div>

      {/* Trade Duration & Slippage Breakdown: 2 Cols on Desktop */}
      <div className="px-2 sm:px-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
          <span className="font-headline-sm text-xs font-bold text-slate-900 block pb-1 border-b border-slate-100">
            Execution Friction &amp; Holding Metrics
          </span>

          <div className="space-y-1.5 font-jetbrains font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Avg Trade Duration:</span>
              <span className="font-bold text-slate-900">3.8 Days (Mean Parity Reversion)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Empirical Slippage:</span>
              <span className="font-semibold text-slate-800">0.42 bps (₹0.30/g)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Total Completed Cycles:</span>
              <span className="font-bold text-slate-900">142 Cycles</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
          <span className="font-headline-sm text-xs font-bold text-slate-900 block pb-1 border-b border-slate-100">
            Vault Clearing &amp; Settlement
          </span>

          <div className="space-y-1.5 font-jetbrains font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Physical Delivery Conversion:</span>
              <span className="text-emerald-700 font-semibold">12 Cycles Delivered (Zero Penalty)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Depository Holding Cost:</span>
              <span className="font-semibold text-slate-800">₹0.04/g per settlement cycle</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">SEBI Regulatory Margin:</span>
              <span className="text-emerald-700 font-bold">100% Compliant (142.3% Floor)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
