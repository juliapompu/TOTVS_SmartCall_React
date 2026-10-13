import { ApiError } from './apiErrors';
import { apiRequest } from './api';
import type {
  Company,
  UploadTranscriptionPayload,
  UploadTranscriptionResponse,
} from '../types/company';

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    return apiRequest<Company[]>('/companies');
  },

  async getCompanyById(id: number): Promise<Company | undefined> {
    try {
      return await apiRequest<Company>(`/companies/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return undefined;
      }
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
  },
};
