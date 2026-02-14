
export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  VERY_HIGH = 'Very High'
}

export enum FundCategory {
  EQUITY = 'Equity',
  DEBT = 'Debt',
  HYBRID = 'Hybrid',
  INDEX = 'Index',
  TAX_SAVER = 'Tax Saver'
}

export interface InvestmentProfile {
  amount: number;
  period: number; // in years
  risk: RiskLevel;
  category: FundCategory;
}

export interface MutualFund {
  name: string;
  category: string;
  riskRating: RiskLevel;
  expenseRatio: number;
  historicalReturns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  description: string;
  whyThisFund: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  subscriptionTier: 'Free' | 'Pro' | 'Elite';
}

export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  FINDER = 'FINDER',
  RESULTS = 'RESULTS',
  SUBSCRIPTION = 'SUBSCRIPTION'
}
