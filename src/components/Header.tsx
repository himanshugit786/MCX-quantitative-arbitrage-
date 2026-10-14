import React, { useState, useEffect } from 'react';
import { CurveSubScreen, NavigationTab } from '../types/terminal';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentCurveSubScreen: CurveSubScreen;
  onSelectCurveSubScreen: (sub: CurveSubScreen) => void;
  spotPrice: number;
  onOpenSettings: () => void;
  onOpenRebalance: () => void;
  onOpenSizer: () => void;
  onOpenAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentCurveSubScreen,
  onSelectCurveSubScreen,
  spotPrice,
  onOpenSettings,
  onOpenRebalance,
  onOpenSizer,
  onOpenAudit,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('IST 14:32:08');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeStr = now.toLocaleTimeString('en-GB', options);
      setCurrentTime(`IST ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const navItems = [
    { id: 'radar' as NavigationTab, label: 'Radar', icon: 'radar', tag: 'SCANNER' },
    { id: 'curves' as NavigationTab, label: 'Normalized Curves', icon: 'show_chart', tag: 'ARB-DESK' },
    { id: 'backtest' as NavigationTab, label: 'Backtest', icon: 'query_stats', tag: 'ALGO-999' },
    { id: 'specs' as NavigationTab, label: 'Specs', icon: 'dataset', tag: 'MATRIX' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      {/* Top Telemetry & Status Bar */}
      <div className="w-full px-3 lg:px-6 py-1.5 border-b border-slate-100 flex items-center justify-between gap-3 text-xs">
        {/* Left Status & Live Ticker */}
        <div className="flex items-center gap-3">
          {/* Live indicators */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-jetbrains font-mono text-[10px] text-emerald-700 tracking-wider font-bold">
                MCX LIVE
              </span>
            </div>

            <div className="flex items-center gap-1 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-sky-600 text-[12px]">sync_saved_locally</span>
              <span className="font-jetbrains font-mono text-[10px] text-sky-700 tracking-wider font-bold">
                BHAVCOPY OK
              </span>
            </div>
          </div>

          {/* Desktop Ticker Tape */}
          <div className="hidden xl:flex items-center gap-3 pl-3 border-l border-slate-200 text-[11px] font-jetbrains font-mono text-slate-600">
            <span className="text-slate-400 font-sans uppercase text-[10px]">MCX Bullion Feed:</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-900 font-bold">GOLDM:</span>
              <span>₹7,142.50</span>
              <span className="text-emerald-700 font-semibold">(+0.54%)</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-900 font-bold">GOLDPETAL:</span>
              <span>₹7,162.80</span>
              <span className="text-emerald-700 font-semibold">(+1.28%)</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-900 font-bold">GOLDTEN:</span>
              <span>₹71,825.00</span>
              <span className="text-emerald-700 font-semibold">(+0.42%)</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-900 font-bold">USD/INR:</span>
              <span>83.94</span>
              <span className="text-slate-500">(+0.02)</span>
            </div>
          </div>
        </div>

        {/* Right Telemetry, Spot & Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Desk Action shortcuts on desktop */}
          <div className="hidden md:flex items-center gap-1.5 pr-2 border-r border-slate-200">
            <button
              onClick={onOpenRebalance}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
              title="Rebalance Legs"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-700">balance</span>
              <span>Rebalance</span>
            </button>
            <button
              onClick={onOpenSizer}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
              title="Position Sizer"
            >
              <span className="material-symbols-outlined text-[14px]">calculate</span>
              <span>Sizer</span>
            </button>
            <button
              onClick={onOpenAudit}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
              title="Export Audit PDF"
            >
              <span className="material-symbols-outlined text-[14px]">sim_card_download</span>
              <span>Audit PDF</span>
            </button>
          </div>

          {/* Spot price indicator */}
          <div className="flex flex-col items-end">
            <span className="font-jetbrains font-mono text-[9px] text-slate-400 uppercase font-semibold">
              Spot ₹/g 999
            </span>
            <span className="font-jetbrains font-mono text-[12px] sm:text-[13px] text-amber-800 font-bold tracking-tight">
              ₹{spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-7 h-7 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>

          {/* Settings / Profile Avatar */}
          <button
            onClick={onOpenSettings}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center justify-center transition-transform active:scale-95 shrink-0"
            title="Desk Engine Configuration"
            aria-label="Desk Settings"
          >
            <span className="material-symbols-outlined text-amber-800 text-[18px]">person</span>
          </button>
        </div>
      </div>

      {/* Main Navigation & View Selector Bar */}
      <div className="w-full px-3 lg:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left: Terminal Title & Desktop Tab Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded bg-amber-700 text-white flex items-center justify-center font-jetbrains font-bold text-xs">
              Ω
            </div>
            <span className="font-headline-sm text-sm font-bold text-slate-900 tracking-tight">
              MCX Quant Terminal
            </span>
            <span className="hidden sm:inline font-jetbrains font-mono text-[9px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold uppercase">
              ARB-DESK
            </span>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 pl-3 border-l border-slate-200">
            {navItems.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Curves View Controls & Clock */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Sub-view Switcher when on Normalized Curves */}
          {currentTab === 'curves' && (
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 overflow-x-auto no-scrollbar">
              <span className="hidden xl:inline text-[10px] text-slate-500 font-jetbrains px-1 font-semibold">
                VIEW:
              </span>
              <button
                onClick={() => onSelectCurveSubScreen('workstation')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  currentCurveSubScreen === 'workstation'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View all 3 terminal panels side-by-side"
              >
                <span className="material-symbols-outlined text-[14px] text-amber-700">dashboard</span>
                <span>Workstation (3-Pane)</span>
              </button>

              <button
                onClick={() => onSelectCurveSubScreen('portfolio')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  currentCurveSubScreen === 'portfolio'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Portfolio &amp; Ledger
              </button>

              <button
                onClick={() => onSelectCurveSubScreen('contract')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  currentCurveSubScreen === 'contract'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Candles &amp; Specs
              </button>

              <button
                onClick={() => onSelectCurveSubScreen('dynamics')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                  currentCurveSubScreen === 'dynamics'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Basis Dynamics
              </button>
            </div>
          )}

          {/* Clock */}
          <div className="flex items-center gap-1 text-slate-500 font-jetbrains font-mono text-[11px] shrink-0">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
