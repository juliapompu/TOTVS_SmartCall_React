# TOTVS SmartCall


Plataforma web que usa IA para extrair insights estratégicos de transcrições de reuniões: reclamações, oportunidades e ideias estratégicas, tudo visualizado em um dashboard.

🔗 **Demo:** https://totvs-smart-call.vercel.app

> Projeto acadêmico da FIAP (Challenge) em parceria com a TOTVS.

---

## Sobre o projeto

Reuniões com clientes geram muita informação que se perde em transcrições longas. O SmartCall processa essas transcrições, identifica o que realmente importa e apresenta os resultados de forma visual para facilitar a tomada de decisão.

### Principais funcionalidades

- Análise de transcrições de reuniões com IA
- Classificação dos insights em reclamações, oportunidades e ideias estratégicas
- Dashboard com rankings "Top 5" (clientes, produtos e colaboradores)


---

## Tecnologias

**Front-end**
- React
- Vite
- React Bootstrap + CSS customizado

**Back-end**
- Python
- Banco de dados SupaBase
- API de IA: OpenIA

**Deploy e CI**
- Vercel (front-end)
- GitHub Actions

---

## Estrutura do repositório

```
TOTVS_SmartCall_React/
├── .github/workflows/   # pipelines de CI
├── back-end/            # API e integração com o banco
├── front-end/           # O rosto da nossa solução
├── public/              # arquivos estáticos
├── eslint.config.js
├── vite.config.js
└── package.json
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 11.5.2 ou superior
- npm
- [acesso ao banco Oracle / outras dependências do back-end]

### Front-end

```bash
# clonar o repositório
git clone https://github.com/juliapompu/TOTVS_SmartCall_React.git
cd TOTVS_SmartCall_React
cd front-end

# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

Para gerar o build de produção:

```bash
npm run build
```

### Back-end

```bash
cd back-end
# [comandos para instalar e rodar o back-end]
```

### Variáveis de ambiente

Crie um arquivo `.env` com:

```
VITE_API_URL=[url da API]
# [outras variáveis necessárias]
```

---

## Banco de dados

O banco SupaBase possui 5 tabelas que armazenam [clientes, reuniões, transcrições, insights... ajuste conforme o modelo real]. A documentação completa está em [link/pasta].

---

## Equipe

Projeto desenvolvido pelo grupo **CONTROL** (FIAP, turma 2-ESPV):

- Julia — [@juliapompu](https://github.com/juliapompu)
- Thayná — [link]
- Giovana — [link]
- Luiz — [link]

---

## Licença

Projeto acadêmico sem fins comerciais. [ou adicione a licença que preferir]
