import React, { useState } from 'react';
import { MCX_CONTRACT_SPECS } from '../../data/marketData';

export const ScreenSpecs: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<string>('GOLDM');

  const currentSpec =
    MCX_CONTRACT_SPECS.find((c) => c.symbol === selectedContract) || MCX_CONTRACT_SPECS[1];

  return (
    <div className="flex flex-col w-full pb-6 space-y-3 max-w-7xl mx-auto px-2 lg:px-4">
      {/* Top Header */}
      <div className="bg-slate-50 px-3 sm:px-4 py-3 border-b border-slate-200/80 shadow-xs rounded-xl mx-2 sm:mx-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">dataset</span>
            <div>
              <span className="font-headline-sm text-sm sm:text-base font-bold text-slate-900 block">
                MCX Precious Metals Pipeline Specs
              </span>
              <span className="font-jetbrains font-mono text-[10px] text-slate-500">
                Official Contract Specifications, Margining &amp; Purity Protocols
              </span>
            </div>
          </div>
          <span className="font-jetbrains font-mono text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">
            SEBI REGULATED
          </span>
        </div>

        {/* Contract Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-jetbrains font-mono text-[11px]">
          {MCX_CONTRACT_SPECS.map((c) => (
            <button
              key={c.symbol}
              onClick={() => setSelectedContract(c.symbol)}
              className={`px-3.5 py-1 rounded-lg transition-all font-semibold shrink-0 cursor-pointer ${
                selectedContract === c.symbol
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Multi-Contract Comparison Matrix Table */}
      <div className="px-2 sm:px-3">
        <div className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-xs overflow-x-auto">
          <span className="font-headline-sm text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2 font-jetbrains">
            MCX Gold Family Comparative Specifications Matrix
          </span>
          <table className="w-full text-left text-xs font-jetbrains font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase">
                <th className="py-2 pr-3">Contract</th>
                <th className="py-2 px-3">Trading Unit</th>
                <th className="py-2 px-3">Purity Fineness</th>
                <th className="py-2 px-3">Quotation</th>
                <th className="py-2 px-3">Tick Granularity</th>
                <th className="py-2 px-3">SPAN + ELM</th>
                <th className="py-2 pl-3">Delivery Center</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MCX_CONTRACT_SPECS.map((c) => {
                const isSelected = c.symbol === selectedContract;
                return (
                  <tr
                    key={c.symbol}
                    onClick={() => setSelectedContract(c.symbol)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 pr-3">
                      <span className="font-bold text-slate-900 block">{c.symbol}</span>
                      <span className="text-[10px] text-slate-400">{c.description}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">{c.tradingUnit}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                        {c.purity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800">{c.quotation}</td>
                    <td className="py-2.5 px-3 text-slate-800">{c.tickSize}</td>
                    <td className="py-2.5 px-3 text-amber-800 font-bold">{c.initialMargin}</td>
                    <td className="py-2.5 pl-3 text-slate-600 text-[11px]">{c.deliveryCenter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Contract Specification Detail Card */}
      <div className="px-2 sm:px-3">
        <div className="p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-base font-bold text-slate-900">
                  {currentSpec.symbol} — {currentSpec.description}
                </h3>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-jetbrains font-mono px-2 py-0.5 rounded border border-slate-200">
                  {currentSpec.purity}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Assayed via NABL accredited laboratories</p>
            </div>
            <span className="material-symbols-outlined text-amber-700 text-[26px]">verified</span>
          </div>

          {/* Matrix Grid: 4 columns on large desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-jetbrains font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Trading Unit
              </span>
              <span className="font-bold text-slate-900 text-[12px]">{currentSpec.tradingUnit}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Quotation Basis
              </span>
              <span className="font-bold text-slate-900 text-[12px]">{currentSpec.quotation}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Tick Granularity
              </span>
              <span className="font-bold text-slate-900 text-[12px]">{currentSpec.tickSize}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Initial SPAN + ELM Margin
              </span>
              <span className="font-bold text-amber-800 text-[12px]">
                {currentSpec.initialMargin}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 col-span-2">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Delivery Unit &amp; Tender Period
              </span>
              <span className="text-slate-800 font-medium text-[11px] block">{currentSpec.deliveryUnit}</span>
              <span className="text-slate-500 text-[10px]">{currentSpec.tenderPeriod}</span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 col-span-2">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                Delivery Center &amp; Vault Vaulting
              </span>
              <span className="text-slate-800 font-medium text-[11px]">{currentSpec.deliveryCenter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Purity Normalization Engine Explainer */}
      <div className="px-2 sm:px-3">
        <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="material-symbols-outlined text-[18px] text-sky-700">functions</span>
            <span className="text-sm">Mathematical Purity Normalization Engine</span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 font-jetbrains font-mono text-[12px] text-slate-800 space-y-1.5">
            <div className="text-amber-800 font-bold text-sm">
              Price(999) = Price(995) × [ 999.00 / 995.00 ] = Price(995) × 1.0040201
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed font-sans">
              The Desk Engine continuously scales all 995-purity wholesale contracts (GOLDM) to standard 999 bullion parity before computing basis deviations and Sigma Z-scores, guaranteeing pure relative value alpha devoid of assaying basis bias.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
