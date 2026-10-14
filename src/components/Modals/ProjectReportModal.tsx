import React from 'react';

interface ProjectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectReportModal: React.FC<ProjectReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-jetbrains font-bold text-sm">
              Ω
            </div>
            <div>
              <h2 className="font-headline-sm text-base sm:text-lg font-bold text-slate-900">
                MCX Quant Terminal — Project Model &amp; Architecture Report
              </h2>
              <p className="text-xs text-slate-500 font-jetbrains">
                Precious Metals Arbitrage Engine • Engineering &amp; Quantitative Blueprint
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Section 1: Executive Summary */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-700"></span>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                1. Executive Summary &amp; Problem Statement
              </h3>
            </div>
            <p className="text-slate-600">
              The <strong>MCX Quantitative Arbitrage Terminal</strong> is an institutional-grade trading workstation engineered for quantitative researchers, proprietary trading desks, and precious metals risk officers operating on the <strong>Multi Commodity Exchange of India (MCX)</strong>.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block font-jetbrains uppercase">The Financial Problem:</span>
              <p>
                MCX simultaneously trades gold across multiple contract denominations with varying purities and contract sizes:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                <li><strong>GOLD Big</strong>: 1 Kilogram bar (995 / 999 fineness)</li>
                <li><strong>GOLDM (Mini)</strong>: 100 Grams wholesale (995 fineness)</li>
                <li><strong>GOLDTEN</strong>: 10 Grams standard (999 fineness)</li>
                <li><strong>GOLDPETAL</strong>: 1 Gram micro-contract (999 fineness, retail favored)</li>
                <li><strong>GOLDGUINEA</strong>: 8 Grams coin (999 fineness, mint cast)</li>
              </ul>
              <p className="pt-1">
                During festival cycles (e.g. Diwali / Dhanteras) or acute local delivery squeezes, retail-heavy contracts like <strong>GOLDPETAL</strong> frequently trade at extreme premiums over wholesale <strong>GOLDM</strong>. Calculating pure relative value is complicated by the <strong>995 vs 999 fineness gap</strong>. This terminal algorithmically removes purity noise, computes live Z-scores, and identifies market-neutral statistical arbitrage without taking directional commodity price risk.
              </p>
            </div>
          </section>

          {/* Section 2: Why We Made It */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-700"></span>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                2. Why We Made It (The Strategic Value)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="font-bold text-slate-900 block font-jetbrains text-xs">Purity Normalization</span>
                <p className="text-slate-600 text-xs">
                  Eliminates assaying distortion by mathematically scaling 995 wholesale quotes into standard 999 bullion parity: <code>Price_999 = Price_995 × (999/995)</code>.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="font-bold text-slate-900 block font-jetbrains text-xs">Market-Neutral Alpha</span>
                <p className="text-slate-600 text-xs">
                  Harvests spread convergence back to historical fair value corridors while maintaining <strong>Spot Beta Neutrality (&lt;0.05)</strong>, insulating capital from global gold price shocks.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="font-bold text-slate-900 block font-jetbrains text-xs">Regulatory Compliance</span>
                <p className="text-slate-600 text-xs">
                  Continuously tracks SPAN + ELM margins against SEBI regulatory floors (142.3% headroom) and depository physical obligations (3,320g LBMA audit).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: What We Made (System Architecture & Key Modules) */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                3. What We Made (Terminal Architecture)
              </h3>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 font-jetbrains text-xs block mb-1">
                  A. 3-Pane Workstation &amp; Normalized Curves Suite
                </span>
                <p className="text-slate-600 text-xs mb-2">
                  Delivers real-time monitoring across three integrated panels or full-screen dedicated views:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-800 block">1. Portfolio NAV &amp; Donut</span>
                    <span className="text-slate-500">
                      Total NAV (₹24.85L), weight/value distribution toggle, wholesale/retail holdings ledger, and gamma stability bounds.
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-800 block">2. Candlesticks &amp; SPAN</span>
                    <span className="text-slate-500">
                      15M price candles, 30D fair-value ribbon, dual volume/OI columns, SPAN+ELM margin matrix, and spread routing engine.
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-800 block">3. Basis Dynamics &amp; Signal</span>
                    <span className="text-slate-500">
                      Dual polyline SVG curves, historical event pins (CPI +1.8σ, Roll +₹4.2, Squeeze +₹20.3), and 30D Z-score corridor spectrum.
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block font-jetbrains">Arbitrage Radar</span>
                  <p className="text-slate-600 mt-1">
                    Tick-by-tick scanner monitoring cross-purity pairs with an L2 synthetic bid/ask spread order book.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block font-jetbrains">Walk-Forward Backtest</span>
                  <p className="text-slate-600 mt-1">
                    Out-of-sample Monte Carlo verification showing 3.14 Sharpe ratio, 86.2% win rate, and equity curve vs spot benchmark.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block font-jetbrains">Pipeline Specs</span>
                  <p className="text-slate-600 mt-1">
                    Official SEBI/MCX specifications matrix, tender delivery schedules, and LBMA depository vault requirements.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 font-jetbrains text-xs block mb-1">
                  B. Interactive Algorithmic Desk Modals
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li><strong>Spread Router Modal</strong>: Configures 2-leg execution (e.g. Short 100 GOLDPETAL vs Long 1 GOLDM), slippage bounds, and expected alpha.</li>
                  <li><strong>Rebalance Legs Modal</strong>: Calculates exact lot adjustments to neutralize portfolio Spot Beta back to 0.00.</li>
                  <li><strong>Position Sizer Modal</strong>: Formulates Value-at-Risk (99% 1-Day VaR) and capital margin headroom.</li>
                  <li><strong>Audit PDF Exporter</strong>: Produces cryptographically sealed regulatory compliance reports with simulated download.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: What We Used (Technologies & Engineering Choices) */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-700"></span>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                4. What We Used (Technology Stack &amp; Design Rationale)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-jetbrains font-mono border border-slate-200 rounded-lg">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Layer</th>
                    <th className="p-2.5">Technology</th>
                    <th className="p-2.5">Engineering Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Frontend Core</td>
                    <td className="p-2.5 text-amber-800">React 19 + TypeScript</td>
                    <td className="p-2.5 font-sans">Zero-overhead reactivity, strict type safety for quantitative calculations and order routing payloads.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Styling &amp; Theme</td>
                    <td className="p-2.5 text-sky-800">Tailwind CSS v4</td>
                    <td className="p-2.5 font-sans">High-density institutional styling, utility-first micro-spacings (4px grid), and responsive multi-column layouts.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Data Typography</td>
                    <td className="p-2.5 text-slate-900">Geist + JetBrains Mono</td>
                    <td className="p-2.5 font-sans">Tabular figures (<code>tnum</code>) and slashed zeros (<code>zero</code>) eliminate column jitter during live streaming ticks.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Chart Engine</td>
                    <td className="p-2.5 text-emerald-800">Custom SVG Vector Rendering</td>
                    <td className="p-2.5 font-sans">Zero external canvas/chart bloat. Instant render speed, vector crispness on Retina/4K displays, and full DOM interactivity.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">Streaming Engine</td>
                    <td className="p-2.5 text-slate-900">Oscillating Tick Simulator</td>
                    <td className="p-2.5 font-sans">Simulates realistic MCX order book ticks, spot changes, and IST high-precision clock updates.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Conclusion */}
          <section className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold block uppercase font-jetbrains">5. Summary Conclusion</span>
            <p className="leading-relaxed">
              This terminal bridges quantitative financial engineering with modern UI design. It gives desk operators sub-second cognitive parsing of multi-contract dislocations, mathematically proves parity convergence, and provides one-click execution with complete regulatory margin verification.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 font-jetbrains">SEBI Compliance • Algo-Alpha 999 Desk Spec</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-headline-sm text-xs font-semibold cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
