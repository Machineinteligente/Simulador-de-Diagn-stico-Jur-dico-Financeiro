import React, { useState } from 'react';
import { BusinessData, CreditorType, CrisisLevel } from '../types';
import { ArrowRight, DollarSign, Building, AlertTriangle, AlertCircle, Lock } from 'lucide-react';

interface InputStepProps {
  onAnalyze: (data: BusinessData) => void;
  isLoading: boolean;
}

const InputStep: React.FC<InputStepProps> = ({ onAnalyze, isLoading }) => {
  const [formData, setFormData] = useState<BusinessData>({
    companyName: '',
    monthlyRevenue: 0,
    totalDebt: 0,
    monthlyFixedCosts: 0,
    debtServiceCost: 0,
    mainCreditor: CreditorType.BANKS,
    crisisLevel: CrisisLevel.MODERATE,
  });

  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessData, string>> = {};

    if (formData.monthlyRevenue <= 0) {
      newErrors.monthlyRevenue = "O faturamento deve ser maior que zero.";
    }
    if (formData.totalDebt <= 0) {
      newErrors.totalDebt = "Informe o valor total da dívida.";
    }
    if (formData.monthlyFixedCosts < 0) {
      newErrors.monthlyFixedCosts = "O valor não pode ser negativo.";
    }
    if (formData.debtServiceCost < 0) {
      newErrors.debtServiceCost = "O valor não pode ser negativo.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCurrencyChange = (field: keyof BusinessData, value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const floatValue = Number(numericValue) / 100;
    
    setFormData((prev) => ({ ...prev, [field]: floatValue }));
    
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChange = (field: keyof BusinessData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && consentGiven) {
      onAnalyze(formData);
    }
  };

  const formatInputValue = (val: number) => {
    if (val === 0) return '';
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-premium overflow-hidden border border-gray-100">
      <div className="bg-[#2d5a1f] p-6 md:p-10 text-white relative overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white opacity-5 rounded-full -mr-10 -mt-10 md:-mr-20 md:-mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[#d4af37] opacity-10 rounded-full -ml-10 -mb-10 md:-ml-20 md:-mb-20"></div>
        
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 relative z-10 font-serif">
          <Building className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
          Diagnóstico Inteligente
        </h2>
        <p className="text-green-50 mt-4 relative z-10 max-w-xl text-base md:text-lg font-light leading-relaxed">
          Preencha os dados abaixo para que nossa I.A. calcule a viabilidade da sua recuperação judicial ou extrajudicial. 
          <span className="font-semibold block mt-3 text-[#d4af37] flex items-center gap-2 text-xs uppercase tracking-wide">
            <Lock className="w-3 h-3" /> Seus dados são confidenciais
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 md:p-8 lg:p-12 space-y-8 md:space-y-10">
        
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-[#1a1a18] font-bold mb-3 block uppercase text-xs tracking-widest">Nome da Empresa (Opcional)</span>
            <input
              type="text"
              className="w-full p-3 md:p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5a1f] focus:border-transparent outline-none transition text-[#1a1a18] bg-[#fafaf8] focus:bg-white placeholder-gray-400 text-base"
              placeholder="Ex: Indústria XYZ Ltda"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </label>
        </div>

        {/* Section 2: Financials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg font-bold text-[#1a1a18] flex items-center gap-2 border-b border-gray-100 pb-3 font-serif">
              <DollarSign className="w-5 h-5 text-[#2d5a1f]" /> Faturamento e Custos
            </h3>
            
            <label className="block">
              <span className="text-sm text-gray-600 font-semibold mb-2 block">Faturamento Mensal Médio <span className="text-[#b91c1c]">*</span></span>
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-3 md:top-4 text-gray-400 font-medium font-mono">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`w-full pl-10 md:pl-12 p-3 md:p-4 border rounded-lg focus:ring-2 outline-none transition text-[#1a1a18] font-mono font-medium text-lg bg-white shadow-sm text-base
                    ${errors.monthlyRevenue ? 'border-[#b91c1c] focus:ring-red-200' : 'border-gray-200 focus:ring-[#2d5a1f] focus:border-[#2d5a1f]'}`}
                  placeholder="0,00"
                  value={formatInputValue(formData.monthlyRevenue)}
                  onChange={(e) => handleCurrencyChange('monthlyRevenue', e.target.value)}
                />
              </div>
              {errors.monthlyRevenue && (
                <p className="text-[#b91c1c] text-xs mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.monthlyRevenue}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-600 font-semibold mb-2 block">Custos Fixos (Sem Dívidas) <span className="text-[#b91c1c]">*</span></span>
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-3 md:top-4 text-gray-400 font-medium font-mono">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`w-full pl-10 md:pl-12 p-3 md:p-4 border rounded-lg focus:ring-2 outline-none transition text-[#1a1a18] font-mono font-medium text-lg bg-white shadow-sm text-base
                    ${errors.monthlyFixedCosts ? 'border-[#b91c1c] focus:ring-red-200' : 'border-gray-200 focus:ring-[#2d5a1f] focus:border-[#2d5a1f]'}`}
                  placeholder="0,00"
                  value={formatInputValue(formData.monthlyFixedCosts)}
                  onChange={(e) => handleCurrencyChange('monthlyFixedCosts', e.target.value)}
                />
              </div>
              {errors.monthlyFixedCosts ? (
                 <p className="text-[#b91c1c] text-xs mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.monthlyFixedCosts}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-2 italic">Folha, aluguel, luz, etc.</p>
              )}
            </label>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg font-bold text-[#1a1a18] flex items-center gap-2 border-b border-gray-100 pb-3 font-serif">
              <AlertTriangle className="w-5 h-5 text-[#b91c1c]" /> Passivo e Dívidas
            </h3>
            
            <label className="block">
              <span className="text-sm text-gray-600 font-semibold mb-2 block">Valor Total da Dívida <span className="text-[#b91c1c]">*</span></span>
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-3 md:top-4 text-gray-400 font-medium font-mono">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`w-full pl-10 md:pl-12 p-3 md:p-4 border rounded-lg focus:ring-2 outline-none transition text-[#1a1a18] font-mono font-medium text-lg bg-white shadow-sm text-base
                    ${errors.totalDebt ? 'border-[#b91c1c] focus:ring-red-200' : 'border-gray-200 focus:ring-[#2d5a1f] focus:border-[#2d5a1f]'}`}
                  placeholder="0,00"
                  value={formatInputValue(formData.totalDebt)}
                  onChange={(e) => handleCurrencyChange('totalDebt', e.target.value)}
                />
              </div>
              {errors.totalDebt && (
                <p className="text-[#b91c1c] text-xs mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.totalDebt}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm text-gray-600 font-semibold mb-2 block">Pagamento Mensal de Dívida <span className="text-[#b91c1c]">*</span></span>
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-3 md:top-4 text-gray-400 font-medium font-mono">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`w-full pl-10 md:pl-12 p-3 md:p-4 border rounded-lg focus:ring-2 outline-none transition text-[#1a1a18] font-mono font-medium text-lg bg-white shadow-sm text-base
                    ${errors.debtServiceCost ? 'border-[#b91c1c] focus:ring-red-200' : 'border-gray-200 focus:ring-[#2d5a1f] focus:border-[#2d5a1f]'}`}
                  placeholder="0,00"
                  value={formatInputValue(formData.debtServiceCost)}
                  onChange={(e) => handleCurrencyChange('debtServiceCost', e.target.value)}
                />
              </div>
              {errors.debtServiceCost ? (
                <p className="text-[#b91c1c] text-xs mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.debtServiceCost}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-2 italic">Soma das parcelas de empréstimos.</p>
              )}
            </label>
          </div>
        </div>

        {/* Section 3: Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
          <label className="block">
            <span className="text-[#1a1a18] font-bold mb-3 block uppercase text-xs tracking-widest">Principal Credor</span>
            <div className="relative">
              <select
                className="w-full p-3 md:p-4 border border-gray-200 rounded-lg bg-white text-[#1a1a18] focus:ring-2 focus:ring-[#2d5a1f] outline-none appearance-none font-medium text-base"
                value={formData.mainCreditor}
                onChange={(e) => handleChange('mainCreditor', e.target.value as CreditorType)}
              >
                {Object.values(CreditorType).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </label>

          <label className="block">
            <span className="text-[#1a1a18] font-bold mb-3 block uppercase text-xs tracking-widest">Nível de Pressão</span>
            <div className="relative">
              <select
                className="w-full p-3 md:p-4 border border-gray-200 rounded-lg bg-white text-[#1a1a18] focus:ring-2 focus:ring-[#2d5a1f] outline-none appearance-none font-medium text-base"
                value={formData.crisisLevel}
                onChange={(e) => handleChange('crisisLevel', e.target.value as CrisisLevel)}
              >
                {Object.values(CrisisLevel).map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </label>
        </div>

        {/* Section 4: Consent Checkbox (Risk Shield) */}
        <div className="pt-2 md:pt-4 border-t border-gray-100">
          <label className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-[#fafaf8] rounded-lg border border-gray-200 cursor-pointer hover:bg-white hover:shadow-md transition-all">
            <input 
              type="checkbox" 
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#2d5a1f] rounded border-gray-300 focus:ring-[#2d5a1f] shrink-0"
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              Concordo que os dados fornecidos são confidenciais e serão utilizados <strong>estritamente para fins de triagem e análise preliminar</strong> pelo escritório, em conformidade com a LGPD.
            </span>
          </label>
        </div>

        <div className="pt-4 md:pt-6">
          <button
            type="submit"
            disabled={isLoading || !consentGiven}
            className={`w-full py-4 md:py-5 px-6 rounded-lg text-white font-bold text-base md:text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform shadow-xl
              ${(isLoading || !consentGiven)
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#2d5a1f] hover:bg-[#1e3d15] hover:scale-[1.01] shadow-[0_10px_20px_rgba(45,90,31,0.2)] animate-hover-glow'}`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="text-sm md:text-base">Processando...</span>
              </>
            ) : (
              <>
                Gerar Diagnóstico <span className="hidden sm:inline">Gratuito</span> <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {!consentGiven && (
            <p className="text-center text-xs text-[#b91c1c] mt-3 font-medium animate-pulse">
              * Necessário aceitar os termos para prosseguir.
            </p>
          )}
          <p className="text-center text-xs text-gray-400 mt-5">
            Este simulador não constitui aconselhamento jurídico formal.
          </p>
        </div>
      </form>
    </div>
  );
};

export default InputStep;