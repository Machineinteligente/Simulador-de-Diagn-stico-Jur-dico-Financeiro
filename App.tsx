import React, { useState, useRef, useEffect } from 'react';
import { generateDiagnosis } from './services/geminiService';
import { BusinessData, AnalysisResult } from './types';
import InputStep from './components/InputStep';
import ResultsDashboard from './components/ResultsDashboard';
import { 
  Scale, 
  Phone, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingDown, 
  Gavel, 
  ArrowRight,
  Menu,
  X,
  Briefcase,
  Building2,
  Users,
  Award,
  BarChart3,
  FileText,
  Landmark
} from 'lucide-react';

// --- Utility Components for Animation ---

const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, // Trigger as soon as 10% is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const delayClass = delay === 100 ? 'delay-100' : delay === 200 ? 'delay-200' : delay === 300 ? 'delay-300' : '';

  return (
    <div 
      ref={ref} 
      className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

const StaggeredText: React.FC<{ text: string; className?: string; highlightWord?: string; highlightClass?: string }> = ({ 
  text, 
  className = "",
  highlightWord = "",
  highlightClass = ""
}) => {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.includes(highlightWord);
        return (
          <span 
            key={index} 
            className={`word-animation ${isHighlight ? highlightClass : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }} // Faster text stagger
          >
            {word}&nbsp;
          </span>
        );
      })}
    </span>
  );
};

// --- View Components ---

// 1. HOME VIEW
interface HomeViewProps {
  scrollToSimulator: () => void;
  simulatorRef: React.RefObject<HTMLDivElement | null>;
  step: 'input' | 'results';
  isLoading: boolean;
  data: BusinessData | null;
  analysis: AnalysisResult | null;
  handleAnalyze: (data: BusinessData) => void;
  handleReset: () => void;
  navigateTo: (view: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  scrollToSimulator, simulatorRef, step, isLoading, data, analysis, handleAnalyze, handleReset, navigateTo 
}) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0a1128] text-white pt-32 pb-32 md:pt-40 lg:pt-48 md:pb-40 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406140926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1128]/95"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-6 md:space-y-8">
            <RevealOnScroll className="inline-block bg-[#2d5a1f]/10 border border-[#d4af37]/50 text-[#d4af37] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Especialista em Recuperação Judicial
            </RevealOnScroll>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif leading-[1.1] min-h-[140px] md:min-h-[auto]">
              <StaggeredText 
                text="Salve Sua Empresa da Falência." 
                highlightWord="Falência"
                highlightClass="text-green-400"
              />
            </h1>
            
            <RevealOnScroll delay={100}>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
                Reestruture dívidas bancárias abusivas, proteja seu patrimônio e retome o controle do seu fluxo de caixa. Defendemos quem produz.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6 justify-center lg:justify-start">
                <button 
                  onClick={scrollToSimulator}
                  className="bg-[#2d5a1f] hover:bg-[#1e3d15] text-white text-base md:text-lg font-bold py-4 px-8 md:px-10 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(45,90,31,0.3)] animate-hover-glow w-full sm:w-auto"
                >
                  Faça o Diagnóstico Gratuito
                </button>
                <button 
                  onClick={() => navigateTo('cases')} 
                  className="bg-transparent border border-gray-600 hover:border-[#d4af37] hover:text-[#d4af37] text-white text-base md:text-lg font-medium py-4 px-8 md:px-10 rounded-lg flex items-center justify-center transition-all duration-300 w-full sm:w-auto"
                >
                  Ver Resultados
                </button>
              </div>
            </RevealOnScroll>
          </div>

          <div className="flex-1 hidden md:block max-w-xl lg:max-w-none mx-auto lg:mx-0">
            <RevealOnScroll delay={200} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37] to-[#2d5a1f] opacity-20 blur-lg rounded-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-[#0a1128] to-[#1a1a18] p-1 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Reunião Estratégica" 
                  className="rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-500 w-full"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealOnScroll className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#1a1a18] mb-6">
              Você não está sozinho. <br className="hidden md:block"/>Conheça os sinais de alerta.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Identificar o problema é o primeiro passo para a solução. Se sua empresa enfrenta estes cenários, o tempo é seu inimigo.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                icon: <ShieldAlert className="w-10 h-10 md:w-12 md:h-12 text-[#b91c1c]" />,
                title: "Bloqueio de Faturamento",
                desc: "Recebíveis travados por bancos, impedindo o pagamento de fornecedores e folha salarial.",
                delay: 0
              },
              {
                icon: <TrendingDown className="w-10 h-10 md:w-12 md:h-12 text-[#b91c1c]" />,
                title: "Juros Abusivos",
                desc: "O serviço da dívida consome todo o lucro operacional, criando uma bola de neve impagável.",
                delay: 100
              },
              {
                icon: <Gavel className="w-10 h-10 md:w-12 md:h-12 text-[#b91c1c]" />,
                title: "Risco de Execução",
                desc: "Ameaças constantes de busca e apreensão de bens essenciais para a atividade da empresa.",
                delay: 200
              }
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={item.delay}>
                <div className="bg-[#fafaf8] p-8 md:p-10 rounded-xl border border-gray-100 shadow-premium-hover group cursor-default h-full hover:bg-white transition-colors">
                  <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a1a18] mb-2 md:mb-3 font-serif">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" ref={simulatorRef} className="py-16 md:py-24 bg-[#fafaf8] relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-0 w-full h-[60%] bg-[#0a1128]"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] opacity-5 rounded-full blur-3xl"></div>

         <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
            <RevealOnScroll className="text-center mb-10 md:mb-16 text-white">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4 md:mb-6">
                  Seu Primeiro Passo para a Sobrevivência
               </h2>
               <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed px-4">
                  Utilize nossa ferramenta exclusiva de Inteligência Artificial para descobrir a viabilidade da sua recuperação em segundos.
               </p>
            </RevealOnScroll>

            {step === 'input' ? (
              <RevealOnScroll delay={100}>
                 <InputStep onAnalyze={handleAnalyze} isLoading={isLoading} />
              </RevealOnScroll>
            ) : (
               data && analysis && (
                  <div className="animate-fade-in-up">
                     <ResultsDashboard data={data} analysis={analysis} onReset={handleReset} />
                  </div>
               )
            )}
         </div>
      </section>
    </>
  );
};

// 2. EXPERTISE VIEW
const ExpertiseView: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-[#fafaf8] text-center px-6">
        <RevealOnScroll>
          <span className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Áreas de Atuação</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#1a1a18] mb-6">Soluções Jurídicas Complexas</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nossa expertise vai além do contencioso. Oferecemos inteligência jurídica para proteger patrimônio e viabilizar negócios em crise.
          </p>
        </RevealOnScroll>
      </div>

      {/* Expertise Grid */}
      <section className="py-8 md:py-12 pb-20 md:pb-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              icon: <Landmark className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Recuperação Judicial",
              desc: "Reestruturação completa de passivos, suspensão de execuções (Stay Period) e negociação coletiva com credores. Atuamos desde o planejamento prévio até o encerramento do processo."
            },
            {
              icon: <Scale className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Direito Bancário",
              desc: "Revisão de contratos de empréstimos, financiamentos e cédulas de crédito. Identificação de juros abusivos, venda casada e ilegalidades em garantias fiduciárias."
            },
            {
              icon: <ShieldAlert className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Blindagem Patrimonial",
              desc: "Estruturação de Holdings Familiares e Patrimoniais para proteção legal de bens pessoais dos sócios contra riscos da atividade empresarial."
            },
            {
              icon: <Building2 className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Gestão de Passivo Tributário",
              desc: "Defesa em execuções fiscais federais e estaduais. Parcelamentos especiais, transações tributárias e teses para redução da carga fiscal."
            },
             {
              icon: <Users className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Negociação Extrajudicial",
              desc: "Mediação direta com bancos e grandes fornecedores para alongamento de dívidas sem a necessidade de processo judicial, preservando a reputação da empresa."
            },
             {
              icon: <FileText className="w-10 h-10 text-[#2d5a1f]" />,
              title: "Contratos Empresariais",
              desc: "Elaboração e revisão de contratos complexos para garantir segurança jurídica nas relações comerciais e prevenir litígios futuros."
            }
          ].map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 50}>
              <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-premium hover:border-[#d4af37]/30 transition-all duration-300 group h-full">
                <div className="mb-6 bg-[#2d5a1f]/5 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:bg-[#2d5a1f] transition-colors duration-300">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8 md:w-10 md:h-10 text-[#2d5a1f] group-hover:text-white transition-colors duration-300" })}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#1a1a18] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg">{item.desc}</p>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-[#2d5a1f] font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
};

// 3. ABOUT VIEW
const AboutView: React.FC<{ navigateTo: (view: string) => void }> = ({ navigateTo }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#0a1128]/80"></div>
        <div className="relative z-10 text-center text-white px-6">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">Tradição e Estratégia</h1>
            <p className="text-xl max-w-2xl mx-auto font-light text-gray-300">
              Mais do que advogados, somos parceiros de negócio focados na perenidade da sua empresa.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* The Founder */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2">
             <RevealOnScroll>
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
                 <img 
                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                   alt="Equipe Bruno Sakae" 
                   className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </RevealOnScroll>
          </div>
          <div className="flex-1 space-y-6">
            <RevealOnScroll delay={100}>
              <h2 className="text-4xl font-bold font-serif text-[#1a1a18] text-center lg:text-left">A Metodologia Sakae</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fundado pelo Dr. Bruno Sakae, nosso escritório nasceu da percepção de que o direito empresarial tradicional era muito reativo e pouco estratégico.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Desenvolvemos uma metodologia proprietária de <strong>"Advocacia de Resultado"</strong>, onde cada peça jurídica é desenhada não apenas para cumprir prazos, mas para gerar alavancagem financeira na negociação com credores.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-[#2d5a1f] font-bold text-4xl font-mono mb-2">+10</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Anos de Mercado</p>
                </div>
                <div>
                  <h4 className="text-[#2d5a1f] font-bold text-4xl font-mono mb-2">R$ 50mi</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">Passivo Reestruturado</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#fafaf8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#1a1a18]">Pilares da Nossa Atuação</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Combate", desc: "Postura agressiva e técnica contra abusos bancários." },
              { title: "Transparência", desc: "Clareza absoluta sobre riscos e probabilidades de êxito." },
              { title: "Agilidade", desc: "Atuação rápida para evitar bloqueios e paralisia da empresa." }
            ].map((v, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-[#d4af37] text-center h-full">
                   <h3 className="text-xl font-bold mb-4 font-serif">{v.title}</h3>
                   <p className="text-gray-600">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-[#2d5a1f] text-white text-center">
         <RevealOnScroll>
           <h2 className="text-3xl font-serif font-bold mb-8">Conheça nossa estrutura de perto</h2>
           <button 
             onClick={() => navigateTo('home')} 
             className="bg-white text-[#2d5a1f] px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
           >
             Agendar Visita
           </button>
         </RevealOnScroll>
      </section>
    </div>
  );
};

// 4. CASES VIEW (RESULTS)
const CasesView: React.FC<{ navigateTo: (view: string) => void }> = ({ navigateTo }) => {
  const cases = [
    {
      sector: "Indústria Metalúrgica",
      problem: "Dívida Bancária de R$ 3.5 Milhões com risco de leilão do galpão.",
      solution: "Suspensão do leilão via liminar e negociação com deságio de 70%.",
      result: "R$ 1.050.000 (Economia de R$ 2.45mi)",
      savings: "70%"
    },
    {
      sector: "Rede de Varejo",
      problem: "Capital de giro travado por retenção de recebíveis de cartão.",
      solution: "Ação de desbloqueio de travas bancárias e alongamento do perfil da dívida.",
      result: "Fluxo de caixa liberado em 48h",
      savings: "100% liquidez"
    },
    {
      sector: "Transportadora",
      problem: "Execução fiscal de R$ 800 mil bloqueando frota de caminhões.",
      solution: "Transação tributária excepcional e substituição de garantia.",
      result: "Frota liberada e parcelamento em 120x",
      savings: "Operação Salva"
    }
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-[#0a1128] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d5a1f] opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <RevealOnScroll>
          <span className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Track Record</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Números que Falam</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            No direito empresarial, o único argumento que importa é o resultado. Veja como transformamos crises em recomeços.
          </p>
        </RevealOnScroll>
      </div>

      {/* Featured Stats */}
      <section className="py-12 -mt-10 relative z-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Economia Gerada", val: "R$ 50mi+", icon: <TrendingDown /> },
            { label: "Empresas Salvas", val: "120+", icon: <Building2 /> },
            { label: "Taxa de Êxito", val: "92%", icon: <Award /> },
          ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-xl shadow-premium text-center border-b-4 border-[#2d5a1f]">
                <div className="flex justify-center text-[#d4af37] mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold font-mono text-[#1a1a18] mb-2">{stat.val}</div>
                <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
             </div>
          ))}
        </div>
      </section>

      {/* Detailed Cases */}
      <section className="py-20 bg-[#fafaf8]">
         <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-[#1a1a18] mb-12 text-center">Casos Recentes</h2>
            <div className="grid grid-cols-1 gap-8">
               {cases.map((c, i) => (
                 <RevealOnScroll key={i} delay={i * 150}>
                   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row hover:shadow-premium transition-all duration-300">
                      <div className="lg:w-1/3 bg-[#2d5a1f] p-8 text-white flex flex-col justify-center relative">
                         <div className="absolute top-4 right-4 text-[#d4af37] opacity-20"><BarChart3 size={48} /></div>
                         <span className="text-xs uppercase tracking-widest opacity-80 mb-2">Setor</span>
                         <h3 className="text-2xl font-serif font-bold mb-4">{c.sector}</h3>
                         <div className="mt-auto">
                           <span className="text-xs uppercase tracking-widest opacity-80">Resultado</span>
                           <p className="text-[#d4af37] font-mono font-bold text-xl">{c.result}</p>
                         </div>
                      </div>
                      <div className="lg:w-2/3 p-8">
                         <div className="mb-6">
                           <h4 className="flex items-center gap-2 text-[#b91c1c] font-bold mb-2 uppercase text-xs tracking-wide">
                             <ShieldAlert size={16} /> O Desafio
                           </h4>
                           <p className="text-gray-700">{c.problem}</p>
                         </div>
                         <div>
                           <h4 className="flex items-center gap-2 text-[#2d5a1f] font-bold mb-2 uppercase text-xs tracking-wide">
                             <CheckCircle2 size={16} /> A Solução
                           </h4>
                           <p className="text-gray-700">{c.solution}</p>
                         </div>
                      </div>
                   </div>
                 </RevealOnScroll>
               ))}
            </div>
         </div>
      </section>

      <section className="py-20 bg-white text-center px-6">
        <RevealOnScroll>
          <h2 className="text-3xl font-serif font-bold text-[#1a1a18] mb-6">Sua empresa pode ser o próximo caso de sucesso</h2>
          <button 
             onClick={() => navigateTo('home')} 
             className="bg-[#2d5a1f] text-white px-12 py-5 rounded-lg font-bold text-lg shadow-xl hover:bg-[#1e3d15] transition-all transform hover:-translate-y-1"
          >
             Iniciar Diagnóstico Gratuito
          </button>
        </RevealOnScroll>
      </section>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'expertise' | 'about' | 'cases'>('home');
  
  // App Logic State
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<BusinessData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Header UI State
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const simulatorRef = useRef<HTMLDivElement>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Header Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);

      // Dynamic threshold logic:
      // On 'about' view, hide the header much earlier (150px) to clear the view for the hero/intro transition.
      // On other views, keep it visible longer (600px) for standard navigation.
      const hideThreshold = currentView === 'about' ? 150 : 600;

      if (currentScrollY > hideThreshold) { 
        if (currentScrollY > lastScrollY.current) setIsHeaderVisible(false);
        else setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]); // Re-run effect when currentView changes

  const navigateTo = (view: 'home' | 'expertise' | 'about' | 'cases') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    
    // If navigating to home specifically for the simulator
    if (view === 'home') {
       // We use a timeout to let the view render before scrolling
       setTimeout(() => {
         simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    }
  };

  const scrollToSimulator = () => {
    if (currentView !== 'home') {
      navigateTo('home');
    } else {
      simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async (inputData: BusinessData) => {
    setIsLoading(true);
    setData(inputData);
    try {
      const [result] = await Promise.all([
        generateDiagnosis(inputData),
        new Promise(resolve => setTimeout(resolve, 2000)) 
      ]);
      setAnalysis(result);
      setStep('results');
      setTimeout(() => simulatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error("Failed to analyze", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setData(null);
    setAnalysis(null);
    setTimeout(() => simulatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Helper for Nav Links with specific staggered delay classes
  const NavLink = ({ view, label, delayClass }: { view: 'home' | 'expertise' | 'about' | 'cases', label: string, delayClass: string }) => (
    <button 
      onClick={() => navigateTo(view)}
      className={`relative group text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 animate-fade-in-down ${delayClass}
        ${(isScrolled || currentView !== 'home' && currentView !== 'cases') ? 'text-slate-600 hover:text-[#2d5a1f]' : 'text-slate-200 hover:text-white'}
        ${currentView === view ? 'text-[#2d5a1f]' : ''}
      `}
    >
      {label}
      <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${currentView === view ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </button>
  );

  // Dynamic header style based on view
  // Only expertise has a light background needing dark text initially. 
  // Home, About (hero image), and Cases (dark bg) need white text initially.
  const isDarkHeaderView = currentView === 'expertise'; 
  
  const headerBgClass = isMobileMenuOpen 
    ? 'bg-[#0a1128] py-4' // Force dark bg when menu is open
    : isScrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-4' 
      : 'bg-transparent py-6 md:py-8'; 
  
  const logoColorClass = (isMobileMenuOpen || isScrolled || isDarkHeaderView) 
    ? (isScrolled && !isMobileMenuOpen ? 'bg-[#2d5a1f] text-white' : 'bg-[#2d5a1f] text-white') 
    : 'bg-white text-[#2d5a1f]';

  const textColorClass = (isMobileMenuOpen) 
    ? 'text-white' // Force white text when menu open
    : (isScrolled || isDarkHeaderView) 
      ? 'text-[#1a1a18]' 
      : 'text-white';

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col font-sans text-[#1a1a18]">
      
      {/* 1. Smart Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform
          ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
          ${headerBgClass}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer animate-fade-in-down header-delay-0" onClick={() => navigateTo('home')}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 ${logoColorClass}`}>
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tight font-serif leading-none transition-colors duration-300 ${textColorClass}`}>Bruno Sakae</h1>
              <p className="text-[9px] text-[#d4af37] font-bold tracking-[0.25em] uppercase mt-1">Advocacia Empresarial</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-10 items-center">
            <NavLink view="expertise" label="Especialidades" delayClass="header-delay-1" />
            <NavLink view="about" label="O Escritório" delayClass="header-delay-2" />
            <NavLink view="cases" label="Resultados" delayClass="header-delay-3" />
            
            <button 
              onClick={scrollToSimulator}
              className={`ml-4 px-7 py-3 rounded text-xs font-bold uppercase tracking-widest shadow-md transition-colors duration-300 animate-hover-glow border animate-fade-in-down header-delay-4
                ${(isScrolled || isDarkHeaderView)
                  ? 'bg-[#2d5a1f] text-white border-transparent hover:bg-[#1e3d15]' 
                  : 'bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-[#2d5a1f] hover:text-white hover:border-[#2d5a1f]'}
              `}
            >
              Diagnóstico Gratuito
            </button>
          </nav>

          <button className={`md:hidden ${textColorClass}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
           <div className="md:hidden bg-[#0a1128] border-t border-white/10 p-8 flex flex-col gap-6 shadow-2xl absolute w-full animate-slide-down-menu h-screen z-50 overflow-hidden">
              <button className="text-left text-white text-lg uppercase tracking-widest font-bold hover:text-[#d4af37] py-4 border-b border-white/10 transition-colors" onClick={() => navigateTo('home')}>Home</button>
              <button className="text-left text-white text-lg uppercase tracking-widest font-bold hover:text-[#d4af37] py-4 border-b border-white/10 transition-colors" onClick={() => navigateTo('expertise')}>Especialidades</button>
              <button className="text-left text-white text-lg uppercase tracking-widest font-bold hover:text-[#d4af37] py-4 border-b border-white/10 transition-colors" onClick={() => navigateTo('about')}>O Escritório</button>
              <button className="text-left text-white text-lg uppercase tracking-widest font-bold hover:text-[#d4af37] py-4 border-b border-white/10 transition-colors" onClick={() => navigateTo('cases')}>Resultados</button>
              <button 
                onClick={scrollToSimulator}
                className="bg-[#2d5a1f] hover:bg-[#1e3d15] text-white py-5 rounded-lg text-lg uppercase tracking-widest font-bold shadow-lg mt-4 active:scale-95 transition-all border border-transparent hover:border-[#d4af37]"
              >
                Diagnóstico Gratuito
              </button>
           </div>
        )}
      </header>

      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView 
            scrollToSimulator={scrollToSimulator}
            simulatorRef={simulatorRef}
            step={step}
            isLoading={isLoading}
            data={data}
            analysis={analysis}
            handleAnalyze={handleAnalyze}
            handleReset={handleReset}
            navigateTo={navigateTo}
          />
        )}
        {currentView === 'expertise' && <ExpertiseView />}
        {currentView === 'about' && <AboutView navigateTo={navigateTo} />}
        {currentView === 'cases' && <CasesView navigateTo={navigateTo} />}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a1128] text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-[#d4af37]" />
                <span className="text-white font-bold font-serif text-2xl tracking-wide">Bruno Sakae</span>
              </div>
              <p className="text-sm leading-7 opacity-80">
                 Escritório boutique especializado em reestruturação de empresas, recuperação judicial e defesa contra abusividade bancária.
              </p>
           </RevealOnScroll>
           
           <RevealOnScroll delay={100}>
              <h4 className="text-white font-bold mb-6 tracking-wide">Links Rápidos</h4>
              <ul className="space-y-4 text-sm">
                 <li><button onClick={() => navigateTo('home')} className="hover:text-[#d4af37] transition-colors">Home</button></li>
                 <li><button onClick={() => navigateTo('expertise')} className="hover:text-[#d4af37] transition-colors">Especialidades</button></li>
                 <li><button onClick={() => navigateTo('about')} className="hover:text-[#d4af37] transition-colors">O Escritório</button></li>
                 <li><button onClick={() => navigateTo('cases')} className="hover:text-[#d4af37] transition-colors">Resultados</button></li>
              </ul>
           </RevealOnScroll>
           
           <RevealOnScroll delay={200}>
              <h4 className="text-white font-bold mb-6 tracking-wide">Contato</h4>
              <p className="text-sm mb-3 text-white/90">Av. Paulista, 1000 - São Paulo, SP</p>
              <p className="text-sm mb-3 text-white/90">contato@brunosakae.adv.br</p>
              <p className="text-sm text-[#d4af37] font-mono font-bold text-lg">(11) 99999-9999</p>
           </RevealOnScroll>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 border-t border-gray-800 text-center text-xs text-gray-500">
          <p className="mb-4">© {new Date().getFullYear()} Bruno Sakae Advocacia. Todos os direitos reservados.</p>
          <p className="max-w-3xl mx-auto leading-6">
             <strong>Nota Legal:</strong> Os resultados apresentados pelo simulador não representam garantia de êxito processual, mas uma análise preliminar baseada em inteligência artificial e nos dados fornecidos. A estratégia jurídica final depende exclusivamente de análise documental detalhada feita por nossos advogados.
          </p>
        </div>
      </footer>

      {/* Sticky CTA (Results only) */}
      {step === 'results' && currentView === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-50 animate-slide-up">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-[#1a1a18] text-lg">Precisa executar esse plano?</p>
              <p className="text-sm text-gray-500 hidden md:block">Nossa equipe especialista em recuperação de crédito pode ajudar agora.</p>
            </div>
            <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-10 rounded-lg flex items-center gap-3 shadow-lg transition-all transform hover:-translate-y-1 w-full md:w-auto justify-center">
              <Phone className="w-6 h-6" />
              Chamar no WhatsApp
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;