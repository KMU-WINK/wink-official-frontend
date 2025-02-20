import WinkRequest from '@/api/request';
import { CreateProjectRequest, GetProjectResponse } from '@/api/type/domain/program/project';

export default class AdminProject {
  constructor(private readonly request: WinkRequest) {}

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
