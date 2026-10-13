# Contrato da API do SmartCall

Este documento descreve o contrato que o backend deve implementar para atender
às chamadas feitas atualmente pelo frontend.

## Configuração e formato geral

- O frontend concatena a URL base com os caminhos abaixo. A base configurável é
  `VITE_API_BASE_URL`; o padrão no código é
  `https://api.smartcall.totvs.com/v1`.
- As rotas abaixo são relativas à base (por exemplo, `GET /companies`).
- As respostas de sucesso das rotas JSON devem usar `Content-Type:
  application/json`.
- O frontend não envia credenciais nem exige autenticação atualmente.
- Para upload, o frontend envia `multipart/form-data`. O servidor não deve
  exigir que o cliente informe manualmente o `Content-Type` com boundary.
- URLs de imagens e logos devem ser acessíveis pelo navegador. Se estiverem em
  outro domínio, esse domínio deve permitir as requisições necessárias via
  CORS.
- O frontend usa o adaptador em memória por padrão. Para chamar o backend,
  configure `VITE_USE_MOCK_API=false` e `VITE_API_BASE_URL` com a URL da API.

## Endpoints

### `GET /companies`

Lista as empresas parceiras. É usado na página de parcerias, no carrossel da
home e no seletor de empresa do formulário de análise.

**Resposta `200 OK`**: array de objetos `Company`, conforme o contrato descrito
em [Empresa](#empresa).

```json
[
  {
    "id": 1,
    "name": "Itaú Unibanco",
    "logoUrl": "https://cdn.exemplo.com/empresas/itau.jpg",
    "meetingsCount": 2,
    "people": ["Ana Paula", "Bruno Silva"],
    "location": "São Paulo/SP",
    "tagline": "Banco líder em serviços financeiros",
    "sector": "Serviços Financeiros",
    "website": "https://www.itau.com.br",
    "description": "Descrição da empresa.",
    "highlights": ["Pagamentos", "Gestão de Caixa"],
    "focusAreas": ["Fintech", "Cartões"],
    "createdAt": "2026-01-10T10:00:00.000Z",
    "meetings": []
  }
]
```

Não há paginação nem filtros implementados no frontend. Retorne `[]` quando
não houver empresas.

### `GET /companies/{id}`

Retorna os detalhes da empresa selecionada, incluindo seu histórico de
reuniões. `{id}` deve ser um identificador numérico.

**Resposta `200 OK`**: um objeto `Company` completo, incluindo `meetings`.
**Resposta `404 Not Found`**: empresa inexistente.

### `GET /news`

Lista as notícias utilizadas na home, na chamada de notícias em destaque e no
carrossel. O array deve conter objetos `NewsItem`, conforme o contrato descrito
em [Notícia](#notícia).

```json
[
  {
    "id": 3,
    "slug": "premio-totvs-brasil",
    "title": "Prêmio TOTVS Brasil",
    "summary": "Conheça o evento que celebra inovação e resultados.",
    "category": "Eventos & Inovação",
    "author": "Equipe TOTVS",
    "publishedAt": "2026-04-15T11:00:00.000Z",
    "imageUrl": "https://cdn.exemplo.com/noticias/premio.jpg",
    "paragraphs": ["Primeiro parágrafo da notícia.", "Segundo parágrafo."]
  }
]
```

O frontend destaca primeiro a notícia de `id` igual a `3`, se ela estiver na
lista; caso contrário, usa o primeiro item. O carrossel exibe até três itens.
Para preencher as áreas de destaque, forneça pelo menos três notícias. Retorne
`[]` se não houver conteúdo.

### `GET /news/{id}`

Retorna uma notícia completa para a página de detalhe. `{id}` deve ser um
identificador numérico.

**Resposta `200 OK`**: um objeto `NewsItem` completo, incluindo todos os
parágrafos em `paragraphs`.
**Resposta `404 Not Found`**: notícia inexistente.

### `POST /transcriptions/analyze`

Recebe uma transcrição, analisa seu conteúdo e retorna os insights que serão
exibidos na tela de resultado.

**Corpo**: `multipart/form-data` com os campos:

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `companyId` | texto numérico | Sim | ID de uma empresa existente |
| `participants` | texto contendo JSON | Sim | Array JSON de strings; pode ser `[]` |
| `file` | arquivo | Sim | `.docx`, `.vtt` ou `.txt`, até 50 MiB |

Exemplo do valor textual de `participants`: `["Ana Paula","Bruno Silva"]`.

**Resposta `200 OK`**: a análise deve estar concluída e todos os campos de
`insights` devem estar presentes. O frontend espera o resultado na própria
resposta; ele não implementa polling de tarefas assíncronas.

```json
{
  "success": true,
  "message": "Transcrição processada com sucesso!",
  "insights": {
    "summary": "Resumo da reunião.",
    "sentiment": "POSITIVE",
    "overallTone": "Produtivo e colaborativo",
    "keyTopics": ["Integração de APIs", "SLA de atendimento"],
    "keyDecisions": ["Aprovação do cronograma de testes."],
    "actionItems": [
      {
        "id": "1",
        "task": "Enviar a documentação técnica.",
        "assignee": "Ana Paula",
        "deadline": "2 dias"
      }
    ]
  }
}
```

`sentiment` deve ser exatamente `POSITIVE`, `NEUTRAL` ou `NEGATIVE`.
`actionItems` pode ser um array vazio; `assignee` e `deadline` são opcionais.
`success` deve ser `true` quando a análise concluir com sucesso e `message`
deve ser uma mensagem adequada para exibição.

## Modelos de dados

### Empresa

Todos os campos abaixo são esperados tanto em `GET /companies` como em
`GET /companies/{id}`.

| Campo | Tipo | Uso no frontend |
|---|---|---|
| `id` | `number` | Identificação e navegação para o detalhe |
| `name` | `string` | Nome da empresa |
| `logoUrl` | `string` | URL acessível do logo |
| `meetingsCount` | `number` | Total de reuniões mostrado em cards |
| `people` | `string[]` | Contatos exibidos no detalhe |
| `location` | `string` | Localização exibida no detalhe |
| `tagline` | `string` | Chamada exibida no cabeçalho do detalhe |
| `sector` | `string` | Setor exibido no detalhe |
| `website` | `string` | URL usada no link para o site oficial |
| `description` | `string` | Descrição da empresa |
| `highlights` | `string[]` | Lista de destaques |
| `focusAreas` | `string[]` | Lista de áreas de atuação |
| `createdAt` | `string` | Data/hora em ISO 8601 |
| `meetings` | `Meeting[]` | Histórico da empresa |

Cada elemento de `meetings` deve conter:

| Campo | Tipo |
|---|---|
| `id` | `number` |
| `title` | `string` |
| `dateTime` | `string` em ISO 8601 |
| `participants` | `string[]` |
| `transcription` | `string` |

`meetingsCount` deve refletir o total de reuniões registradas, inclusive quando
o endpoint de lista não precisar renderizar o histórico. Use `meetings: []`
quando uma empresa ainda não tiver reuniões.

### Notícia

| Campo | Tipo | Uso no frontend |
|---|---|---|
| `id` | `number` | Identificação, destaque e navegação para o detalhe |
| `slug` | `string` | Slug da notícia |
| `title` | `string` | Título |
| `summary` | `string` | Resumo exibido nos cards |
| `category` | `string` | Categoria no detalhe |
| `author` | `string` | Autor no detalhe |
| `publishedAt` | `string` | Data/hora em ISO 8601 |
| `imageUrl` | `string` | URL acessível da imagem |
| `paragraphs` | `string[]` | Corpo da notícia, um parágrafo por item |

## Erros e códigos HTTP

Para respostas não-2xx, envie um corpo JSON com `message` legível e,
opcionalmente, `code`:

```json
{
  "message": "A empresa selecionada não foi encontrada.",
  "code": "COMPANY_NOT_FOUND"
}
```

O frontend também reconhece `detail`, `error_description`, `error` e `errors`
como campos de mensagem. Use os status adequados:

| Status | Situação |
|---|---|
| `400 Bad Request` | Campos inválidos, arquivo ausente/inválido ou JSON de participantes inválido |
| `404 Not Found` | Empresa, notícia ou endpoint inexistente |
| `413 Content Too Large` | Arquivo acima do limite de 50 MiB |
| `422 Unprocessable Entity` | Arquivo recebido, mas não processável |
| `500 Internal Server Error` | Erro inesperado no processamento |

Não retorne `200` em falhas de processamento. O frontend considera sucesso
qualquer status `2xx` e, na análise, espera também `success` e `insights`.

## Ranking

O ranking atual da home (`Top 5 clientes`, `Top 5 produtos` e `Top 5
colaboradores`) está fixo no próprio frontend e não faz chamada à API. Portanto,
não há endpoint de ranking necessário para a integração atual. Para tornar
esses dados administráveis pelo backend, será necessário definir um novo
contrato e também alterar o frontend para consumi-lo.
