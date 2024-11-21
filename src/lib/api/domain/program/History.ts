import WinkRequest from '@/api/request';
import { GetHistoriesResponse } from '@/api/type/domain/program/history';

export default class History {
  constructor(private readonly request: WinkRequest) {}

  public async getHistories(): Promise<GetHistoriesResponse> {
    return this.request.get('/program/history');
  }
}
