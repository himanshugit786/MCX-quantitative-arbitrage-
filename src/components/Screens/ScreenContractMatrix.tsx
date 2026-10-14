import React, { useState } from 'react';
import { CANDLESTICK_SERIES } from '../../data/marketData';

interface ScreenContractMatrixProps {
  onHedgeSpreadClick: () => void;
  onOpenSizerClick: () => void;
  isWorkstationColumn?: boolean;
}

export const ScreenContractMatrix: React.FC<ScreenContractMatrixProps> = ({
  onHedgeSpreadClick,
  onOpenSizerClick,
  isWorkstationColumn = false,
}) => {
  const [horizon, setHorizon] = useState<'30D' | '90D' | '1Y'>('30D');
  const [selectedLotSize, setSelectedLotSize] = useState<number>(1);
  const [customLot, setCustomLot] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [activeCandleIndex, setActiveCandleIndex] = useState<number>(12);

  const currentCandle = CANDLESTICK_SERIES[activeCandleIndex] || CANDLESTICK_SERIES[12];

  const handleLotSelect = (lots: number) => {
    setSelectedLotSize(lots);
    setShowCustomInput(false);
  };

  const handleCustomLotSubmit = () => {
    const parsed = parseInt(customLot, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedLotSize(parsed);
      setShowCustomInput(false);
    }
  };

  return (
    <div className={`flex flex-col w-full pb-6 space-y-3 ${isWorkstationColumn ? '' : 'max-w-7xl mx-auto px-2 lg:px-4'}`}>
      {/* Asset Quick Selector & Sub-bar */}
      <div className="bg-slate-50 px-3 sm:px-4 py-3 border-b border-slate-200/80 shadow-xs rounded-xl mx-2 sm:mx-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sky-700 text-[20px]">show_chart</span>
            </div>
            <div className="truncate">
              <div className="flex items-center space-x-1.5">
                <span className="font-headline-sm text-sm sm:text-base text-slate-900 font-bold tracking-tight">
                  GOLDM OCT24
                </span>
                <span className="bg-slate-200/80 text-slate-700 font-jetbrains font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold">
                  100g • 995 Purity
                </span>
              </div>
              <p className="font-jetbrains font-mono text-[11px] text-slate-500 truncate">
                MCX Multi-Commodity Mini
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-jetbrains font-mono text-sm sm:text-lg text-slate-900 font-bold">
              ₹7,142.50<span className="text-slate-400 font-normal text-[10px]">/g</span>
            </div>
            <div className="font-jetbrains font-mono text-[11px] text-sky-700 font-semibold">
              ₹7,14,250 <span className="text-slate-400 font-normal">/ Lot</span>
            </div>
          </div>
        </div>

        {/* Benchmark Horizon & Normalization Filters */}
        <div className="flex items-center justify-between pt-2 mt-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-1">
            <span className="font-jetbrains font-mono text-[9px] text-slate-400 mr-1 uppercase font-semibold">
              Horizon:
            </span>
            {(['30D', '90D', '1Y'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`font-jetbrains font-mono text-[10px] px-2.5 py-0.5 rounded transition-all font-semibold cursor-pointer ${
                  horizon === h
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">check_circle</span>
            <span className="font-jetbrains font-mono text-[10px] font-bold">995→999 Scaled</span>
          </div>
        </div>
      </div>

      {/* Main Chart Card (Desktop full-width or Workstation centered) */}
      <div className="px-2 sm:px-3">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 space-y-2.5">
          {/* Chart Interactive Micro-HUD */}
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center space-x-2 font-jetbrains font-mono">
              <span className="w-2.5 h-2.5 rounded bg-amber-700"></span>
              <span className="text-[11px] sm:text-xs text-slate-900 font-bold">CANDLES (15M)</span>
              <span className="text-slate-300 text-xs">/</span>
              <span className="text-[11px] text-slate-500 font-semibold">30D FV RIBBON</span>
            </div>
            <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-jetbrains font-mono">
              <span className="text-[9px] text-slate-500">SESS RANGE:</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-900">₹7,118 - 7,149</span>
            </div>
          </div>

          {/* Real-time dynamic OHLC crosshair pill */}
          <div className="bg-slate-50 border border-slate-200/80 rounded p-2 flex items-center justify-between overflow-x-auto text-nowrap font-jetbrains font-mono">
            <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
              <span className="text-slate-500">
                <span className="font-bold text-slate-900">O</span> {currentCandle.open.toFixed(1)}
              </span>
              <span className="text-slate-500">
                <span className="font-bold text-slate-900">H</span> {currentCandle.high.toFixed(1)}
              </span>
              <span className="text-slate-500">
                <span className="font-bold text-slate-900">L</span> {currentCandle.low.toFixed(1)}
              </span>
              <span className="text-amber-800 font-bold">
                <span className="text-slate-900">C</span> {currentCandle.close.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 pl-2">
              <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">
                OI +8.4%
              </span>
            </div>
          </div>

          {/* SVG Chart Canvas Area */}
          <div className="w-full relative h-52 sm:h-64 bg-slate-50/70 border border-slate-200/80 rounded-lg overflow-hidden flex flex-col justify-between p-2 select-none">
            {/* Main Price Candlesticks Canvas with SVG */}
            <svg className="w-full h-36 sm:h-48" preserveAspectRatio="none" viewBox="0 0 340 120">
              <defs>
                <linearGradient id="fairValueGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b45309" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line opacity="0.4" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.7" x1="0" x2="340" y1="20" y2="20" />
              <line opacity="0.4" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.7" x1="0" x2="340" y1="50" y2="50" />
              <line opacity="0.4" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.7" x1="0" x2="340" y1="80" y2="80" />
              <line opacity="0.4" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="0.7" x1="0" x2="340" y1="110" y2="110" />

              {/* Historical 30D Benchmark Fair Value Ribbon (Curved Path) */}
              <path d="M 0,90 Q 50,84 90,82 T 180,68 T 270,55 T 340,48 L 340,120 L 0,120 Z" fill="url(#fairValueGrad)" />
              <path d="M 0,90 Q 50,84 90,82 T 180,68 T 270,55 T 340,48" fill="none" stroke="#b45309" strokeDasharray="4 2" strokeWidth="1.8" />

              {/* Candlesticks sequence */}
              <line stroke="#dc2626" strokeWidth="1" x1="20" x2="20" y1="65" y2="92" />
              <rect fill="#dc2626" height="15" rx="1" width="8" x="16" y="70" />

              <line stroke="#059669" strokeWidth="1" x1="45" x2="45" y1="68" y2="94" />
              <rect fill="#059669" height="16" rx="1" width="8" x="41" y="72" />

              <line stroke="#059669" strokeWidth="1" x1="70" x2="70" y1="60" y2="85" />
              <rect fill="#059669" height="14" rx="1" width="8" x="66" y="64" />

              <line stroke="#dc2626" strokeWidth="1" x1="95" x2="95" y1="58" y2="82" />
              <rect fill="#dc2626" height="12" rx="1" width="8" x="91" y="62" />

              <line stroke="#059669" strokeWidth="1" x1="120" x2="120" y1="55" y2="76" />
              <rect fill="#059669" height="11" rx="1" width="8" x="116" y="58" />

              <line stroke="#059669" strokeWidth="1" x1="145" x2="145" y1="42" y2="68" />
              <rect fill="#059669" height="16" rx="1" width="8" x="141" y="46" />

              <line stroke="#dc2626" strokeWidth="1" x1="170" x2="170" y1="45" y2="72" />
              <rect fill="#dc2626" height="14" rx="1" width="8" x="166" y="50" />

              <line stroke="#059669" strokeWidth="1" x1="195" x2="195" y1="36" y2="60" />
              <rect fill="#059669" height="18" rx="1" width="8" x="191" y="38" />

              <line stroke="#059669" strokeWidth="1" x1="220" x2="220" y1="30" y2="52" />
              <rect fill="#059669" height="16" rx="1" width="8" x="216" y="32" />

              <line stroke="#64748b" strokeWidth="1" x1="245" x2="245" y1="26" y2="46" />
              <rect fill="#64748b" height="3" rx="0.5" width="8" x="241" y="34" />

              <line stroke="#059669" strokeWidth="1" x1="270" x2="270" y1="18" y2="42" />
              <rect fill="#059669" height="15" rx="1" width="8" x="266" y="22" />

              <line stroke="#dc2626" strokeWidth="1" x1="295" x2="295" y1="19" y2="39" />
              <rect fill="#dc2626" height="10" rx="1" width="8" x="291" y="24" />

              <line stroke="#059669" strokeWidth="1" x1="320" x2="320" y1="14" y2="36" />
              <rect fill="#059669" height="14" rx="1" width="8" x="316" y="16" />

              {/* Price Level Labels inside Chart */}
              <text fill="#64748b" fontFamily="JetBrains Mono" fontSize="7" textAnchor="end" x="338" y="22">
                7,148
              </text>
              <text fill="#64748b" fontFamily="JetBrains Mono" fontSize="7" textAnchor="end" x="338" y="52">
                7,136
              </text>
              <text fill="#64748b" fontFamily="JetBrains Mono" fontSize="7" textAnchor="end" x="338" y="82">
                7,124
              </text>
            </svg>

            {/* Sub-panel Volume & Open Interest (OI) Bar Overlay */}
            <div className="h-12 w-full pt-1 flex items-end">
              <svg className="w-full h-10" preserveAspectRatio="none" viewBox="0 0 340 40">
                <path
                  d="M 16,32 L 41,29 L 66,27 L 91,28 L 116,24 L 141,19 L 166,20 L 191,15 L 216,14 L 241,12 L 266,9 L 291,10 L 316,6"
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />

                <rect fill="#dc2626" height="16" opacity="0.45" width="6" x="17" y="24" />
                <rect fill="#059669" height="20" opacity="0.45" width="6" x="42" y="20" />
                <rect fill="#059669" height="22" opacity="0.45" width="6" x="67" y="18" />
                <rect fill="#dc2626" height="18" opacity="0.45" width="6" x="92" y="22" />
                <rect fill="#059669" height="14" opacity="0.45" width="6" x="117" y="26" />
                <rect fill="#059669" height="26" opacity="0.55" width="6" x="142" y="14" />
                <rect fill="#dc2626" height="19" opacity="0.45" width="6" x="167" y="21" />
                <rect fill="#059669" height="28" opacity="0.65" width="6" x="192" y="12" />
                <rect fill="#059669" height="25" opacity="0.55" width="6" x="217" y="15" />
                <rect fill="#64748b" height="15" opacity="0.45" width="6" x="242" y="25" />
                <rect fill="#059669" height="32" opacity="0.8" width="6" x="267" y="8" />
                <rect fill="#dc2626" height="24" opacity="0.45" width="6" x="292" y="16" />
                <rect fill="#059669" height="30" opacity="0.85" width="6" x="317" y="10" />
              </svg>
            </div>
          </div>

          {/* Chart Metadata Indicators & Totals */}
          <div className="flex items-center justify-between pt-1 font-jetbrains font-mono">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-amber-700 opacity-60"></span>
                <span className="text-[11px] text-slate-500">
                  Vol: <span className="font-semibold text-slate-900">38,410 Lots</span>
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-0.5 bg-sky-600"></span>
                <span className="text-[11px] text-slate-500">
                  OI: <span className="font-semibold text-slate-900">12,850 Lots</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] text-sky-700 font-bold uppercase">
              Institutional Roll Active
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Grid for Dual Panels: Performance Trend vs Margin Matrix */}
      <div className={`grid grid-cols-1 ${isWorkstationColumn ? '' : 'lg:grid-cols-2'} gap-3 px-2 sm:px-3`}>
        {/* Performance Trend Card (Benchmark Comparison Matrix) */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-700">analytics</span>
                <span className="font-jetbrains font-mono text-[10px] text-slate-900 font-bold uppercase tracking-wider">
                  Historical Sigma Divergence
                </span>
              </div>
              <span className="font-jetbrains font-mono text-[9px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200/60">
                STDEV +1.8σ RICH
              </span>
            </div>

            {/* Spread Divergence Notification Banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 animate-ping"></span>
                <span className="font-body-sm text-[11px] sm:text-xs text-slate-800 font-medium">
                  Trading <span className="font-jetbrains font-mono font-bold text-sky-800">+₹7.90/g</span> over benchmark
                </span>
              </div>
              <span className="font-jetbrains font-mono text-[11px] text-slate-600 font-semibold">
                Z-Score: +1.82
              </span>
            </div>
          </div>

          {/* Comparative KPI Dual Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 font-jetbrains font-mono">
            {/* Live Contract Panel */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 space-y-1.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-[9px] text-slate-400 uppercase font-bold">Active Contract</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Hist Vol (HV)</span>
                <span className="text-slate-900 font-semibold">14.2%</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Spot Basis</span>
                <span className="text-amber-800 font-bold">+₹20.30/g</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Session VWAP</span>
                <span className="text-slate-900 font-medium">₹7,138.20</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Roll Yield (Ann)</span>
                <span className="text-emerald-700 font-bold">+6.84%</span>
              </div>
            </div>

            {/* 3Y Historical Baseline Panel */}
            <div className="bg-slate-100/70 border border-slate-200/80 rounded-lg p-2.5 space-y-1.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                <span className="text-[9px] text-slate-400 uppercase font-bold">3Y Mean Baseline</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">HV Median</span>
                <span className="text-slate-900 font-semibold">11.8%</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Avg Basis</span>
                <span className="text-slate-900 font-semibold">+₹12.40/g</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Spread σ</span>
                <span className="text-slate-900 font-medium">₹4.38/g</span>
              </div>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-slate-500 font-sans">Contango Freq</span>
                <span className="text-slate-900 font-bold">89.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Margin, Limits & Spec Matrix Panel */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-3 sm:p-4 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-900">shield</span>
              <span className="font-headline-sm text-sm text-slate-900 font-bold">
                Margin, Limits &amp; Spec Matrix
              </span>
            </div>
            <span className="font-jetbrains font-mono text-[9px] bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded font-bold">
              SPAN+ELM CERTIFIED
            </span>
          </div>

          {/* Key Requirement Tile Blocks */}
          <div className="grid grid-cols-2 gap-2 font-jetbrains font-mono">
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Initial Requirement</span>
              <div className="text-sm font-bold text-slate-900">
                ₹68,500 <span className="text-[10px] text-slate-400 font-normal">/ Lot</span>
              </div>
              <span className="font-sans text-[11px] text-amber-800 font-medium block">
                9.60% (SPAN: 8.35% + ELM)
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Delivery Period Margin</span>
              <div className="text-sm font-bold text-slate-900">
                ₹1,78,560 <span className="text-[10px] text-slate-400 font-normal">/ Lot</span>
              </div>
              <span className="font-sans text-[11px] text-slate-500 block">
                25% (T-5 Days Tender)
              </span>
            </div>
          </div>

          {/* Fine-Grain Parameters List */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Active Open Market Value</span>
              <span className="font-jetbrains font-mono text-[11px] font-bold text-slate-900">₹2,740.85 Cr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Average Daily Turnover (30D)</span>
              <span className="font-jetbrains font-mono text-[11px] font-bold text-slate-900">₹482.40 Cr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Tick Sensitivity &amp; Granularity</span>
              <span className="font-jetbrains font-mono text-[11px] font-bold text-slate-900">
                ₹1.00/10g <span className="text-slate-400 font-normal">(₹0.10/g)</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Delivery Center &amp; Standard</span>
              <span className="font-jetbrains font-mono text-[11px] font-bold text-slate-900">
                Ahmedabad (LBMA Accr.)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Quantitative Execution Bar */}
      <div className="px-2 sm:px-3 pt-1">
        <div className="bg-white border border-slate-200/80 p-3 sm:p-4 rounded-xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-slate-500">
              <span className="material-symbols-outlined text-[16px] text-amber-700">tune</span>
              <span className="font-jetbrains font-mono text-[10px] uppercase font-bold text-slate-700">
                Spread Routing Engine
              </span>
            </div>

            <div className="flex items-center space-x-1 font-jetbrains font-mono">
              {[1, 5, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => handleLotSelect(num)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedLotSize === num && !showCustomInput
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num} {num === 1 ? 'Lot' : ''}
                </button>
              ))}
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  showCustomInput ? 'bg-amber-700 text-white' : 'bg-slate-100 text-amber-700 hover:bg-slate-200'
                }`}
              >
                +Custom
              </button>
            </div>
          </div>

          {showCustomInput && (
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Lots:</span>
              <input
                type="number"
                min="1"
                placeholder="Enter lots"
                value={customLot}
                onChange={(e) => setCustomLot(e.target.value)}
                className="w-24 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-jetbrains"
              />
              <button
                onClick={handleCustomLotSubmit}
                className="px-2.5 py-1 bg-slate-900 text-white text-xs rounded font-semibold cursor-pointer"
              >
                Set
              </button>
            </div>
          )}

          {/* Execution Primary CTA */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={onHedgeSpreadClick}
              className="col-span-4 bg-amber-700 hover:bg-amber-800 text-white py-2.5 px-3 rounded-lg flex items-center justify-center space-x-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">balance</span>
              <span className="font-headline-sm text-xs sm:text-sm font-bold text-white">
                Hedge via Relative Value Spread
              </span>
            </button>

            <button
              onClick={onOpenSizerClick}
              className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 py-2.5 px-2 rounded-lg flex flex-col items-center justify-center space-y-0.5 active:scale-95 transition-all cursor-pointer"
              title="Calculate Risk Sizing"
            >
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span className="font-jetbrains font-mono uppercase text-[9px] font-bold">Sizer</span>
            </button>
          </div>

          <p className="font-body-sm text-slate-500 text-center text-[10px]">
            Auto-hedges via MCX GOLD Big (1kg) / Spot 999. Calculated tick-by-tick.
          </p>
        </div>
      </div>
    </div>
  );
};
