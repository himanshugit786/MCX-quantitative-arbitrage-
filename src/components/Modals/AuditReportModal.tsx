import React, { useState } from 'react';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[20px]">sim_card_download</span>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-slate-900">Export Desk Audit PDF</h3>
              <p className="text-[11px] text-slate-500 font-jetbrains">MCX Compliance & Regulatory Vault Proof</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Audit Document Preview */}
        <div className="p-4 space-y-3">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/70 space-y-2.5 font-jetbrains text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900">MCX-ALGO-AUDIT-2024-T0</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                COMPLIANCE VALID
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>
                <span className="block text-slate-400 text-[9px]">ENGINE / STRATEGY</span>
                <span className="font-semibold text-slate-800">Algo-Alpha 999 (Arb-Desk)</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[9px]">PORTFOLIO NAV</span>
                <span className="font-semibold text-slate-800">₹24,85,420.00 (MTD +6.12%)</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[9px]">PHYSICAL OBLIGATION</span>
                <span className="font-semibold text-slate-800">3,320g Assayed Bar & Coin</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[9px]">DEPOSITORY AUDITOR</span>
                <span className="font-semibold text-slate-800">MCX Approved C保管</span>
              </div>
            </div>

            <div className="bg-white p-2 rounded border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
              Certified that all open relative-value contracts comply with Section 17 of SEBI Commodity Derivatives Regulations. Initial margin buffer maintained at 142.3% of the SPAN regulatory floor.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="material-symbols-outlined text-slate-400 text-[16px]">lock</span>
            <span>Cryptographically sealed with SHA-256 desk ledger timestamp.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="py-2 px-3 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading || downloadSuccess}
            className="py-2 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-headline-sm text-xs font-bold transition-all flex items-center gap-1.5"
          >
            {downloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>Generating PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Audit PDF Downloaded!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Download Signed PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
