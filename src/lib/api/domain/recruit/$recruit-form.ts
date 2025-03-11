import WinkRequest from '@/api/request';
import { GetFormsResponse } from '@/api/type/domain/recruit';

export default class AdminRecruitForm {
  constructor(private readonly request: WinkRequest) {}

  public async getForms(recruitId: string): Promise<GetFormsResponse> {
    return this.request.get(`/admin/recruit/${recruitId}/form`);
  }

  public async paperClear(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/paper/clear`);
  }

  public async paperPass(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/paper/pass`);
  }

  public async paperFail(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/paper/fail`);
  }

  public async finalizePaper(recruitId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/paper/finalize`);
  }

  public async interviewClear(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/interview/clear`);
  }

  public async interviewPass(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/interview/pass`);
  }

  public async interviewFail(recruitId: string, formId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/${formId}/interview/fail`);
  }

  public async finalizeInterview(recruitId: string): Promise<void> {
    return this.request.post(`/admin/recruit/${recruitId}/form/interview/finalize`);
  }
}
