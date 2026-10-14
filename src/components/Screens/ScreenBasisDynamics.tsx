import React, { useState } from 'react';
import { BASIS_TIMELINE } from '../../data/marketData';

interface ScreenBasisDynamicsProps {
  onExecuteSpreadClick: () => void;
  onOpenSettingsClick: () => void;
  isWorkstationColumn?: boolean;
}

export const ScreenBasisDynamics: React.FC<ScreenBasisDynamicsProps> = ({
  onExecuteSpreadClick,
  onOpenSettingsClick,
  isWorkstationColumn = false,
}) => {
  const [horizon, setHorizon] = useState<'7D' | '14D' | '30D' | '60D' | '90D'>('30D');
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState<number>(8);

  const activeInspection = BASIS_TIMELINE[selectedInspectionIndex] || BASIS_TIMELINE[8];

  return (
    <div className={`flex flex-col w-full pb-6 space-y-3 ${isWorkstationColumn ? '' : 'max-w-7xl mx-auto px-2 lg:px-4'}`}>
      {/* Analytics Control Bar */}
      <div className="px-3 sm:px-4 pt-1 flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-sm sm:text-base text-slate-900 font-bold tracking-tight">
              Price &amp; Basis Dynamics
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-jetbrains font-mono text-[9px] uppercase font-bold border border-amber-200/60">
              Rolling 30D
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 font-jetbrains font-mono text-[10px]">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">analytics</span>
            <span>Norm. ₹/g (999)</span>
          </div>
        </div>

        {/* Horizon Pills */}
        <div className="flex items-center justify-between bg-slate-100 p-1 rounded-lg border border-slate-200/80">
          {(['7D', '14D', '30D', '60D', '90D'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded font-jetbrains font-mono text-[10px] transition-all font-semibold cursor-pointer ${
                horizon === h
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        {/* Contract Series Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 font-jetbrains font-mono text-[10px]">
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded text-slate-800 shrink-0">
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            <span className="font-bold">GOLDM</span>
            <span className="text-slate-500">₹7,142.5</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded text-amber-900 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span className="font-bold">GOLDPETAL</span>
            <span className="text-amber-800">₹7,162.8</span>
          </div>

          <div className="flex items-center gap-1 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded text-sky-900 shrink-0">
            <span className="material-symbols-outlined text-[12px] text-sky-700">swap_horiz</span>
            <span className="font-bold">Petal-M Spread</span>
            <span className="text-amber-800 font-bold">+₹20.3</span>
          </div>
        </div>
      </div>

      {/* Interactive Big Chart Panel */}
      <div className="px-2 sm:px-3">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 flex flex-col space-y-2">
          {/* Tooltip Crosshair Callout */}
          <div className="bg-slate-50 border border-slate-200/80 p-2 sm:p-2.5 rounded-lg flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-jetbrains font-mono text-[10px] text-slate-900 font-bold">
                <span className="material-symbols-outlined text-[14px] text-amber-700">pin_drop</span>
                <span>
                  {activeInspection.date === '2024-10-24'
                    ? '24 OCT 2024 (INSPECTION TICK)'
                    : `${activeInspection.label.toUpperCase()} 2024 (TICK)`}
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-jetbrains font-mono text-[9px] font-bold">
                +{activeInspection.zScore.toFixed(2)}σ STRIKE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 font-jetbrains font-mono text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                  GOLDM Basis
                </span>
                <span className="font-bold text-slate-900">₹{activeInspection.goldm.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-amber-700 font-semibold">
                  GOLDPETAL
                </span>
                <span className="font-bold text-amber-800">₹{activeInspection.goldpetal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-amber-700 font-semibold">
                  Delta Spread
                </span>
                <span className="font-bold text-amber-800">
                  +{activeInspection.spread.toFixed(2)}/g
                </span>
              </div>
            </div>
          </div>

          {/* High Fidelity Multi-Series SVG Line Chart */}
          <div className="w-full relative select-none">
            <svg className="w-full h-56 sm:h-72" fill="none" viewBox="0 0 350 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldmGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="petalGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid & Y-Axis Labels */}
              <line stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="0.7" x1="28" x2="345" y1="20" y2="20" />
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="2" y="23">
                7,180
              </text>
              <line stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="0.7" x1="28" x2="345" y1="65" y2="65" />
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="2" y="68">
                7,150
              </text>
              <line stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="0.7" x1="28" x2="345" y1="110" y2="110" />
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="2" y="113">
                7,120
              </text>
              <line stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="0.7" x1="28" x2="345" y1="155" y2="155" />
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="2" y="158">
                7,090
              </text>

              {/* Vertical Dislocation Guides */}
              <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.8" x1="105" x2="105" y1="20" y2="170" />
              <line stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.8" x1="210" x2="210" y1="20" y2="170" />
              <line stroke="#d97706" strokeDasharray="2 2" strokeWidth="1.2" x1="320" x2="320" y1="20" y2="170" />

              {/* Area Fills */}
              <path
                d="M 32 140 L 70 135 L 105 95 L 140 102 L 180 88 L 210 115 L 245 90 L 285 75 L 320 62 L 340 58 L 340 170 L 32 170 Z"
                fill="url(#goldmGrad)"
              />
              <path
                d="M 32 138 L 70 132 L 105 82 L 140 92 L 180 75 L 210 98 L 245 68 L 285 52 L 320 32 L 340 28 L 340 170 L 32 170 Z"
                fill="url(#petalGrad)"
              />

              {/* Spread Shading Ribbon between the two lines */}
              <path
                d="M 32 140 L 70 135 L 105 95 L 140 102 L 180 88 L 210 115 L 245 90 L 285 75 L 320 62 L 340 58 L 340 28 L 320 32 L 285 52 L 245 68 L 210 98 L 180 75 L 140 92 L 105 82 L 70 132 L 32 138 Z"
                fill="#fde68a"
                fillOpacity="0.45"
              />

              {/* Line 1: GOLDM (Slate Navy) */}
              <polyline
                fill="none"
                points="32,140 70,135 105,95 140,102 180,88 210,115 245,90 285,75 320,62 340,58"
                stroke="#334155"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.0"
              />

              {/* Line 2: GOLDPETAL (Warm Amber Gold) */}
              <polyline
                fill="none"
                points="32,138 70,132 105,82 140,92 180,75 210,98 245,68 285,52 320,32 340,28"
                stroke="#b45309"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
              />

              {/* Interactive Clickable Hotspots for Timeline points */}
              {/* Point 1: Oct 08 CPI Spike */}
              <circle
                cx="105"
                cy="82"
                fill="#fef3c7"
                r="4.5"
                stroke="#b45309"
                strokeWidth="1.8"
                className="cursor-pointer hover:r-6 transition-all"
                onClick={() => setSelectedInspectionIndex(2)}
              />
              <g transform="translate(85, 45)" className="cursor-pointer" onClick={() => setSelectedInspectionIndex(2)}>
                <rect fill="#0f172a" height="15" opacity="0.95" rx="3" width="50" x="0" y="0" />
                <text className="font-jetbrains font-mono text-[8px] font-bold" fill="#ffffff" textAnchor="middle" x="25" y="10.5">
                  A: CPI +1.8σ
                </text>
              </g>

              {/* Point 2: Oct 18 Expiry Roll */}
              <circle
                cx="210"
                cy="98"
                fill="#e0f2fe"
                r="4.5"
                stroke="#0369a1"
                strokeWidth="1.8"
                className="cursor-pointer hover:r-6 transition-all"
                onClick={() => setSelectedInspectionIndex(5)}
              />
              <g transform="translate(188, 125)" className="cursor-pointer" onClick={() => setSelectedInspectionIndex(5)}>
                <rect fill="#0f172a" height="15" opacity="0.95" rx="3" width="48" x="0" y="0" />
                <text className="font-jetbrains font-mono text-[8px] font-bold" fill="#ffffff" textAnchor="middle" x="24" y="10.5">
                  B: Roll +₹4.2
                </text>
              </g>

              {/* Point 3: Oct 24 Diwali Delivery Squeeze */}
              <circle
                cx="320"
                cy="32"
                fill="#78350f"
                r="5"
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all animate-pulse"
                onClick={() => setSelectedInspectionIndex(8)}
              />
              <g transform="translate(254, 12)" className="cursor-pointer" onClick={() => setSelectedInspectionIndex(8)}>
                <rect fill="#78350f" height="16" rx="3" width="66" x="0" y="0" />
                <text className="font-jetbrains font-mono text-[8px] font-bold" fill="#fef3c7" textAnchor="middle" x="33" y="11.5">
                  C: Squeeze +₹20.3
                </text>
              </g>

              {/* X-Axis Baseline & Labels */}
              <line stroke="#cbd5e1" strokeWidth="0.8" x1="28" x2="345" y1="172" y2="172" />
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="32" y="186">
                Sep 26
              </text>
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="95" y="186">
                Oct 03
              </text>
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="165" y="186">
                Oct 10
              </text>
              <text className="font-jetbrains font-mono text-[8px]" fill="#64748b" x="235" y="186">
                Oct 17
              </text>
              <text
                className="font-jetbrains font-mono text-[8px] font-bold"
                fill="#b45309"
                x="310"
                y="186"
              >
                Oct 24
              </text>
            </svg>
          </div>

          {/* Legend & Basis Footnote */}
          <div className="flex items-center justify-between text-slate-500 font-jetbrains font-mono text-[10px] pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-slate-700"></span>
                <span>GOLDM</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-amber-600"></span>
                <span>GOLDPETAL</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1.5 bg-amber-200 border border-amber-300"></span>
                <span>Basis Dislocation</span>
              </div>
            </div>
            <span className="text-amber-700 font-bold">Tick: 1.0s</span>
          </div>
        </div>
      </div>

      {/* Responsive Grid: 30D Regime Spectrum vs Risk Parameters */}
      <div className={`grid grid-cols-1 ${isWorkstationColumn ? '' : 'lg:grid-cols-2'} gap-3 px-2 sm:px-3`}>
        {/* Volatility Regimes & Corridor Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 flex flex-col justify-between space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-sm text-slate-900 font-bold">
              30D Regime &amp; Corridor Spectrum
            </span>
            <span className="font-jetbrains font-mono text-[10px] text-slate-600 font-bold">
              Z = +2.34
            </span>
          </div>

          {/* Regime Proportional Ribbon */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between text-slate-500 font-jetbrains font-mono text-[10px]">
              <span>Regime Distribution</span>
              <span className="font-semibold text-slate-800">18D / 9D / 3D</span>
            </div>

            <div className="h-2 w-full rounded-full bg-slate-100 flex overflow-hidden border border-slate-200/70">
              <div className="bg-slate-400 h-full" style={{ width: '60%' }}></div>
              <div className="bg-amber-300 h-full" style={{ width: '30%' }}></div>
              <div className="bg-emerald-500 h-full" style={{ width: '10%' }}></div>
            </div>

            <div className="flex justify-between items-center text-slate-600 font-jetbrains font-mono text-[10px] pt-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Stationary (60%)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Elevated (30%)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Surge (10%)</span>
              </div>
            </div>
          </div>

          {/* Z-Score Corridor Visualizer */}
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col space-y-1.5">
            <div className="flex justify-between items-center font-jetbrains font-mono text-[10px]">
              <span className="text-slate-500">-2.0σ (Low Band)</span>
              <span className="font-bold text-slate-900">Mean (₹12.40/g)</span>
              <span className="text-emerald-700 font-bold">+2.0σ Breakout</span>
            </div>

            <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div className="absolute left-1/4 right-1/4 top-0 bottom-0 bg-sky-200/80"></div>
              <div className="absolute top-0 bottom-0 w-2.5 bg-amber-700 rounded-full shadow-xs" style={{ left: '88%' }}></div>
            </div>

            <div className="flex justify-between items-center font-jetbrains font-mono text-[10px] text-slate-500">
              <span>₹5.64/g</span>
              <span className="text-amber-800 font-bold">Current: ₹20.30/g (Rich)</span>
              <span>₹19.16/g</span>
            </div>
          </div>
        </div>

        {/* Analytical Summary Panel: Metrics & Risk Parameters */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between pb-1">
            <span className="font-headline-sm text-sm text-slate-900 font-bold">
              Quantitative Risk Parameters
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-jetbrains font-mono text-[9px] font-bold">
              MCX BLEND
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-jetbrains font-mono text-[10px] text-slate-500">Avg Carry Cost</span>
                <span className="material-symbols-outlined text-[12px] text-emerald-600">trending_up</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 font-jetbrains font-mono">
                <span className="text-sm sm:text-base font-bold text-slate-900">₹3.82/g</span>
                <span className="text-[10px] text-sky-700 font-medium">(6.84% a.p.)</span>
              </div>
              <span className="text-[10px] text-emerald-700 mt-0.5 font-semibold">Positive Roll Carry</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-jetbrains font-mono text-[10px] text-slate-500">30D Std Dev (σ)</span>
                <span className="material-symbols-outlined text-[12px] text-amber-700">scatter_plot</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 font-jetbrains font-mono">
                <span className="text-sm sm:text-base font-bold text-slate-900">₹3.38/g</span>
                <span className="text-[10px] text-slate-500">1.80σ range</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5">Stationary Variance</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-jetbrains font-mono text-[10px] text-slate-500">Mean Rel. Spread</span>
                <span className="material-symbols-outlined text-[12px] text-sky-600">balance</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 font-jetbrains font-mono">
                <span className="text-sm sm:text-base font-bold text-slate-900">₹12.40/g</span>
                <span className="text-[10px] text-emerald-700 font-bold">+₹7.90</span>
              </div>
              <span className="text-[10px] text-emerald-700 mt-0.5 font-semibold">Current Basin Richness</span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-jetbrains font-mono text-[10px] text-slate-500">Beta to Spot 999</span>
                <span className="material-symbols-outlined text-[12px] text-sky-600">insights</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 font-jetbrains font-mono">
                <span className="text-sm sm:text-base font-bold text-slate-900">0.994</span>
                <span className="text-[10px] text-sky-700 font-semibold">R² 0.988</span>
              </div>
              <span className="text-[10px] text-sky-700 mt-0.5 font-medium">Residual stationary</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Action Floating Banner */}
      <div className="px-2 sm:px-3">
        <div className="bg-amber-700 text-white rounded-xl p-3 sm:p-4 shadow-md flex flex-col space-y-2 border border-amber-800">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-jetbrains font-mono text-[9px] text-amber-200 font-bold uppercase tracking-wider">
                Opportunity Signal
              </span>
              <span className="font-headline-sm text-sm sm:text-base font-bold text-white">
                Basis Richness +2.34σ (High Divergence)
              </span>
            </div>
            <div className="bg-amber-800/80 px-2 py-1 rounded text-white font-jetbrains font-mono text-[10px] font-bold flex items-center gap-1 border border-amber-600/50">
              <span className="material-symbols-outlined text-[13px] text-amber-300">bolt</span>
              <span>ARB-DESK</span>
            </div>
          </div>

          <p className="font-body-sm text-xs sm:text-sm text-amber-100 leading-snug">
            Sell GOLDPETAL Oct against Buy GOLDM Oct to harvest +₹7.90/g premium contraction back to 30D historical parity.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onExecuteSpreadClick}
              className="flex-1 bg-white hover:bg-slate-100 text-amber-900 font-headline-sm text-xs sm:text-sm font-bold py-2.5 rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-700">point_of_sale</span>
              <span>Execute Relative Value Spread</span>
            </button>
            <button
              onClick={onOpenSettingsClick}
              className="bg-amber-800 hover:bg-amber-900 text-white p-2.5 rounded-lg font-headline-sm text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer border border-amber-600/60"
              title="Tune Arbitrage Parameters"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
