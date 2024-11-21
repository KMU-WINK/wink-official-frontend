import WinkRequest from '@/api/request';

export default class AdminProject {
  constructor(private readonly request: WinkRequest) {}

  public async deleteProject(id: string): Promise<void> {
    return this.request.delete(`/admin/program/project/${id}`);
  }
}
