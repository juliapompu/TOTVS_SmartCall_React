# 📋 Especificação Técnica & Fluxo da Aplicação: TOTVS SmartCall v2

Este documento estabelece a arquitetura frontend, o design system, a estrutura de arquivos, as interfaces de dados, a camada de serviços e a explicação detalhada do fluxo de interação da aplicação **Smart Call v2**.

---

## 🚀 1. Visão Geral & Arquitetura

O **Smart Call v2** é uma aplicação Single Page Application (SPA) desenvolvida para transformar transcrições de reuniões corporativas em insights acionáveis com inteligência artificial.

### Princípios da Arquitetura:
* **Spec-Driven Development (SDD):** A especificação de dados e componentes antecede a implementação do código.
* **Mobile-First Responsiveness:** Toda a interface é desenhada primeiro para telas móveis e adaptada progressivamente para desktop via Tailwind CSS.
* **Clean Architecture & Service Abstraction:** Componentes de interface não acessam dados diretamente; todas as operações ocorrem via `src/services/`, facilitando a migração de mocks para endpoints REST reais.
* **Component-Driven Design:** Componentes modulares, encapsulados e reutilizáveis utilizando React e Material UI Icons.

---

## 🛠️ 2. Stack Tecnológico e Dependências

| Tecnologia / Pacote | Versão | Função no Projeto |
| :--- | :--- | :--- |
| **React** | `^18.2.0` | Biblioteca base de interface de usuário |
| **TypeScript** | `^5.0.0` | Tipagem estática rigorosa e definição de contratos |
| **Vite** | `^5.0.0` | Ferramenta de build e servidor de desenvolvimento |
| **Tailwind CSS** | `^3.4.0` | Estilização utilitária e design tokens |
| **React Router DOM** | `^6.22.0` | Roteamento dinâmico SPA e navegação por parâmetros |
| **MUI Icons (`@mui/icons-material`)** | `^5.15.0` | Biblioteca oficial de ícones corporativos da Google |
| **Emotion (`@emotion/react`, `@emotion/styled`)** | `^11.11.0` | Dependência para renderização de ícones da MUI |

### Comandos de Instalação no Terminal:

```bash
# Instalação de dependências de produção
npm install react-router-dom @mui/icons-material @mui/material @emotion/react @emotion/styled

# Instalação de dependências de desenvolvimento
npm install -D tailwindcss postcss autoprefixer @types/node vite
```

---

## 🎨 3. Design Tokens & Tailwind Configuration

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#021740',     // Azul Escuro Principal (Header, Hero, Cards de Ranking)
        secondary: '#084677',   // Azul Médio (Uploader, Cards de Parcerias)
        darkBlue: '#083b6c',    // Azul Profundo para estados ativados/hover
        accent: '#08c5c8',      // Turquesa / Ciano de Destaque e IA
        cardBg: '#D9D9D9',      // Cinza neutro para elementos secundários
        bodyBg: '#f8f9fa',      // Fundo claro padrão da aplicação
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### `src/styles/variables.css`
```css
:root {
  --primary-color: #021740;
  --secondary-color: #084677;
  --dark-blue: #083b6c;
  --accent-color: #08c5c8;
  --card-bg: #D9D9D9;
  --body-bg: #f8f9fa;
}
```

### `src/styles/global.css`
```css
@import './variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: var(--body-bg);
  color: #1e293b;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}
```

---

## 📁 4. Estrutura Completa do Projeto (Directory Tree)

```text
smart-call/
├── docs/
│   ├── design/
│   │   ├── desktop/
│   │   │   └── smart-call.png
│   │   └── mobile/
│   │       ├── hero-upload.png
│   │       ├── news.png
│   │       └── ranking.png
│   ├── mock/
│   │   ├── companies.ts
│   │   └── news.ts
│   └── spec/
│       └── smart_call_frontend_specification.md
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   └── images/
│   │       ├── companies/
│   │       │   ├── ambev-logo.jpeg
│   │       │   ├── arklok-logo.jpg
│   │       │   ├── assai-atacatista-logo.jfif
│   │       │   ├── atacadao-logo.png
│   │       │   ├── grupo-fleury-logo.png
│   │       │   ├── grupomuffato_logo.jfif
│   │       │   ├── itau-logo.jpg
│   │       │   ├── localiza-logo.png
│   │       │   ├── magazine-luiza-logo.png
│   │       │   ├── makro-engenharia-logo.png
│   │       │   ├── mart-minas-logo.png
│   │       │   ├── sebrae-logo.jpg
│   │       │   └── TOTVS_SmartCall_Logo.jpeg
│   │       └── news/
│   │           ├── noticia-btg.jpg
│   │           ├── noticia-espm.jpg
│   │           └── noticia-premio.jpg
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SnackbarContext.ts
│   │   │   └── SnackbarProvider.tsx
│   │   ├── HeroUpload/
│   │   │   └── HeroUpload.tsx
│   │   ├── NewsCarousel/
│   │   │   └── NewsCarousel.tsx
│   │   ├── NewsSection/
│   │   │   └── NewsSection.tsx
│   │   ├── PartnershipsCarousel/
│   │   │   └── PartnershipsCarousel.tsx
│   │   └── Ranking/
│   │       └── Ranking.tsx
│   ├── mock/
│   │   ├── companies.ts
│   │   └── news.ts
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.tsx
│   │   ├── Partners/                  # Rota: /parcerias
│   │   │   └── Partners.tsx
│   │   ├── PartnerDetail/             # Rota: /parcerias/:id
│   │   │   └── PartnerDetail.tsx
│   │   └── NewsDetail/                # Rota: /noticias/:id
│   │       └── NewsDetail.tsx
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── apiErrors.ts
│   │   ├── apiTypes.ts
│   │   ├── companyService.ts
│   │   ├── inMemoryApiAdapter.ts
│   │   └── newsService.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── types/
│   │   ├── company.ts
│   │   └── news.ts
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🔀 5. Mapeamento de Ícones Material UI (`@mui/icons-material`)

| Elemento / Componente | Ícone MUI | Importação Exemplo |
| :--- | :--- | :--- |
| **Área Drag & Drop** | `UploadFile`, `CloudUpload` | `import UploadFileIcon from '@mui/icons-material/UploadFile';` |
| **Ícone de Documento** | `Description` | `import DescriptionIcon from '@mui/icons-material/Description';` |
| **Fechar Modais** | `Close` | `import CloseIcon from '@mui/icons-material/Close';` |
| **Seleção de Empresa** | `Business` | `import BusinessIcon from '@mui/icons-material/Business';` |
| **Campo Participantes** | `People` | `import PeopleIcon from '@mui/icons-material/People';` |
| **Resumo da IA** | `Lightbulb` | `import LightbulbIcon from '@mui/icons-material/Lightbulb';` |
| **Decisões Tomadas** | `CheckCircleOutline` | `import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';` |
| **Lista de Tarefas** | `AssignmentTurnedIn` | `import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';` |
| **Navegação de Carrossel** | `ChevronLeft`, `ChevronRight` | `import ChevronRightIcon from '@mui/icons-material/ChevronRight';` |
| **Barra de Busca** | `Search` | `import SearchIcon from '@mui/icons-material/Search';` |
| **Voltar de Página** | `ArrowBack` | `import ArrowBackIcon from '@mui/icons-material/ArrowBack';` |
| **Card de Notícias** | `East` / `ArrowForward` | `import EastIcon from '@mui/icons-material/East';` |
| **Troféu do Ranking** | `EmojiEvents` | `import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';` |

---

## 📐 6. Interfaces TypeScript (`src/types/`)

### `src/types/company.ts`
```typescript
export interface Meeting {
  id: number;
  title: string;
  dateTime: string; // ISO 8601 (ex: "2026-05-10T14:30:00.000Z")
  participants: string[];
  transcription: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
  meetingsCount: number;
  people: string[];
  location: string;
  tagline: string;
  sector: string;
  website: string;
  description: string;
  highlights: string[];
  focusAreas: string[];
  createdAt: string;
  meetings: Meeting[];
}

export interface ActionItem {
  id: string;
  task: string;
  assignee?: string;
  deadline?: string;
}

export interface MeetingInsights {
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  keyTopics: string[];
  keyDecisions: string[];
  actionItems: ActionItem[];
  overallTone: string;
}

export interface UploadTranscriptionPayload {
  companyId: number;
  participants: string[];
  file: File;
}

export interface UploadTranscriptionResponse {
  success: boolean;
  message: string;
  insights: MeetingInsights;
}
```

### `src/types/news.ts`
```typescript
export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string; // ISO 8601
  imageUrl: string;
  paragraphs: string[];
}
```

---

## ⚡ 7. Camada de Serviços (`src/services/`)

`src/services/api.ts` centraliza as requisições HTTP, usando o contrato de
`src/services/apiTypes.ts`. Por padrão, as requisições passam pelo adaptador
`src/services/inMemoryApiAdapter.ts`, que simula endpoints e latência usando os
dados de `src/mock/`. Defina `VITE_USE_MOCK_API=false` para enviar os mesmos
serviços para a API real configurada em `VITE_API_BASE_URL`.

`src/services/apiErrors.ts` normaliza mensagens e códigos de erro do backend,
falhas de rede e respostas inválidas. Os erros são disponibilizados globalmente
para o Snackbar e continuam sendo lançados aos serviços para preservar o fluxo
de tratamento local.

Header, Footer e `SnackbarProvider` ficam em `src/components/global/`. O
Snackbar apresenta erros da API e confirmações para ações explícitas, como a
análise concluída, sem notificar leituras bem-sucedidas.

### `src/services/companyService.ts`
```typescript
import { ApiError } from './apiErrors';
import { apiRequest } from './api';
import type { Company, UploadTranscriptionPayload, UploadTranscriptionResponse } from '../types/company';

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    return apiRequest<Company[]>('/companies');
  },

  async getCompanyById(id: number): Promise<Company | undefined> {
    try {
      return await apiRequest<Company>(`/companies/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return undefined;
      throw error;
    }
  },

  async uploadAndAnalyze(
    payload: UploadTranscriptionPayload,
  ): Promise<UploadTranscriptionResponse> {
    const body = new FormData();
    body.append('companyId', String(payload.companyId));
    body.append('participants', JSON.stringify(payload.participants));
    body.append('file', payload.file);

    return apiRequest<UploadTranscriptionResponse>('/transcriptions/analyze', {
      method: 'POST',
      body,
    });
  }
};
```

### `src/services/newsService.ts`
```typescript
import { ApiError } from './apiErrors';
import { apiRequest } from './api';
import type { NewsItem } from '../types/news';

export const newsService = {
  async getAllNews(): Promise<NewsItem[]> {
    return apiRequest<NewsItem[]>('/news');
  },

  async getNewsById(id: number): Promise<NewsItem | undefined> {
    try {
      return await apiRequest<NewsItem>(`/news/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return undefined;
      throw error;
    }
  }
};
```

---

## 🔄 8. Explicação Detalhada do Fluxo da Aplicação

### FLUXO 1: Envio de Transcrição e Geração de Insights (Dual-Modal UX)

```text
  ┌─────────────────────────────────────────────────────────────┐
  │  1. HERO SECTION (Uploader + Notícias)                       │
  │ Usuário arrasta ou seleciona arquivo (.DOCX, .VTT, .TXT);   │
  │ destaque lateral navega entre 3 notícias por indicadores.   │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                  2. UPLOAD MODAL (Modal 1)                  │
  │  - Exibe nome e tamanho do arquivo selecionado.              │
  │  - Exibe Dropdown de Empresa (carregado via companyService) │
  │  - Exibe Input de Texto Livre para Participantes da reunião │
  │  - Ação: Clique em "Processar e Gerar Insights"             │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                  3. ESTADO DE CARREGAMENTO                  │
  │  - O modal altera seu estado interno para "loading: true"    │
  │  - Exibe spinner e a mensagem: "IA analisando transcrição..."│
  │  - Dispara a requisição `companyService.uploadAndAnalyze()` │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                 4. INSIGHTS MODAL (Modal 2)                 │
  │  - O UploadModal é fechado automaticamente.                 │
  │  - O InsightsModal abre apresentando o resultado da IA:     │
  │      a) Resumo executivo da call                           │
  │      b) Tags dos principais tópicos discutidos             │
  │      c) Checklist de decisões confirmadas                  │
  │      d) Tabela de Plano de Ação (Ações, Responsáveis e Prazos)│
  │  - Ação: Clique em "Concluir e Salvar" fecha o modal.        │
  └─────────────────────────────────────────────────────────────┘
```

---

### FLUXO 2: Navegação e Consulta de Parcerias (`/parcerias` e `/parcerias/:id`)

```text
 [Clique no Menu "PARCERIAS" no Header ou no Botão "Ver Mais" na Home]
                               │
                               ▼
            [ Rota: /parcerias (Partners Page) ]
  - Exibe campo de busca por nome de empresa.
  - Exibe grid responsivo (1 a 4 colunas) com todas as 12 empresas.
  - Cada card exibe a logo, o nome e a badge do total de reuniões.
                               │
            [ Clique em qualquer Card de Empresa ]
                               │
                               ▼
          [ Rota: /parcerias/:id (PartnerDetail Page) ]
  - Lê o parâmetro `:id` da URL.
  - Busca os dados estendidos via `companyService.getCompanyById(id)`.
  - Exibe logo e dados da empresa (descrição, localização, setor, contatos,
    site oficial, destaques e áreas de atuação) antes do histórico completo
    de reuniões, com datas, participantes e transcrições. Não exibe ano de fundação.
```

---

### FLUXO 3: Leitura de Notícias (`/noticias/:id`)

```text
 [Clique em um Card na Seção "Principais Notícias" ou no Banner Destaque]
                               │
                               ▼
           [ Rota: /noticias/:id (NewsDetail Page) ]
  - Lê o parâmetro `:id` da URL via `useParams()`.
  - Busca o conteúdo da notícia via `newsService.getNewsById(id)`.
  - Exibe cabeçalho com categoria, autor, data formatada, imagem de capa
    e o texto completo dividido em parágrafos organizados.
```

---

## 📱 9. Comportamento Responsivo (Mobile vs Desktop)

| Componente | Layout Mobile (`< 1024px`) | Layout Desktop (`>= 1024px`) |
| :--- | :--- | :--- |
| **Header** | Barra de navegação compacta com cantos inferiores arredondados (`rounded-b-2xl`). | Barra de navegação fixa com links centralizados/alinhados à direita. |
| **HeroUpload** | Layout em coluna única; o card de upload ocupa 100% da largura e o destaque lateral fica oculto. | Grid com uploader e carrossel lateral de até 3 notícias, com indicadores clicáveis. |
| **NewsSection** | Notícia principal em destaque superior + lista vertical compacta abaixo. | Grid formato revista com 3 colunas equivalentes. |
| **Partnerships Carousel** | Carrossel horizontal deslizante (swipe) com cards de 280px. | Exibição de 3 cards alinhados com setas de navegação laterais MUI. |
| **Ranking** | Cards das categorias do TOP 5 empilhados verticalmente, com posições e medalhas coloridas. | Grid de 3 colunas com formas em azul/turquesa e medalhas para as primeiras posições. |
| **Página /parcerias** | Lista vertical de 1 coluna com campo de busca no topo. | Grid responsivo de 4 colunas (`grid-cols-4`). |

---

## 🚦 10. Configuração de Rotas (`src/routes/AppRoutes.tsx`)

```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Partners } from '../pages/Partners/Partners';
import { PartnerDetail } from '../pages/PartnerDetail/PartnerDetail';
import { NewsDetail } from '../pages/NewsDetail/NewsDetail';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parcerias" element={<Partners />} />
        <Route path="/parcerias/:id" element={<PartnerDetail />} />
        <Route path="/noticias/:id" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
```

---

## 🤖 11. Prompt Definitivo para Agentes de Codificação de IA

Copie e envie o prompt abaixo para o seu agente de codificação de IA (Cursor, Copilot, ChatGPT, etc.):

```text
Você é um Engenheiro Frontend Senior especialista em React, TypeScript, Tailwind CSS, React Router DOM e Material UI Icons (@mui/icons-material).

Seu objetivo é implementar completamente a interface e funcionalidades do projeto Smart Call v2 conforme a especificação documentada em `docs/spec/smart_call_frontend_specification.md`.

REGRAS DE DESENVOLVIMENTO:

1. ESTILIZAÇÃO E DESIGN TOKENS:
   - Use exclusivamente Tailwind CSS nos arquivos .tsx.
   - Respeite a paleta de cores estipulada em `tailwind.config.js`:
     primary: '#021740', secondary: '#084677', darkBlue: '#083b6c', accent: '#08c5c8', cardBg: '#D9D9D9', bodyBg: '#f8f9fa'.

2. FLUXO DUAL-MODAL DO UPLOAD (`src/components/HeroUpload/`):
   - Ao soltar/selecionar um arquivo (.docx, .vtt, .txt), abra o `UploadModal.tsx`.
   - O `UploadModal` deve ter um `<select>` populado por `companyService.getCompanies()`, e um `<input>` para digitar os participantes da reunião.
   - Ao clicar em "Processar e Gerar Insights", exiba o estado de carregamento com spinner e acione `companyService.uploadAndAnalyze()`.
   - Ao resolver a Promise, feche o `UploadModal` e abra o `InsightsModal.tsx` apresentando o Resumo da Reunião, Tópicos (#), Decisões e Tabela de Plano de Ação.

3. PÁGINAS E NAVEGAÇÃO:
   - `/`: Home combinando Header, HeroUpload (com Modals), NewsSection, PartnershipsCarousel (com botão "Ver mais" direcionando para /parcerias) e Ranking.
   - `/parcerias`: Vitrine com busca por nome listando todas as empresas do mock.
   - `/parcerias/:id`: Detalhes da empresa com histórico completo de transcrições.
   - `/noticias/:id`: Notícia completa.

4. CAMADA DE SERVIÇOS E ÍCONES:
   - Toda busca ou envio de dados deve obrigatoriamente chamar os métodos de `src/services/companyService.ts` e `src/services/newsService.ts`.
   - Utilize apenas ícones do `@mui/icons-material` (ex: UploadFile, Close, Business, People, Lightbulb, CheckCircleOutline, ChevronRight, Search, ArrowBack).

Por favor, escreva um código React + TypeScript limpo, modular, devidamente tipado e pronto para produção.
```