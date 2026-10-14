/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, CurveSubScreen, ArbitrageOpportunity } from './types/terminal';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenPortfolio } from './components/Screens/ScreenPortfolio';
import { ScreenContractMatrix } from './components/Screens/ScreenContractMatrix';
import { ScreenBasisDynamics } from './components/Screens/ScreenBasisDynamics';
import { ScreenWorkstation } from './components/Screens/ScreenWorkstation';
import { ScreenRadar } from './components/Screens/ScreenRadar';
import { ScreenBacktest } from './components/Screens/ScreenBacktest';
import { ScreenSpecs } from './components/Screens/ScreenSpecs';
import { ExecuteSpreadModal } from './components/Modals/ExecuteSpreadModal';
import { RebalanceModal } from './components/Modals/RebalanceModal';
import { PositionSizerModal } from './components/Modals/PositionSizerModal';
import { AuditReportModal } from './components/Modals/AuditReportModal';
import { DeskSettingsModal } from './components/Modals/DeskSettingsModal';
import { ProjectReportModal } from './components/Modals/ProjectReportModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('curves');
  // Default to workstation multi-pane on desktop
  const [currentCurveSubScreen, setCurrentCurveSubScreen] = useState<CurveSubScreen>('workstation');
  const [spotPrice, setSpotPrice] = useState<number>(7142.80);
  const [isMockTickActive, setIsMockTickActive] = useState<boolean>(true);

  // Modals
  const [isExecuteSpreadOpen, setIsExecuteSpreadOpen] = useState<boolean>(false);
  const [executeLots, setExecuteLots] = useState<number>(1);
  const [isRebalanceOpen, setIsRebalanceOpen] = useState<boolean>(false);
  const [isPositionSizerOpen, setIsPositionSizerOpen] = useState<boolean>(false);
  const [isAuditReportOpen, setIsAuditReportOpen] = useState<boolean>(false);
  const [isDeskSettingsOpen, setIsDeskSettingsOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Mock tick oscillation within sub-rupee bounds to simulate live MCX feed
  useEffect(() => {
    if (!isMockTickActive) return;

    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.40;
      setSpotPrice((prev) => {
        const next = Math.round((prev + delta) * 10) / 10;
        if (next < 7141.20) return 7141.50;
        if (next > 7145.00) return 7144.20;
        return next;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isMockTickActive]);

  const handleOpenSpreadModal = (lots = 1) => {
    setExecuteLots(lots);
    setIsExecuteSpreadOpen(true);
  };

  const handleExecuteArbOpp = (opp: ArbitrageOpportunity) => {
    setExecuteLots(1);
    setIsExecuteSpreadOpen(true);
  };

  const handleSpreadExecuted = (details: { lots: number; alpha: string }) => {
    showToast(`Order Matched: ${details.lots} Spread Leg(s) Executed. Expected Alpha: ${details.alpha}`);
  };

  const handleRebalanceSuccess = () => {
    showToast('Portfolio Legs Rebalanced: Beta Delta neutralized to 0.00');
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Global Fixed Desktop Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentCurveSubScreen={currentCurveSubScreen}
        onSelectCurveSubScreen={(sub) => {
          setCurrentCurveSubScreen(sub);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        spotPrice={spotPrice}
        onOpenSettings={() => setIsDeskSettingsOpen(true)}
        onOpenRebalance={() => setIsRebalanceOpen(true)}
        onOpenSizer={() => setIsPositionSizerOpen(true)}
        onOpenAudit={() => setIsAuditReportOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Full-Screen Body */}
      <main className="flex-1 w-full bg-white pt-24 sm:pt-28 pb-20 lg:pb-8">
        {/* TAB 1: RADAR */}
        {currentTab === 'radar' && (
          <ScreenRadar onExecuteOpportunity={handleExecuteArbOpp} />
        )}

        {/* TAB 2: CURVES */}
        {currentTab === 'curves' && (
          <>
            {/* Desktop Workstation Multi-Pane (All 3 screens side-by-side) */}
            {currentCurveSubScreen === 'workstation' && (
              <ScreenWorkstation
                onRebalanceClick={() => setIsRebalanceOpen(true)}
                onExportAuditClick={() => setIsAuditReportOpen(true)}
                onHedgeSpreadClick={() => handleOpenSpreadModal(1)}
                onOpenSizerClick={() => setIsPositionSizerOpen(true)}
                onOpenSettingsClick={() => setIsDeskSettingsOpen(true)}
                onFocusScreen={(sub) => {
                  setCurrentCurveSubScreen(sub);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Sub-view 1: Portfolio NAV & Ledger */}
            {currentCurveSubScreen === 'portfolio' && (
              <ScreenPortfolio
                onRebalanceClick={() => setIsRebalanceOpen(true)}
                onExportAuditClick={() => setIsAuditReportOpen(true)}
                onNavigateToContract={(sym) => {
                  setCurrentCurveSubScreen('contract');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isWorkstationColumn={false}
              />
            )}

            {/* Sub-view 2: Contract Candlestick & Spec Matrix */}
            {currentCurveSubScreen === 'contract' && (
              <ScreenContractMatrix
                onHedgeSpreadClick={() => handleOpenSpreadModal(1)}
                onOpenSizerClick={() => setIsPositionSizerOpen(true)}
                isWorkstationColumn={false}
              />
            )}

            {/* Sub-view 3: Price & Basis Dynamics */}
            {currentCurveSubScreen === 'dynamics' && (
              <ScreenBasisDynamics
                onExecuteSpreadClick={() => handleOpenSpreadModal(1)}
                onOpenSettingsClick={() => setIsDeskSettingsOpen(true)}
                isWorkstationColumn={false}
              />
            )}
          </>
        )}

        {/* TAB 3: BACKTEST */}
        {currentTab === 'backtest' && <ScreenBacktest />}

        {/* TAB 4: SPECS */}
        {currentTab === 'specs' && <ScreenSpecs />}
      </main>

      {/* Mobile-only Bottom Navigation (hidden on desktop screens) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 font-jetbrains font-mono text-xs flex items-center gap-2 max-w-[90vw] animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <ExecuteSpreadModal
        isOpen={isExecuteSpreadOpen}
        lots={executeLots}
        onClose={() => setIsExecuteSpreadOpen(false)}
        onExecuted={handleSpreadExecuted}
      />

      <RebalanceModal
        isOpen={isRebalanceOpen}
        onClose={() => setIsRebalanceOpen(false)}
        onRebalanceSuccess={handleRebalanceSuccess}
      />

      <PositionSizerModal
        isOpen={isPositionSizerOpen}
        onClose={() => setIsPositionSizerOpen(false)}
      />

      <AuditReportModal
        isOpen={isAuditReportOpen}
        onClose={() => setIsAuditReportOpen(false)}
      />

      <DeskSettingsModal
        isOpen={isDeskSettingsOpen}
        onClose={() => setIsDeskSettingsOpen(false)}
        isMockTickActive={isMockTickActive}
        onToggleMockTick={() => setIsMockTickActive(!isMockTickActive)}
      />

      <ProjectReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
