import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LabelList
} from 'recharts';
import { AnalysisResult, BusinessData } from '../types';
import { CheckCircle2, AlertOctagon, TrendingUp, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface ResultsDashboardProps {
  data: BusinessData;
  analysis: AnalysisResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, analysis, onReset }) => {
  
  const currentCashFlow = data.monthlyRevenue - data.monthlyFixedCosts - data.debtServiceCost;
  const estimatedReduction = analysis.projectedSavingsPercentage / 100;
  const newDebtService = data.debtServiceCost * (1 - estimatedReduction);
  const projectedCashFlow = data.monthlyRevenue - data.monthlyFixedCosts - newDebtService;

  const cashFlowData = [
    { name: 'Atual', value: currentCashFlow },
    { name: 'Pós-Reestruturação', value: projectedCashFlow },
  ];

  // Colors: Hunter Green for good, Slate/Gold for other
  const debtCompositionData = [
    { name: 'Dívida Projetada', value: data.totalDebt * (1 - estimatedReduction), color: '#2d5a1f' }, 
    { name: 'Economia', value: data.totalDebt * estimatedReduction, color: '#d4af37' }, 
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const formatCurrencyLabel = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(val);

  return (
    <div className="space-y-6 md:space-y-10 animate-fade-in text-left">
      
      {/* Header Summary */}
      <div className="bg-white rounded-xl p-6 md:p-10 shadow-premium border-l-8 border-[#2d5a1f]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a18] mb-4 font-serif">Parecer Preliminar</h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
          {analysis.executiveSummary}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-[#2d5a1f]/10 rounded-full flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-[#2d5a1f]" />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Viabilidade</span>
          <span className={`text-3xl font-bold mt-1 financial-number ${analysis.viabilityScore > 70 ? 'text-[#2d5a1f]' : analysis.viabilityScore > 40 ? 'text-yellow-600' : 'text-[#b91c1c]'}`}>
            {analysis.viabilityScore}%
          </span>
          <span className="text-xs text-gray-400 mt-2">Chance de Êxito</span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Prazo</span>
          <span className="text-2xl font-bold text-[#1a1a18] mt-1 font-mono">{analysis.estimatedTimeline}</span>
          <span className="text-xs text-gray-400 mt-2">Para estabilização</span>
        </div>

         <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Deságio Est.</span>
          <span className="text-3xl font-bold text-[#1a1a18] mt-1 financial-number">{analysis.projectedSavingsPercentage}%</span>
          <span className="text-xs text-gray-400 mt-2">Redução do Passivo</span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
            <AlertOctagon className="w-6 h-6 text-[#b91c1c]" />
          </div>
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Gargalo</span>
          <span className="text-sm font-bold text-[#1a1a18] mt-2 line-clamp-2">{analysis.mainBottleneck}</span>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        
        {/* Charts Column */}
        <div className="space-y-6 md:space-y-8">
          
          {/* Cash Flow Chart */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-premium border border-gray-100">
            <h3 className="text-xl font-bold text-[#1a1a18] mb-6 flex items-center gap-2 font-serif">
              Impacto no Fluxo de Caixa
            </h3>
            <div className="h-60 md:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Inter' }} dy={10} interval={0} />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontFamily: 'IBM Plex Mono' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {cashFlowData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value < 0 ? '#ef4444' : '#2d5a1f'} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(val: number) => formatCurrencyLabel(val)} 
                      style={{ fill: '#475569', fontSize: '11px', fontWeight: 'bold', fontFamily: 'IBM Plex Mono' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center italic">
              A reestruturação visa reverter o fluxo de caixa negativo para positivo.
            </p>
          </div>

          {/* Debt Potencial Chart */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-premium border border-gray-100">
            <h3 className="text-xl font-bold text-[#1a1a18] mb-6 font-serif">Potencial de Redução da Dívida</h3>
            <div className="h-60 md:h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={debtCompositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
                       const RADIAN = Math.PI / 180;
                       const radius = outerRadius + 20;
                       const x = cx + radius * Math.cos(-midAngle * RADIAN);
                       const y = cy + radius * Math.sin(-midAngle * RADIAN);
                       return (
                         <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="10" fontWeight="bold" fontFamily="IBM Plex Mono">
                           {formatCurrencyLabel(value)}
                         </text>
                       );
                    }}
                  >
                    {debtCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ fontFamily: 'IBM Plex Mono' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-sm mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2d5a1f]"></div>
                <span className="font-medium">Dívida Restante</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d4af37]"></div>
                <span className="font-medium">Economia Potencial</span>
              </div>
            </div>
          </div>

        </div>

        {/* Text/Strategy Column */}
        <div className="space-y-6">
          <div className="bg-[#fafaf8] p-6 md:p-8 rounded-xl border border-gray-200">
             <h3 className="text-xl font-bold text-[#1a1a18] mb-6 font-serif">Roadmap Estratégico</h3>
             <ul className="space-y-4">
               {analysis.strategicRoadmap.map((step, idx) => (
                 <li key={idx} className="flex items-start gap-4 bg-white p-5 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
                   <div className="flex-shrink-0 w-8 h-8 bg-[#2d5a1f] text-white rounded-full flex items-center justify-center font-bold text-sm font-serif shadow-sm">
                     {idx + 1}
                   </div>
                   <p className="text-gray-700 text-sm font-medium leading-relaxed pt-1">{step}</p>
                 </li>
               ))}
             </ul>
          </div>

          <div className="bg-red-50 p-6 md:p-8 rounded-xl border border-red-100">
            <h3 className="text-xl font-bold text-[#b91c1c] mb-3 flex items-center gap-2 font-serif">
              <AlertOctagon className="w-6 h-6" /> Risco Iminente
            </h3>
            <p className="text-[#991b1b] text-sm leading-relaxed">
              {analysis.riskAssessment}
            </p>
          </div>

          <div className="bg-green-50 p-6 md:p-8 rounded-xl border border-green-100">
             <h3 className="text-xl font-bold text-[#2d5a1f] mb-3 font-serif">Impacto Imediato</h3>
             <p className="text-[#1e3d15] text-sm leading-relaxed">
               {analysis.cashFlowImpact}
             </p>
          </div>
        </div>

      </div>

      <div className="flex justify-center pt-10 pb-4">
        <button 
          onClick={onReset}
          className="text-gray-500 hover:text-[#2d5a1f] font-medium underline transition-colors flex items-center gap-2 tracking-wide"
        >
          Realizar nova simulação
        </button>
      </div>

    </div>
  );
};

export default ResultsDashboard;