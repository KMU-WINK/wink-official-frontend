import WinkRequest from '@/api/request';
import { GetProjectResponse, GetProjectsPageableResponse } from '@/api/type/domain/program/project';
import { CreateProjectRequest } from '@/api/type/domain/program/project';

export default class Project {
  constructor(private readonly request: WinkRequest) {}

  public async getProjects(
    page: number = 0,
    query: string = '',
  ): Promise<GetProjectsPageableResponse> {
    return this.request.get('/program/project', { params: { page, query } });
  }

  public async createProject(request: CreateProjectRequest): Promise<GetProjectResponse> {
    return this.request.post('/program/project', request);
  }

  public async updateProject(
    id: string,
    request: CreateProjectRequest,
  ): Promise<GetProjectResponse> {
    return this.request.put(`/program/project/${id}`, request);
  }

  public async deleteProject(id: string): Promise<void> {
    return this.request.delete(`/program/project/${id}`);
  }
}
