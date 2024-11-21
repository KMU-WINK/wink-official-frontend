import WinkRequest from '@/api/request';
import { GetProjectResponse, GetProjectsPageableResponse } from '@/api/type/domain/program/project';
import { CreateProjectRequest } from '@/api/type/domain/program/project';

export default class AdminProject {
  constructor(private readonly request: WinkRequest) {}

  public async getProjects(
    page: number = 0,
    query: string = '',
  ): Promise<GetProjectsPageableResponse> {
    return this.request.get('/admin/program/project', { params: { page, query } });
  }

  public async getProject(id: string): Promise<GetProjectResponse> {
    return this.request.get(`/admin/program/project/${id}`);
  }

  public async createProject(request: CreateProjectRequest): Promise<GetProjectResponse> {
    return this.request.post('/admin/program/project', request);
  }

  public async updateProject(
    id: string,
    request: CreateProjectRequest,
  ): Promise<GetProjectResponse> {
    return this.request.put(`/admin/program/project/${id}`, request);
  }

  public async deleteProject(id: string): Promise<void> {
    return this.request.delete(`/admin/program/project/${id}`);
  }
}
