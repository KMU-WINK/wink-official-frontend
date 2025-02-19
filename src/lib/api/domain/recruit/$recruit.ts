import WinkRequest from '@/api/request';
import {
  CreateRecruitRequest,
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
}
