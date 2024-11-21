import WinkRequest from '@/api/request';
import {
  CreateRecruitRequest,
  GetApplicationResponse,
  GetApplicationsResponse,
  GetRecruitResponse,
  GetRecruitsResponse,
} from '@/api/type/domain/recruit';

export default class AdminRecruit {
  constructor(private readonly request: WinkRequest) {}

  public async getRecruits(): Promise<GetRecruitsResponse> {
    return this.request.get('/admin/recruit');
  }

  public async createRecruit(data: CreateRecruitRequest): Promise<GetRecruitResponse> {
    return this.request.post('/admin/recruit', data);
  }

  public async getApplications(recruitId: string): Promise<GetApplicationsResponse> {
    return this.request.get(`/admin/recruit/${recruitId}`);
  }

  public async getApplication(
    recruitId: string,
    applicationId: string,
  ): Promise<GetApplicationResponse> {
    return this.request.get(`/admin/recruit/${recruitId}/${applicationId}`);
  }

  public async passApplication(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/${applicationId}/pass`);
  }

  public async failApplication(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/${applicationId}/fail`);
  }
}
