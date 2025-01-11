import WinkRequest from '@/api/request';
import {
  CreateApplicationRequest,
  GetApplicationResponse,
  GetApplicationsResponse,
  OauthLoginResponse,
  UpdateApplicationLoginRequest,
  UpdateApplicationRequest,
} from '@/api/type/domain/application';
import { UploadImageResponse } from '@/api/type/domain/program/upload';

export default class Application {
  constructor(private readonly request: WinkRequest) {}

  public async getApplications(): Promise<GetApplicationsResponse> {
    return this.request.get('/application');
  }

  public async getApplication(id: string): Promise<GetApplicationResponse> {
    return this.request.get(`/application/${id}`);
  }

  public async createApplication(data: CreateApplicationRequest): Promise<GetApplicationResponse> {
    return this.request.post('/application', data);
  }

  public async uploadImg(): Promise<UploadImageResponse> {
    return this.request.post('/application/img');
  }

  public async updateApplication(
    id: string,
    data: UpdateApplicationRequest,
  ): Promise<GetApplicationResponse> {
    return this.request.put(`/application/${id}`, data);
  }

  public async resetSecret(id: string): Promise<GetApplicationResponse> {
    return this.request.post(`/application/${id}/secret`);
  }

  public async updateApplicationLogin(
    id: string,
    data: UpdateApplicationLoginRequest,
  ): Promise<GetApplicationResponse> {
    return this.request.put(`/application/${id}/login`, data);
  }

  public async deleteApplication(id: string): Promise<void> {
    return this.request.delete(`/application/${id}`);
  }

  public async oauthLogin(id: string): Promise<OauthLoginResponse> {
    return this.request.post(`/application/${id}/oauth`);
  }
}
