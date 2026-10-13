export type ApiMethod = 'GET' | 'POST';

export interface ApiResponse {
  status: number;
  body: unknown;
}

export interface ApiRequestOptions {
  method?: ApiMethod;
  body?: FormData;
}

export interface ApiTransport {
  request(path: string, method: ApiMethod, body?: FormData): Promise<ApiResponse>;
}
