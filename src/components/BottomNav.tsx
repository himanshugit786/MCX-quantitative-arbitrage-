import React from 'react';
import { NavigationTab } from '../types/terminal';

interface BottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'radar' as NavigationTab,
      label: 'Radar',
      icon: 'radar',
    },
    {
      id: 'curves' as NavigationTab,
      label: 'Curves',
      icon: 'show_chart',
    },
    {
      id: 'backtest' as NavigationTab,
      label: 'Backtest',
      icon: 'query_stats',
    },
    {
      id: 'specs' as NavigationTab,
      label: 'Specs',
      icon: 'dataset',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-1px_6px_rgba(0,0,0,0.04)] lg:hidden">
      <div className="max-w-xl mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-12 transition-all active:scale-95 ${
                isActive
                  ? 'text-amber-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-jetbrains font-mono text-[10px] tracking-wider uppercase font-semibold">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-[-2px]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
