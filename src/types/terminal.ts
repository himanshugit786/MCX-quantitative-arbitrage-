export type NavigationTab = 'radar' | 'curves' | 'backtest' | 'specs';

export type CurveSubScreen = 'workstation' | 'portfolio' | 'contract' | 'dynamics';

export interface HoldingItem {
  id: string;
  symbol: string;
  name: string;
  purity: string;
  tag: string;
  tagColor: string;
  lots: number;
  totalMass: string;
  totalValue: number;
  totalValueFormatted: string;
  pnlAmount: number;
  pnlFormatted: string;
  pnlPercent: string;
  avgPurchase: string;
  detailLabel: string;
  detailValue: string;
  detailValueColor?: string;
  weightPct: number;
  barColor: string;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  oi: number;
  isBullish: boolean;
}

export interface BasisPoint {
  date: string;
  label: string;
  goldm: number;
  goldpetal: number;
  spread: number;
  zScore: number;
  marker?: {
    code: string;
    text: string;
    type: 'cpi' | 'roll' | 'squeeze';
  };
}

export interface ArbitrageOpportunity {
  id: string;
  legA: string;
  legB: string;
  spreadType: string;
  currentSpread: number;
  fairSpread: number;
  divergence: number;
  zScore: number;
  action: 'BUY SPREAD' | 'SELL SPREAD' | 'NEUTRAL';
  expectedAlpha: string;
  volume24h: string;
  status: 'ACTIVE' | 'WARMING' | 'SETTLING';
}
