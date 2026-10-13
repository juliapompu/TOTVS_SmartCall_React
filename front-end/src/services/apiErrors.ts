export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiErrorListener = (error: ApiError) => void;

const apiErrorListeners = new Set<ApiErrorListener>();

export function subscribeToApiErrors(listener: ApiErrorListener) {
  apiErrorListeners.add(listener);
  return () => {
    apiErrorListeners.delete(listener);
  };
}

export function publishApiError(error: ApiError) {
  apiErrorListeners.forEach((listener) => listener(error));
}

const fallbackMessages: Record<number, string> = {
  400: 'Os dados enviados são inválidos. Confira as informações e tente novamente.',
  401: 'Sua sessão expirou. Entre novamente para continuar.',
  403: 'Você não tem permissão para realizar esta ação.',
  404: 'O conteúdo solicitado não foi encontrado.',
  409: 'Esta solicitação conflita com os dados atuais.',
  422: 'Não foi possível processar os dados enviados.',
  429: 'Muitas solicitações. Aguarde um momento e tente novamente.',
};

function readMessage(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    const messages = value
      .map(readMessage)
      .filter((message): message is string => Boolean(message));
    return messages.length ? messages.join(' ') : undefined;
  }

  if (typeof value !== 'object' || value === null) {
    return undefined;
  }

  for (const key of ['message', 'detail', 'error_description', 'error', 'errors']) {
    const message = readMessage(value[key as keyof typeof value]);
    if (message) return message;
  }

  return undefined;
}

function fallbackMessage(status: number) {
  if (fallbackMessages[status]) return fallbackMessages[status];
  if (status >= 500) return 'O serviço está temporariamente indisponível. Tente novamente.';
  return 'Não foi possível concluir a solicitação.';
}

export function createApiError(status: number, body: unknown) {
  const message = readMessage(body) ?? fallbackMessage(status);
  const code =
    typeof body === 'object' && body !== null && 'code' in body &&
    typeof body.code === 'string'
      ? body.code
      : undefined;

  return new ApiError(message, status, code);
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof TypeError) {
    return new ApiError('Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.');
  }

  if (error instanceof Error) {
    return new ApiError(error.message || 'Ocorreu um erro inesperado na solicitação.');
  }

  return new ApiError('Ocorreu um erro inesperado na solicitação.');
}
