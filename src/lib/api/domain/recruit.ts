import WinkRequest from '@/api/request';
import {
  DuplicationCheckResponse,
  EmailCheckRequest,
  GetRecruitResponse,
  PhoneNumberCheckRequest,
  RecruitFormRequest,
  StudentIdCheckRequest,
} from '@/api/type/domain/recruit';

export default class Recruit {
  constructor(private readonly request: WinkRequest) {}

  public async getLatestRecruit(): Promise<GetRecruitResponse> {
    return this.request.get('/recruit/latest');
  }

  public async recruitForm(recruitId: string, data: RecruitFormRequest): Promise<void> {
    return this.request.post(`/recruit/${recruitId}`, data);
  }

  public async checkStudentId(
    recruitId: string,
    data: StudentIdCheckRequest,
  ): Promise<DuplicationCheckResponse> {
    return this.request.post(`/recruit/${recruitId}/check/studentId`, data);
  }

  public async checkEmail(
    recruitId: string,
    data: EmailCheckRequest,
  ): Promise<DuplicationCheckResponse> {
    return this.request.post(`/recruit/${recruitId}/check/email`, data);
  }

  public async checkPhoneNumber(
    recruitId: string,
    data: PhoneNumberCheckRequest,
  ): Promise<DuplicationCheckResponse> {
    return this.request.post(`/recruit/${recruitId}/check/phoneNumber`, data);
  }
}
