import WinkRequest from '@/api/request';
import { CreateHistoryRequest, GetHistoryResponse } from '@/api/type/domain/program/history';

export default class AdminHistory {
  constructor(private readonly request: WinkRequest) {}

  public async createHistory(data: CreateHistoryRequest): Promise<GetHistoryResponse> {
    return this.request.post('/admin/program/history', data);
  }

  public async updateHistory(id: string, data: CreateHistoryRequest): Promise<GetHistoryResponse> {
    return this.request.put(`/admin/program/history/${id}`, data);
  }

  public async deleteHistory(id: string): Promise<void> {
    return this.request.delete(`/admin/program/history/${id}`);
  }
}
