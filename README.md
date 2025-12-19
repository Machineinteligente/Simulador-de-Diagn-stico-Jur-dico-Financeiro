# Bruno Sakae Advocacia - Landing Page & Diagnóstico Inteligente

## 📋 Visão Geral do Projeto

Este projeto consiste em uma **Landing Page de Alta Conversão (High-Ticket)** desenvolvida para o escritório **Bruno Sakae Advocacia**. O diferencial central da aplicação é a integração de um **Simulador de Diagnóstico Jurídico-Financeiro**.

Recentemente atualizado para operar com um **Motor Heurístico Offline**, a aplicação oferece diagnósticos instantâneos, privacidade total de dados e zero latência, mantendo a precisão matemática necessária para qualificação de leads.

A aplicação atrai empresários em crise financeira, oferece valor imediato através de um diagnóstico visual e converte essa atenção em contato qualificado.

---

## 🎨 Identidade Visual e UX (High-Ticket)

O projeto segue uma diretriz estética rigorosa para transmitir autoridade, solidez e sofisticação:

*   **Paleta de Cores:**
    *   Primária: **Verde "Hunter Green" (`#38761d`)** - Simboliza dinheiro, crescimento e estabilidade.
    *   Secundária: **Azul Escuro/Slate (`#0f172a`)** - Para seções de contraste e rodapés.
    *   Fundo: **Off-White/Slate-50** - Para leveza e leitura agradável.
*   **Tipografia:**
    *   Títulos (Headings): **Playfair Display** (Serifa) - Evoca tradição e elegância jurídica.
    *   Corpo (Body): **Inter** (Sans-Serif) - Garante legibilidade moderna em interfaces digitais.
*   **Responsividade Avançada:**
    *   **Smart Header:** Lógica dinâmica que oculta o menu em momentos estratégicos (ex: transição do Hero na página "Sobre") para não poluir a narrativa visual.
    *   **Tablet Optimization:** Layouts fluidos que se adaptam perfeitamente a iPads e Tablets Android, evitando o "aperto" visual comum em breakpoints médios.

---

## 🏗️ Estrutura da Landing Page (`App.tsx`)

A aplicação é uma *Single Page Application* (SPA) estruturada em seções narrativas:

1.  **Header (Sticky Inteligente):** Navegação rápida que reage ao scroll e ao contexto da página.
2.  **Hero Section:** Proposta de valor clara com layouts adaptativos (Mobile/Tablet/Desktop).
3.  **Pain Points (Dores):** Seção "Sinais de Alerta" que conecta o problema do usuário à solução.
4.  **Autoridade:** Apresentação do fundador e métricas do escritório.
5.  **O Simulador (Core):** Seção interativa onde o usuário insere dados (Input) e recebe o resultado (Output).
6.  **Roadmap/Processo:** Explicação visual das etapas do trabalho jurídico.
7.  **Footer:** Informações de contato e links legais.
8.  **Sticky CTA (Pós-Resultado):** Um botão flutuante de WhatsApp aparece apenas após o usuário receber o diagnóstico favorável.

---

## ⚖️ Compliance & Segurança Jurídica

Diferenciando-se de projetos amadores, este sistema implementa camadas de proteção:

### 1. Adequação à LGPD
O simulador **não envia dados para servidores externos**. Todo o processamento ocorre no navegador do usuário.
*   **Implementação:** Checkbox obrigatório de consentimento no `InputStep.tsx`.
*   **Privacidade:** Como o motor é offline, os dados financeiros sensíveis nunca deixam o dispositivo do cliente.

### 2. Gestão de Expectativa
*   **Disclaimer:** O sistema reforça que o diagnóstico é uma estimativa matemática e não substitui consulta formal.

---

## 🧠 O Motor de Diagnóstico (Lógica Heurística)

A inteligência da aplicação reside no arquivo `services/geminiService.ts` (nome mantido para compatibilidade, mas lógica refatorada).

### 1. Entradas de Dados

O formulário coleta o objeto `BusinessData`:
*   Faturamento Mensal
*   Custos Fixos
*   Dívida Total e Serviço da Dívida
*   Tipo de Credor (Bancos, Fisco, Trabalhista, Fornecedor)
*   Nível da Crise (Inicial a Severa)

### 2. Algoritmo de Análise (Offline)

Substituímos a IA generativa por um algoritmo determinístico robusto:

*   **Cálculo de Viabilidade:** Analisa se a empresa gera caixa operacional (EBITDA simplificado) suficiente para pagar a dívida *após* um deságio projetado.
*   **Regras de Deságio (Haircut):** Aplica percentuais de economia baseados na realidade de mercado para cada tipo de credor (ex: Bancos aceitam ~65% de corte, Trabalhista ~5%).
*   **Geração de Texto:** Utiliza templates dinâmicos que variam conforme o `Score` calculado, garantindo coerência sem alucinações de IA.

### 3. Saída de Dados (`AnalysisResult`)

O motor retorna instantaneamente:
*   `viabilityScore` (0-100%)
*   `projectedSavingsPercentage` (Economia projetada)
*   `cashFlowImpact` (Impacto no caixa mensal)
*   Roadmaps estratégicos específicos por tipo de credor.

---

## 💻 Stack Tecnológico

*   **Frontend:** React 19
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS (via CDN)
*   **Visualização de Dados:** Recharts
*   **Ícones:** Lucide React
*   **Motor:** Typescript (Lógica local, sem dependência de API externa)

---

## 🛠️ Como Executar

1.  **Requisitos:**
    *   Apenas um navegador moderno.
    *   **NÃO é necessária API Key**. O projeto funciona "out of the box".

2.  **Execução:**
    *   O ponto de entrada é `index.tsx`.
    *   O projeto utiliza importações via ES Modules (`esm.sh`) no `index.html`, permitindo execução direta em ambientes como CodeSandbox ou servidores estáticos simples.

---

## 📄 Nota Legal

Este simulador é uma ferramenta de marketing e triagem baseada em heurísticas financeiras. Os resultados são estimativas matemáticas e não constituem parecer jurídico formal.