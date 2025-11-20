export enum SentimentLabel {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral',
  CAUTIOUS = 'Cautious',
  OPTIMISTIC = 'Optimistic'
}

export interface Entity {
  name: string;
  ticker?: string;
  type: 'Company' | 'Person' | 'Sector' | 'Crypto' | 'Commodity';
  sentiment: SentimentLabel;
  relevanceScore: number; // 0-100
}

export interface FinancialAnalysis {
  headline: string;
  executiveSummary: string;
  sentimentScore: number; // -100 to 100
  sentimentLabel: SentimentLabel;
  keyDrivers: string[];
  investmentImplications: string;
  riskFactors: string[];
  entities: Entity[];
}
