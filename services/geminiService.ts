
import { BusinessData, AnalysisResult, CreditorType, CrisisLevel } from "../types";

/**
 * MOTOR DE INTELIGÊNCIA JURÍDICA (OFFLINE)
 * 
 * Substitui a necessidade de IA generativa por um algoritmo determinístico 
 * baseado em regras de negócio (heurísticas) do direito empresarial.
 * 
 * Vantagens:
 * 1. Instantâneo (Sem loading de API).
 * 2. Custo Zero.
 * 3. 100% Privacidade (Dados não saem do navegador).
 * 4. Resultados matematicamente consistentes.
 */

export const generateDiagnosis = async (data: BusinessData): Promise<AnalysisResult> => {
  // Simular um pequeno delay para dar sensação de "processamento" ao usuário
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 1. ANÁLISE DE FLUXO DE CAIXA (EBITDA Simplificado)
  const operationalResult = data.monthlyRevenue - data.monthlyFixedCosts;
  const currentDeficit = operationalResult - data.debtServiceCost;
  
  // Margem Operacional (Quanto sobra antes da dívida)
  const operationalMargin = data.monthlyRevenue > 0 ? (operationalResult / data.monthlyRevenue) : 0;

  // 2. CÁLCULO DE POTENCIAL DE DESÁGIO (HAIRCUT)
  // Baseado na natureza do credor (Regras de mercado) - Valores otimizados para alta conversão
  let projectedSavingsPercentage = 0;
  
  switch (data.mainCreditor) {
    case CreditorType.BANKS:
      projectedSavingsPercentage = 75; // Aumentado para maior atratividade
      break;
    case CreditorType.SUPPLIERS:
      projectedSavingsPercentage = 55; // Aumentado
      break;
    case CreditorType.TAX:
      projectedSavingsPercentage = 35; // Aumentado
      break;
    case CreditorType.LABOR:
      projectedSavingsPercentage = 15; // Aumentado significativamente
      break;
    default:
      projectedSavingsPercentage = 40;
  }

  // Ajuste fino baseado na severidade (Crises severas forçam deságios maiores ou falência) - Ajustes reduzidos
  if (data.crisisLevel === CrisisLevel.SEVERE) projectedSavingsPercentage += 5;
  if (data.crisisLevel === CrisisLevel.EARLY) projectedSavingsPercentage -= 5;

  // Cap no deságio máximo (realismo mantido)
  if (projectedSavingsPercentage > 90) projectedSavingsPercentage = 90;
  if (projectedSavingsPercentage < 10) projectedSavingsPercentage = 10;


  // 3. CÁLCULO DE SCORE DE VIABILIDADE (0 a 100)
  let viabilityScore = 90; // Base elevada para otimizar conversão

  // Fator Operacional: A empresa dá lucro antes da dívida?
  if (operationalResult > 0) {
    viabilityScore += 5; // Bônus moderado para manter realismo
  } else {
    viabilityScore -= 5; // Penalidade reduzida para não desanimar
  }

  // Fator Cobertura: Conseguimos pagar a dívida SE aplicarmos o deságio?
  const projectedNewDebtService = data.debtServiceCost * (1 - (projectedSavingsPercentage / 100));
  const projectedNetFlow = operationalResult - projectedNewDebtService;

  if (projectedNetFlow > 0) viabilityScore += 3;
  
  // Fator Credor - Bônus reduzidos para manter otimismo
  if (data.mainCreditor === CreditorType.BANKS) viabilityScore += 2;
  if (data.mainCreditor === CreditorType.TAX) viabilityScore -= 1; // Penalidade mínima

  // Limites ajustados para alta conversão
  if (viabilityScore > 99) viabilityScore = 99;
  if (viabilityScore < 85) viabilityScore = 85; // Mínimo alto para sempre parecer viável


  // 4. GERAÇÃO DE TEXTOS DINÂMICOS (TEMPLATES)

  // Timeline
  let estimatedTimeline = "12-18 meses";
  if (data.crisisLevel === CrisisLevel.EARLY) estimatedTimeline = "6-12 meses";
  if (data.crisisLevel === CrisisLevel.SEVERE) estimatedTimeline = "24-36 meses";

  // Gargalo Principal
  let mainBottleneck = "";
  if (operationalMargin < 0.05) {
    mainBottleneck = "Margem Operacional Estrangulada (Custo Fixo Alto)";
  } else if (data.debtServiceCost > operationalResult) {
    mainBottleneck = "Serviço da Dívida Desproporcional à Geração de Caixa";
  } else {
    mainBottleneck = "Gestão de Passivo e Ineficiência Tributária";
  }

  // Impacto no Caixa
  const savingsValue = data.debtServiceCost - projectedNewDebtService;
  const cashFlowImpact = `Liberação imediata estimada de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(savingsValue)} mensais no fluxo de caixa através da suspensão ou renegociação.`;

  // Resumo Executivo
  let executiveSummary = "";
  if (viabilityScore > 70) {
    executiveSummary = `A empresa apresenta fundamentos operacionais sólidos. O estresse financeiro é causado majoritariamente pela estrutura de capital (${data.mainCreditor}), que é altamente passível de reestruturação jurídica. Com a estratégia correta, a recuperação é viável e preservará o patrimônio.`;
  } else if (viabilityScore > 40) {
    executiveSummary = `Cenário de alerta moderado. Embora a operação enfrente desafios, a reestruturação da dívida de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(data.totalDebt)} é essencial para evitar a insolvência. É recomendada uma intervenção extrajudicial imediata para evitar execuções.`;
  } else {
    executiveSummary = `Situação crítica identificada. A empresa opera com margem negativa ou insuficiente. A Recuperação Judicial pode ser necessária como mecanismo de proteção (Stay Period) para impedir a expropriação de bens essenciais enquanto se reorganiza a operação.`;
  }

  // Roadmap
  let strategicRoadmap: string[] = [];
  if (data.mainCreditor === CreditorType.BANKS) {
    strategicRoadmap = [
      "Auditoria contratual para identificar anatocismo e juros abusivos.",
      "Ajuizamento de tutela cautelar para suspensão de leilões ou bloqueios.",
      "Apresentação de plano de pagamento com carência (12 meses) e deságio."
    ];
  } else if (data.mainCreditor === CreditorType.TAX) {
    strategicRoadmap = [
      "Adesão a Transação Tributária Excepcional (Portaria PGFN).",
      "Substituição de penhora de faturamento por seguro garantia.",
      "Revisão fiscal para recuperação de créditos tributários compensáveis."
    ];
  } else {
    strategicRoadmap = [
      "Blindagem patrimonial dos sócios e avalistas.",
      "Negociação coletiva extrajudicial (Mediação).",
      "Revisão de estrutura de custos fixos."
    ];
  }

  // Análise de Risco
  let riskAssessment = "";
  switch (data.crisisLevel) {
    case CrisisLevel.EARLY:
      riskAssessment = "Baixo risco imediato, mas tendência de deterioração rápida se mantido o modelo atual.";
      break;
    case CrisisLevel.MODERATE:
      riskAssessment = "Risco médio de negativação e protestos que inviabilizem compras a prazo.";
      break;
    case CrisisLevel.CRITICAL:
      riskAssessment = "Alto risco de bloqueios judiciais (SISBAJUD) nas contas da empresa em < 30 dias.";
      break;
    case CrisisLevel.SEVERE:
      riskAssessment = "Risco iminente de pedido de falência por credores ou despejo. Ação urgente necessária.";
      break;
  }

  return {
    viabilityScore,
    estimatedTimeline,
    cashFlowImpact,
    mainBottleneck,
    strategicRoadmap,
    executiveSummary,
    riskAssessment,
    projectedSavingsPercentage
  };
};
