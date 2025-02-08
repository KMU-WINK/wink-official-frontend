import WinkRequest from '@/api/request';
import {
  CreateRecruitRequest,
  FinalizePaperRequest,
  GetFormsResponse,
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

  public async deleteRecruit(recruitId: string): Promise<GetRecruitResponse> {
    return this.request.delete(`/admin/recruit/${recruitId}`);
  }

  public async finalizePaper(recruitId: string, data: FinalizePaperRequest): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/finalize/paper`, data);
  }

  public async finalizeInterview(recruitId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/finalize/interview`);
  }

  public async getForms(recruitId: string): Promise<GetFormsResponse> {
    return this.request.get(`/admin/recruit/${recruitId}/form`);
  }

  public async paperPass(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/pass/paper`);
  }

  public async paperFail(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/fail/paper`);
  }

  public async interviewPass(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/pass/interview`);
  }

  public async interviewFail(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/fail/interview`);
  }
}
