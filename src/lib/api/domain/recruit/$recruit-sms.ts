import WinkRequest from '@/api/request';
import { GetRecruitSmsResponse, UpdateRecruitSmsRequest } from '@/api/type/domain/recruit';

export default class AdminRecruitSms {
  constructor(private readonly request: WinkRequest) {}

  public async getForms(recruitId: string): Promise<GetRecruitSmsResponse> {
    return this.request.get(`/admin/recruit/${recruitId}/sms`);
  }

  public async updateRecruitSms(
    recruitId: string,
    data: UpdateRecruitSmsRequest,
  ): Promise<GetRecruitSmsResponse> {
    return this.request.post(`/admin/recruit/${recruitId}/sms`, data);
  }
}
