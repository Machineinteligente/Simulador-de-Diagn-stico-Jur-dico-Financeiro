export enum CreditorType {
  BANKS = 'Bancos (Empréstimos/Capital de Giro)',
  SUPPLIERS = 'Fornecedores',
  TAX = 'Tributário (Fisco)',
  LABOR = 'Trabalhista'
}

export enum CrisisLevel {
  EARLY = 'Inicial (Atrasos pontuais)',
  MODERATE = 'Moderada (Capital de giro comprometido)',
  CRITICAL = 'Crítica (Execuções judiciais/Bloqueios)',
  SEVERE = 'Severa (Risco iminente de falência)'
}

export interface BusinessData {
  companyName: string;
  monthlyRevenue: number;
  totalDebt: number;
  monthlyFixedCosts: number;
  debtServiceCost: number; // Monthly payment for debts
  mainCreditor: CreditorType;
  crisisLevel: CrisisLevel;
}

export interface AnalysisResult {
  viabilityScore: number; // 0 to 100
  estimatedTimeline: string; // e.g., "12-18 meses"
  cashFlowImpact: string; // e.g., "R$ 45.000,00"
  mainBottleneck: string;
  strategicRoadmap: string[];
  executiveSummary: string;
  riskAssessment: string;
  projectedSavingsPercentage: number;
}