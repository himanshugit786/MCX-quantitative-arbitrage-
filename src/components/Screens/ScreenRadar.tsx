import React, { useState } from 'react';
import { ARBITRAGE_OPPORTUNITIES } from '../../data/marketData';
import { ArbitrageOpportunity } from '../../types/terminal';

interface ScreenRadarProps {
  onExecuteOpportunity: (opp: ArbitrageOpportunity) => void;
}

export const ScreenRadar: React.FC<ScreenRadarProps> = ({ onExecuteOpportunity }) => {
  const [filterType, setFilterType] = useState<'all' | 'active' | 'retail'>('all');

  const filtered = ARBITRAGE_OPPORTUNITIES.filter((opp) => {
    if (filterType === 'active') return opp.status === 'ACTIVE';
    if (filterType === 'retail') return opp.spreadType.includes('Retail');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-6 space-y-3 max-w-7xl mx-auto px-2 lg:px-4">
      {/* Top Scanner HUD */}
      <div className="bg-slate-50 px-3 sm:px-4 py-3 border-b border-slate-200/80 shadow-xs rounded-xl mx-2 sm:mx-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
            <span className="font-headline-sm text-sm sm:text-base font-bold text-slate-900">
              MCX Cross-Purity Scanner &amp; Arbitrage Matrix
            </span>
          </div>
          <span className="font-jetbrains font-mono text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">
            4 PAIRS MONITORED
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between bg-white p-1 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1 font-jetbrains font-mono text-[10px]">
            {(['all', 'active', 'retail'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterType(mode)}
                className={`px-3 py-1 rounded transition-all font-semibold uppercase cursor-pointer ${
                  filterType === mode
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-jetbrains">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Tick Latency: 1.2ms</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">Engine: Algo-Alpha 999</span>
          </div>
        </div>
      </div>

      {/* Responsive Grid for Opportunities & Order Book */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-2 sm:px-3">
        {/* Arbitrage Opportunities Cards (2 Cols on Desktop) */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-xs font-bold text-slate-900 uppercase tracking-wider font-jetbrains">
              Live Dislocation Spreads
            </span>
            <span className="text-[10px] font-jetbrains text-slate-500">Real-time Tick Stream</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filtered.map((opp) => {
              const isHighAlpha = Math.abs(opp.zScore) >= 1.8;
              return (
                <div
                  key={opp.id}
                  className={`p-3.5 rounded-xl border bg-white shadow-xs transition-all flex flex-col justify-between ${
                    isHighAlpha
                      ? 'border-amber-300 ring-1 ring-amber-200/60'
                      : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-sm font-bold text-slate-900">
                            {opp.legA}
                          </span>
                          <span className="text-slate-400 font-jetbrains text-xs font-bold">vs</span>
                          <span className="font-headline-sm text-sm font-bold text-slate-700">
                            {opp.legB}
                          </span>
                        </div>
                        <span className="text-[11px] font-jetbrains text-slate-500">{opp.spreadType}</span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`font-jetbrains font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            opp.action === 'SELL SPREAD'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : opp.action === 'BUY SPREAD'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {opp.action}
                        </span>
                        <div className="text-[11px] font-jetbrains text-slate-400 mt-0.5">
                          Vol: {opp.volume24h}
                        </div>
                      </div>
                    </div>

                    {/* Spread & Z-Score Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 font-jetbrains font-mono text-xs">
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase font-semibold">
                          Current Spread
                        </span>
                        <span className="font-bold text-slate-900">
                          {opp.currentSpread > 0 ? `+₹${opp.currentSpread.toFixed(2)}` : `₹${opp.currentSpread.toFixed(2)}`}
                          /g
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase font-semibold">
                          Fair Basis
                        </span>
                        <span className="text-slate-600">₹{opp.fairSpread.toFixed(2)}/g</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] text-slate-400 uppercase font-semibold">
                          Z-Score
                        </span>
                        <span
                          className={`font-bold ${
                            Math.abs(opp.zScore) >= 2.0
                              ? 'text-amber-800'
                              : Math.abs(opp.zScore) >= 1.0
                              ? 'text-sky-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {opp.zScore > 0 ? `+${opp.zScore.toFixed(2)}σ` : `${opp.zScore.toFixed(2)}σ`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-2.5 mt-1">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <span className="text-slate-400">Target Alpha:</span>
                      <span className="font-jetbrains font-bold text-emerald-700">{opp.expectedAlpha}</span>
                    </div>

                    <button
                      onClick={() => onExecuteOpportunity(opp)}
                      className="py-1.5 px-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-headline-sm text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      <span>Route Arb</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* L2 Real-time Order Book Depth Matrix (Right Col on Desktop) */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-700 text-[16px]">menu_book</span>
                <span className="font-headline-sm text-xs font-bold text-slate-900">
                  L2 Spread Depth (PETAL - GOLDM)
                </span>
              </div>
              <span className="font-jetbrains font-mono text-[10px] text-emerald-700 font-semibold">
                Spread: ₹20.30/g
              </span>
            </div>

            {/* Depth columns: Bids vs Asks */}
            <div className="grid grid-cols-2 gap-2 text-xs font-jetbrains font-mono pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold pb-0.5">
                  <span>Lots</span>
                  <span>Bid Spread</span>
                </div>
                {[
                  { lots: 450, price: '₹20.25', fill: 85 },
                  { lots: 320, price: '₹20.20', fill: 65 },
                  { lots: 180, price: '₹20.15', fill: 40 },
                  { lots: 90, price: '₹20.10', fill: 20 },
                  { lots: 60, price: '₹20.05', fill: 12 },
                ].map((row, idx) => (
                  <div key={idx} className="relative flex justify-between items-center px-1.5 py-1 rounded overflow-hidden">
                    <div
                      className="absolute inset-y-0 right-0 bg-emerald-100/70"
                      style={{ width: `${row.fill}%` }}
                    ></div>
                    <span className="relative z-10 text-slate-600">{row.lots}</span>
                    <span className="relative z-10 text-emerald-800 font-semibold">{row.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold pb-0.5">
                  <span>Ask Spread</span>
                  <span>Lots</span>
                </div>
                {[
                  { lots: 520, price: '₹20.35', fill: 90 },
                  { lots: 290, price: '₹20.40', fill: 55 },
                  { lots: 210, price: '₹20.45', fill: 45 },
                  { lots: 110, price: '₹20.50', fill: 25 },
                  { lots: 80, price: '₹20.55', fill: 15 },
                ].map((row, idx) => (
                  <div key={idx} className="relative flex justify-between items-center px-1.5 py-1 rounded overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-100/70"
                      style={{ width: `${row.fill}%` }}
                    ></div>
                    <span className="relative z-10 text-rose-800 font-semibold">{row.price}</span>
                    <span className="relative z-10 text-slate-600">{row.lots}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-600">
            <span className="font-semibold text-slate-900 block">Queue Priority: Direct API</span>
            <span>Orders fill within 0.4 bps of synthetic book midpoint.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
