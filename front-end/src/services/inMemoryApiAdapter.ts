import { companiesApiResponse } from '../mock/companies';
import { newsApiResponse } from '../mock/news';
import type {
  MeetingInsights,
  UploadTranscriptionResponse,
} from '../types/company';
import type { ApiMethod, ApiResponse, ApiTransport } from './apiTypes';

const networkDelay = 350;
const analysisDelay = 1200;

const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const response = (status: number, body: unknown): ApiResponse => ({
  status,
  body,
});

function createInsights(companyName: string, participants: string[]): MeetingInsights {
  return {
    summary: `A reunião com a equipe da ${companyName} abordou o alinhamento de integrações entre os sistemas ERP e o ecossistema TOTVS, com foco em otimização de performance e próximos passos.`,
    sentiment: 'POSITIVE',
    overallTone: 'Produtivo e Colaborativo',
    keyTopics: [
      'Integração de APIs',
      'Otimização de Consultas SQL',
      'Autenticação OAuth2',
      'SLA de Atendimento',
    ],
    keyDecisions: [
      'Aprovação do cronograma de testes para o próximo trimestre.',
      'Adoção da arquitetura de microserviços para o módulo de relatórios.',
    ],
    actionItems: [
      {
        id: '1',
        task: 'Enviar documentação técnica de OpenAPI para a equipe de TI.',
        assignee: participants[0] || 'Responsável Técnico',
        deadline: '2 dias',
      },
      {
        id: '2',
        task: 'Agendar call de alinhamento com a equipe de infraestrutura.',
        assignee: participants[1] || 'Gerente de Projeto',
        deadline: 'Próxima semana',
      },
    ],
  };
}

async function analyzeTranscription(body?: FormData): Promise<ApiResponse> {
  const companyId = Number(body?.get('companyId'));
  const file = body?.get('file');
  const participantsValue = body?.get('participants');

  if (!Number.isInteger(companyId) || companyId < 1) {
    return response(400, { message: 'Selecione uma empresa válida.' });
  }

  if (!(file instanceof File)) {
    return response(400, { message: 'Envie um arquivo de transcrição válido.' });
  }

  if (typeof participantsValue !== 'string') {
    return response(400, { message: 'A lista de participantes está inválida.' });
  }

  let participants: string[];
  try {
    const parsedParticipants: unknown = JSON.parse(participantsValue);
    if (
      !Array.isArray(parsedParticipants) ||
      !parsedParticipants.every((participant) => typeof participant === 'string')
    ) {
      return response(400, { message: 'A lista de participantes está inválida.' });
    }
    participants = parsedParticipants;
  } catch {
    return response(400, { message: 'A lista de participantes está inválida.' });
  }

  const company = companiesApiResponse.find((item) => item.id === companyId);
  if (!company) {
    return response(404, { message: 'A empresa selecionada não foi encontrada.' });
  }

  await delay(analysisDelay);
  const result: UploadTranscriptionResponse = {
    success: true,
    message: 'Transcrição processada com sucesso!',
    insights: createInsights(company.name, participants),
  };

  return response(200, result);
}

async function request(
  path: string,
  method: ApiMethod,
  body?: FormData,
): Promise<ApiResponse> {
  await delay(networkDelay);

  if (method === 'GET' && path === '/companies') {
    return response(200, companiesApiResponse);
  }

  const companyMatch = path.match(/^\/companies\/(\d+)$/);
  if (method === 'GET' && companyMatch) {
    const companyId = Number(companyMatch[1]);
    const company = companiesApiResponse.find((item) => item.id === companyId);
    return company
      ? response(200, company)
      : response(404, { message: 'Empresa não encontrada.' });
  }

  if (method === 'GET' && path === '/news') {
    return response(200, newsApiResponse);
  }

  const newsMatch = path.match(/^\/news\/(\d+)$/);
  if (method === 'GET' && newsMatch) {
    const newsId = Number(newsMatch[1]);
    const news = newsApiResponse.find((item) => item.id === newsId);
    return news
      ? response(200, news)
      : response(404, { message: 'Notícia não encontrada.' });
  }

  if (method === 'POST' && path === '/transcriptions/analyze') {
    return analyzeTranscription(body);
  }

  return response(404, { message: `Endpoint não encontrado: ${method} ${path}` });
}

export const inMemoryApiAdapter: ApiTransport = { request };
