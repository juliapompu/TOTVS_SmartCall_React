import { createApiError, normalizeApiError, publishApiError } from './apiErrors';
import type { ApiRequestOptions, ApiResponse, ApiTransport } from './apiTypes';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.smartcall.totvs.com/v1';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const usesMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body }: ApiRequestOptions = {},
): Promise<T> {
  try {
    const response = usesMockApi
      ? await loadInMemoryTransport().then((transport) =>
          transport.request(path, method, body))
      : await fetchApi(path, method, body);

    if (response.status < 200 || response.status >= 300) {
      throw createApiError(response.status, response.body);
    }

    return response.body as T;
  } catch (cause) {
    const error = normalizeApiError(cause);
    publishApiError(error);
    throw error;
  }
}

async function loadInMemoryTransport(): Promise<ApiTransport> {
  const { inMemoryApiAdapter } = await import('./inMemoryApiAdapter');
  return inMemoryApiAdapter;
}

async function fetchApi(
  path: string,
  method: ApiRequestOptions['method'],
  body?: FormData,
): Promise<ApiResponse> {
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const response = await fetch(`${baseUrl}${path}`, {
    method: method ?? 'GET',
    headers: body ? { Accept: defaultHeaders.Accept } : defaultHeaders,
    body,
  });

  let responseBody: unknown = null;
  const responseText = await response.text();
  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch (cause) {
      if (response.ok) {
        throw new Error('A API retornou uma resposta inválida.', { cause });
      }
      responseBody = responseText;
    }
  }

  return { status: response.status, body: responseBody };
}