import WinkRequest from '@/api/request';
import {
  CreateRecruitRequest,
  FinalizePaperRequest,
  GetApplicationsResponse,
  GetRecruitResponse,
  GetRecruitsResponse,
} from '@/api/type/domain/recruit';

export default class AdminRecruit {
  constructor(private readonly request: WinkRequest) {}

  public async getRecruits(): Promise<GetRecruitsResponse> {
    return this.request.get('/admin/recruit');
  }

  public async getRecruit(recruitId: string): Promise<GetRecruitResponse> {
    return this.request.get(`/admin/recruit/${recruitId}`);
  }

  public async createRecruit(data: CreateRecruitRequest): Promise<GetRecruitResponse> {
    return this.request.post('/admin/recruit', data);
  }

  public async updateRecruit(
    recruitId: string,
    data: CreateRecruitRequest,
  ): Promise<GetRecruitResponse> {
    return this.request.put(`/admin/recruit/${recruitId}`, data);
  }

  public async deleteRecruit(recruitId: string): Promise<GetRecruitResponse> {
    return this.request.delete(`/admin/recruit/${recruitId}`);
  }

  public async finalizePaper(recruitId: string, data: FinalizePaperRequest): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/finalize/paper`, data);
  }

  public async finalizeInterview(recruitId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/finalize/interview`);
  }

  public async getApplications(recruitId: string): Promise<GetApplicationsResponse> {
    return this.request.get(`/admin/recruit/${recruitId}/application`);
  }

  public async paperPass(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/application/${applicationId}/pass/paper`);
  }

  public async paperFail(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/application/${applicationId}/fail/paper`);
  }

  public async interviewPass(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(
      `/admin/recruit/${recruitId}/application/${applicationId}/pass/interview`,
    );
  }

  public async interviewFail(recruitId: string, applicationId: string): Promise<void> {
    return this.request.post(
      `/admin/recruit/${recruitId}/application/${applicationId}/fail/interview`,
    );
  }
}
