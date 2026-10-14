import React, { useState } from 'react';
import { INITIAL_HOLDINGS } from '../../data/marketData';

interface ScreenPortfolioProps {
  onRebalanceClick: () => void;
  onExportAuditClick: () => void;
  onNavigateToContract?: (symbol: string) => void;
  isWorkstationColumn?: boolean;
}

export const ScreenPortfolio: React.FC<ScreenPortfolioProps> = ({
  onRebalanceClick,
  onExportAuditClick,
  onNavigateToContract,
  isWorkstationColumn = false,
}) => {
  const [weightMode, setWeightMode] = useState<'weight' | 'val'>('weight');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const toggleWeightMode = () => {
    setWeightMode((prev) => (prev === 'weight' ? 'val' : 'weight'));
  };

  return (
    <div className={`flex flex-col w-full pb-6 space-y-3 ${isWorkstationColumn ? '' : 'max-w-7xl mx-auto px-2 lg:px-4'}`}>
      {/* Top Portfolio Health Bar */}
      <div className="px-3 sm:px-4 pt-1 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="font-jetbrains font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            Desk Engine: Algo-Alpha 999
          </span>
        </div>
        <span className="font-jetbrains font-mono text-[11px] text-slate-500">Cycle T+0 Valid</span>
      </div>

      {/* Standalone Desktop: 2-column top grid for NAV & Donut */}
      <div className={`grid grid-cols-1 ${isWorkstationColumn ? '' : 'lg:grid-cols-2'} gap-3 mx-3 sm:mx-4`}>
        {/* Primary NAV Stat Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="font-jetbrains font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Total Portfolio NAV
              </span>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-jetbrains font-mono text-[11px] border border-slate-200/60">
                <span className="material-symbols-outlined text-[13px] text-emerald-600">trending_up</span>
                <span className="font-semibold">MCX COMPLIANT</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <h1 className="font-headline-xl text-2xl sm:text-[32px] text-slate-900 tracking-tight font-bold">
                ₹24,85,420<span className="text-slate-400 font-jetbrains font-mono text-base font-normal">.00</span>
              </h1>
            </div>

            {/* PnL Badge & Performance Tag */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200/60 text-emerald-800 font-jetbrains font-mono text-[12px]">
                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                <span className="font-semibold">+₹1,42,850.00</span>
                <span className="opacity-80 text-[11px]">(+6.12% MTD)</span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200/80 text-slate-600 font-jetbrains font-mono text-[11px]">
                <span>Realized:</span>
                <span className="text-slate-900 font-semibold">₹34,620</span>
              </div>
            </div>
          </div>

          {/* Free Margin vs Deployed Margin Bar */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
            <div className="flex justify-between items-center font-jetbrains font-mono text-[11px]">
              <span className="text-slate-500">
                Deployed: <strong className="text-slate-900 font-semibold">75.1%</strong> (₹18,65,420)
              </span>
              <span className="text-slate-500">
                Free Cash: <strong className="text-slate-900 font-semibold">₹6,20,000</strong>
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
              <div className="h-full bg-amber-700 transition-all duration-500" style={{ width: '75.1%' }}></div>
              <div className="h-full bg-slate-300 transition-all duration-500" style={{ width: '24.9%' }}></div>
            </div>
          </div>
        </div>

        {/* Asset Grade Allocation Donut Section */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm text-slate-900 font-bold">Asset Grade Distribution</span>
              <span className="font-body-sm text-[12px] text-slate-500">Multi-contract cross-purity exposure</span>
            </div>
            <button
              onClick={toggleWeightMode}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-jetbrains font-mono text-[10px] tracking-wider uppercase font-semibold border border-slate-200 transition-colors cursor-pointer"
              id="toggleWeightMode"
            >
              {weightMode === 'weight' ? 'WEIGHT %' : 'VAL (₹)'}
            </button>
          </div>

          {/* Donut SVG Canvas */}
          <div className="flex flex-col items-center justify-center relative my-1">
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background ring */}
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#eff4ff" strokeWidth="12" />

                {/* Segment 1: GOLDM 42.5% */}
                <circle
                  className="transition-all duration-500 ease-out cursor-pointer hover:opacity-85"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#131b2e"
                  strokeDasharray="101.4 238.76"
                  strokeDashoffset="0"
                  strokeWidth={hoveredSegment === 'goldm' ? '14' : '12'}
                  onMouseEnter={() => setHoveredSegment('goldm')}
                  onMouseLeave={() => setHoveredSegment(null)}
                />

                {/* Segment 2: GOLDPETAL 26.0% */}
                <circle
                  className="transition-all duration-500 ease-out cursor-pointer hover:opacity-85"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#45464d"
                  strokeDasharray="62.0 238.76"
                  strokeDashoffset="-101.4"
                  strokeWidth={hoveredSegment === 'petal' ? '14' : '12'}
                  onMouseEnter={() => setHoveredSegment('petal')}
                  onMouseLeave={() => setHoveredSegment(null)}
                />

                {/* Segment 3: GOLDTEN 18.5% */}
                <circle
                  className="transition-all duration-500 ease-out cursor-pointer hover:opacity-85"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#904d00"
                  strokeDasharray="44.1 238.76"
                  strokeDashoffset="-163.4"
                  strokeWidth={hoveredSegment === 'ten' ? '14' : '12'}
                  onMouseEnter={() => setHoveredSegment('ten')}
                  onMouseLeave={() => setHoveredSegment(null)}
                />

                {/* Segment 4: GOLDGUINEA 8.0% */}
                <circle
                  className="transition-all duration-500 ease-out cursor-pointer hover:opacity-85"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#005137"
                  strokeDasharray="19.1 238.76"
                  strokeDashoffset="-207.5"
                  strokeWidth={hoveredSegment === 'guinea' ? '14' : '12'}
                  onMouseEnter={() => setHoveredSegment('guinea')}
                  onMouseLeave={() => setHoveredSegment(null)}
                />

                {/* Segment 5: Cash Reserve 5.0% */}
                <circle
                  className="transition-all duration-500 ease-out cursor-pointer hover:opacity-85"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#c6c6cd"
                  strokeDasharray="11.9 238.76"
                  strokeDashoffset="-226.6"
                  strokeWidth="12"
                />
              </svg>

              {/* Donut Center Information Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-jetbrains font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                  NAV Basis
                </span>
                <span className="font-headline-lg text-xl sm:text-2xl text-slate-900 font-bold tracking-tight">
                  {weightMode === 'weight' ? '₹24.85L' : '100%'}
                </span>
                <span className="font-jetbrains font-mono text-[10px] text-slate-500">5 Positions</span>
              </div>
            </div>
          </div>

          {/* Allocation Legend Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div
              onClick={() => onNavigateToContract?.('GOLDM')}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-colors cursor-pointer ${
                hoveredSegment === 'goldm' ? 'ring-1 ring-slate-800' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#131b2e] shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="font-jetbrains font-mono text-[11px] text-slate-900 truncate font-semibold">
                  GOLDM 100g
                </span>
                <span className="font-jetbrains font-mono text-[9px] text-slate-500">
                  {weightMode === 'weight' ? '42.5% · ₹10.56L' : '₹10,71,375 · 42.5%'}
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigateToContract?.('GOLDPETAL')}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-colors cursor-pointer ${
                hoveredSegment === 'petal' ? 'ring-1 ring-slate-800' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#45464d] shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="font-jetbrains font-mono text-[11px] text-slate-900 truncate font-semibold">
                  PETAL 1g
                </span>
                <span className="font-jetbrains font-mono text-[9px] text-slate-500">
                  {weightMode === 'weight' ? '26.0% · ₹6.46L' : '₹6,46,200 · 26.0%'}
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigateToContract?.('GOLDTEN')}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-colors cursor-pointer ${
                hoveredSegment === 'ten' ? 'ring-1 ring-slate-800' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#904d00] shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="font-jetbrains font-mono text-[11px] text-slate-900 truncate font-semibold">
                  GOLDTEN 10g
                </span>
                <span className="font-jetbrains font-mono text-[9px] text-slate-500">
                  {weightMode === 'weight' ? '18.5% · ₹4.60L' : '₹4,59,680 · 18.5%'}
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigateToContract?.('GOLDGUINEA')}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-colors cursor-pointer ${
                hoveredSegment === 'guinea' ? 'ring-1 ring-slate-800' : ''
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#005137] shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="font-jetbrains font-mono text-[11px] text-slate-900 truncate font-semibold">
                  GUINEA 8g
                </span>
                <span className="font-jetbrains font-mono text-[9px] text-slate-500">
                  {weightMode === 'weight' ? '8.0% · ₹1.99L' : '₹1,99,990 · 8.0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Holdings Breakdown */}
      <div className="mx-3 sm:mx-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline-sm text-sm text-slate-900 font-bold">Holdings Ledger</h2>
          <span className="font-jetbrains font-mono text-[10px] text-slate-500 font-semibold">
            SPOT: ₹7,142.50/g (999)
          </span>
        </div>

        {/* Responsive Grid for Holdings: 1 col in Workstation, 2 or 4 cols in Desktop standalone */}
        <div className={`grid grid-cols-1 ${isWorkstationColumn ? '' : 'md:grid-cols-2 xl:grid-cols-4'} gap-2.5`}>
          {/* Holding Card 1: GOLDM */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between gap-1.5 hover:border-slate-300 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm text-slate-900 font-bold">GOLDM</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-jetbrains font-mono text-[9px] text-slate-700 font-semibold border border-slate-200/60">
                    995 PURITY
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-jetbrains font-mono text-[9px] font-bold border border-sky-200/60">
                    WHOLESALE
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-slate-500">15 Lots · 1,500g Total Mass</span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains font-mono text-sm sm:text-base text-slate-900 font-bold">
                  ₹10,71,375<span className="text-slate-400 text-xs font-normal">.00</span>
                </span>
                <div className="flex items-center justify-end gap-1 text-emerald-700 font-jetbrains font-mono text-[11px]">
                  <span>+₹38,200</span>
                  <span className="font-bold">(+3.70%)</span>
                </div>
              </div>
            </div>

            {/* Metric Details */}
            <div className="grid grid-cols-2 gap-2 py-1 font-jetbrains font-mono text-[11px]">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">AVG PURCHASE</span>
                <span className="text-slate-900 font-medium">₹6,887.83 / g</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">EFFECTIVE DELTA</span>
                <span className="text-slate-900 font-medium">+1.488 kg eq.</span>
              </div>
            </div>

            {/* Weight Track Bar */}
            <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div className="h-full bg-amber-700 rounded-full" style={{ width: '42.5%' }}></div>
            </div>
          </div>

          {/* Holding Card 2: GOLDPETAL */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between gap-1.5 hover:border-slate-300 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm text-slate-900 font-bold">GOLDPETAL</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-jetbrains font-mono text-[9px] text-slate-700 font-semibold border border-slate-200/60">
                    999 PURITY
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-jetbrains font-mono text-[9px] font-bold border border-amber-200/60">
                    RETAIL
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-slate-500">900 Lots · 900g Physical Vaulted</span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains font-mono text-sm sm:text-base text-slate-900 font-bold">
                  ₹6,46,200<span className="text-slate-400 text-xs font-normal">.00</span>
                </span>
                <div className="flex items-center justify-end gap-1 text-emerald-700 font-jetbrains font-mono text-[11px]">
                  <span>+₹54,120</span>
                  <span className="font-bold">(+9.14%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 py-1 font-jetbrains font-mono text-[11px]">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">AVG PURCHASE</span>
                <span className="text-slate-900 font-medium">₹6,575.40 / g</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">DELIVERY ELIGIBILITY</span>
                <span className="text-emerald-700 font-semibold">Vault T+1 Fast</span>
              </div>
            </div>

            <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div className="h-full bg-slate-600 rounded-full" style={{ width: '26.0%' }}></div>
            </div>
          </div>

          {/* Holding Card 3: GOLDTEN */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between gap-1.5 hover:border-slate-300 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm text-slate-900 font-bold">GOLDTEN</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-jetbrains font-mono text-[9px] text-slate-700 font-semibold border border-slate-200/60">
                    999 PURITY
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-jetbrains font-mono text-[9px] font-bold border border-sky-200/60">
                    STANDARD
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-slate-500">64 Lots · 640g Active Hedge</span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains font-mono text-sm sm:text-base text-slate-900 font-bold">
                  ₹4,59,680<span className="text-slate-400 text-xs font-normal">.00</span>
                </span>
                <div className="flex items-center justify-end gap-1 text-emerald-700 font-jetbrains font-mono text-[11px]">
                  <span>+₹18,450</span>
                  <span className="font-bold">(+4.18%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 py-1 font-jetbrains font-mono text-[11px]">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">AVG PURCHASE</span>
                <span className="text-slate-900 font-medium">₹6,894.20 / g</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">BASIS SPREAD</span>
                <span className="text-slate-900 font-medium">+18.4 bps</span>
              </div>
            </div>

            <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div className="h-full bg-sky-600 rounded-full" style={{ width: '18.5%' }}></div>
            </div>
          </div>

          {/* Holding Card 4: GOLDGUINEA */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between gap-1.5 hover:border-slate-300 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm text-slate-900 font-bold">GOLDGUINEA</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-jetbrains font-mono text-[9px] text-slate-700 font-semibold border border-slate-200/60">
                    999 COIN
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-slate-500">35 Lots · 280g Mint Cast</span>
              </div>
              <div className="text-right">
                <span className="font-jetbrains font-mono text-sm sm:text-base text-slate-900 font-bold">
                  ₹1,99,990<span className="text-slate-400 text-xs font-normal">.00</span>
                </span>
                <div className="flex items-center justify-end gap-1 text-emerald-700 font-jetbrains font-mono text-[11px]">
                  <span>+₹6,900</span>
                  <span className="font-bold">(+3.57%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 py-1 font-jetbrains font-mono text-[11px]">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">AVG PURCHASE</span>
                <span className="text-slate-900 font-medium">₹7,012.10 / g</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 text-[9px] uppercase font-semibold">VAULT STATUS</span>
                <span className="text-emerald-700 font-semibold">LBMA Audited</span>
              </div>
            </div>

            <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden mt-1">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '8.0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Risk & Exposure Profile */}
      <div className={`mx-3 sm:mx-4 p-3.5 sm:p-4 rounded-xl bg-slate-100/80 border border-slate-200 shadow-xs ${isWorkstationColumn ? '' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-headline-sm text-sm text-slate-900 font-bold">Risk Architecture &amp; Arb Bounds</span>
          <span className="font-jetbrains font-mono text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-800 border border-slate-200 font-bold">
            GAMMA STABLE
          </span>
        </div>

        <div className={`grid grid-cols-1 ${isWorkstationColumn ? 'grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-2.5 mb-3`}>
          {/* Neutrality Card */}
          <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs">
            <span className="font-jetbrains font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
              Spot Beta Neutrality
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-lg text-xl sm:text-2xl text-slate-900 font-bold">0.04</span>
              <span className="font-jetbrains font-mono text-[10px] text-emerald-700 font-semibold">Target &lt; 0.05</span>
            </div>
            <p className="font-body-sm text-[11px] text-slate-500 mt-1 leading-snug">
              High market-neutral purity arb balance across ticks
            </p>
          </div>

          {/* Physical Delivery Obligation */}
          <div className="p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs">
            <span className="font-jetbrains font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
              Physical Obligation
            </span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="font-headline-lg text-xl sm:text-2xl text-slate-900 font-bold">3,320</span>
              <span className="font-jetbrains font-mono text-xs font-normal text-slate-500">g</span>
            </div>
            <p className="font-body-sm text-[11px] text-slate-500 mt-1 leading-snug">
              Covered 100% via MCX Approved C保管 Depository
            </p>
          </div>

          {/* Regulatory Floor Pill (desktop 3rd col or full width) */}
          <div className={`p-3 rounded-lg bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between ${isWorkstationColumn ? 'col-span-2' : ''}`}>
            <div>
              <span className="font-jetbrains font-mono text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                Initial SPAN Floor
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-lg text-xl sm:text-2xl text-emerald-700 font-bold">142.3%</span>
                <span className="font-jetbrains font-mono text-[10px] text-slate-500 font-semibold">T+0 Valid</span>
              </div>
            </div>
            <p className="font-body-sm text-[11px] text-slate-500 mt-1 leading-snug">
              Exceeds SEBI clearing margin requirement with zero margin penalty.
            </p>
          </div>
        </div>

        {/* Operational Desk Action Bar */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onRebalanceClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-amber-700 text-white font-headline-sm text-xs sm:text-sm font-semibold transition-transform active:scale-95 shadow-sm hover:bg-amber-800 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">balance</span>
            <span>Rebalance Legs</span>
          </button>

          <button
            onClick={onExportAuditClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-200 text-slate-800 font-headline-sm text-xs sm:text-sm font-semibold transition-transform active:scale-95 hover:bg-slate-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">sim_card_download</span>
            <span>Export Audit PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
