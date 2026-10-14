import React from 'react';
import { ScreenPortfolio } from './ScreenPortfolio';
import { ScreenContractMatrix } from './ScreenContractMatrix';
import { ScreenBasisDynamics } from './ScreenBasisDynamics';
import { CurveSubScreen } from '../../types/terminal';

interface ScreenWorkstationProps {
  onRebalanceClick: () => void;
  onExportAuditClick: () => void;
  onHedgeSpreadClick: () => void;
  onOpenSizerClick: () => void;
  onOpenSettingsClick: () => void;
  onFocusScreen: (sub: CurveSubScreen) => void;
}

export const ScreenWorkstation: React.FC<ScreenWorkstationProps> = ({
  onRebalanceClick,
  onExportAuditClick,
  onHedgeSpreadClick,
  onOpenSizerClick,
  onOpenSettingsClick,
  onFocusScreen,
}) => {
  return (
    <div className="w-full px-2 sm:px-3 lg:px-4 pb-6">
      {/* Workstation Top Bar */}
      <div className="mb-3 px-2 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs font-jetbrains font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="font-bold text-slate-800">MCX DOCKING WORKSTATION: MULTI-PANE LIVE FEED</span>
          <span className="hidden sm:inline text-slate-400">| 3 Real-time Quant Tiles</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="hidden md:inline">Synchronized tick-by-tick</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">L1/L2 ACTIVE</span>
        </div>
      </div>

      {/* 3-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
        {/* Pane 1: Portfolio NAV, Donut & Holdings Ledger */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-amber-700"></span>
              <span className="font-headline-sm text-xs font-bold text-slate-900 uppercase tracking-wide">
                1. Portfolio NAV &amp; Ledger
              </span>
            </div>
            <button
              onClick={() => onFocusScreen('portfolio')}
              className="text-[10px] text-slate-500 hover:text-amber-800 font-jetbrains flex items-center gap-0.5 cursor-pointer"
              title="Expand this tile to full desktop width"
            >
              <span>Maximize</span>
              <span className="material-symbols-outlined text-[13px]">open_in_full</span>
            </button>
          </div>

          <div className="p-1">
            <ScreenPortfolio
              onRebalanceClick={onRebalanceClick}
              onExportAuditClick={onExportAuditClick}
              onNavigateToContract={() => onFocusScreen('contract')}
              isWorkstationColumn={true}
            />
          </div>
        </div>

        {/* Pane 2: GOLDM OCT24, 15M Candles Dual Chart & SPAN Matrix */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-sky-700"></span>
              <span className="font-headline-sm text-xs font-bold text-slate-900 uppercase tracking-wide">
                2. Candles &amp; Spec Matrix
              </span>
            </div>
            <button
              onClick={() => onFocusScreen('contract')}
              className="text-[10px] text-slate-500 hover:text-amber-800 font-jetbrains flex items-center gap-0.5 cursor-pointer"
              title="Expand this tile to full desktop width"
            >
              <span>Maximize</span>
              <span className="material-symbols-outlined text-[13px]">open_in_full</span>
            </button>
          </div>

          <div className="p-1">
            <ScreenContractMatrix
              onHedgeSpreadClick={onHedgeSpreadClick}
              onOpenSizerClick={onOpenSizerClick}
              isWorkstationColumn={true}
            />
          </div>
        </div>

        {/* Pane 3: Price & Basis Dynamics Dual SVG Chart & Signal */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-emerald-700"></span>
              <span className="font-headline-sm text-xs font-bold text-slate-900 uppercase tracking-wide">
                3. Basis Dynamics &amp; Opportunity
              </span>
            </div>
            <button
              onClick={() => onFocusScreen('dynamics')}
              className="text-[10px] text-slate-500 hover:text-amber-800 font-jetbrains flex items-center gap-0.5 cursor-pointer"
              title="Expand this tile to full desktop width"
            >
              <span>Maximize</span>
              <span className="material-symbols-outlined text-[13px]">open_in_full</span>
            </button>
          </div>

          <div className="p-1">
            <ScreenBasisDynamics
              onExecuteSpreadClick={onHedgeSpreadClick}
              onOpenSettingsClick={onOpenSettingsClick}
              isWorkstationColumn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
