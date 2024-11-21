import WinkRequest from '@/api/request';
import {
  CreateActivityRequest,
  GetActivitiesPageableResponse,
  GetActivityResponse,
} from '@/api/type/domain/program/activity';

export default class AdminActivity {
  constructor(private readonly request: WinkRequest) {}

  public async getActivities(
    page: number = 0,
    query: string = '',
  ): Promise<GetActivitiesPageableResponse> {
    return this.request.get('/admin/program/activity', { params: { page, query } });
  }

  public async createActivity(request: CreateActivityRequest): Promise<GetActivityResponse> {
    return this.request.post('/admin/program/activity', request);
  }

  public async updateActivity(
    id: string,
    request: CreateActivityRequest,
  ): Promise<GetActivityResponse> {
    return this.request.put(`/admin/program/activity/${id}`, request);
  }

  public async deleteActivity(id: string): Promise<void> {
    return this.request.delete(`/admin/program/activity/${id}`);
  }

  public async pinActivity(id: string): Promise<GetActivityResponse> {
    return this.request.patch(`/admin/program/activity/${id}/pin`);
  }

  public async unpinActivity(id: string): Promise<GetActivityResponse> {
    return this.request.delete(`/admin/program/activity/${id}/pin`);
  }
}
