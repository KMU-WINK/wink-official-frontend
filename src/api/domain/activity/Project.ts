import { MemberType, WinkApiRequest } from '@/api';

export class Project {
  constructor(private readonly request: WinkApiRequest) {}

  public async getProject(
    data: GetProjectRequestDto,
  ): Promise<GetProjectResponseDto> {
    return this.request.get(
      '/activity/project/detail?projectId=' + data.projectId,
    );
  }

  public async getProjectsPage(): Promise<GetProjectsPageResponseDto> {
    return this.request.get('/activity/project/max');
  }

  public async getProjects(
    data: GetProjectsRequestDto,
  ): Promise<GetProjectsResponseDto> {
    return this.request.get('/activity/project?page=' + data.page);
  }

  public async searchProjects(
    data: SearchProjectsRequestDto,
  ): Promise<GetProjectsResponseDto> {
    return this.request.get('/activity/project/search?query=' + data.query);
  }
}

export class ProjectAdmin {
  constructor(private readonly request: WinkApiRequest) {}

  public async createProject(
    data: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    return this.request.put('/admin/activity/project', data);
  }

  public async updateProject(data: UpdateProjectRequestDto): Promise<void> {
    return this.request.patch('/admin/activity/project', data);
  }

  public async deleteProject(data: DeleteProjectRequestDto): Promise<void> {
    return this.request.delete('/admin/activity/project', data);
  }
}

//////////////////////////////////////////////////////////////////////////

export interface CreateProjectRequestDto {
  title: string;
  content: string;
  tags: string[];
  image: string;
}

export interface DeleteProjectRequestDto {
  projectId: string;
}

export interface GetProjectRequestDto {
  projectId: string;
}

export interface GetProjectsRequestDto {
  page: number;
}

export interface SearchProjectsRequestDto {
  query: string;
}

export interface UpdateProjectRequestDto {
  projectId: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
}

//////////////////////////////////////////////////////////////////////////

export interface CreateProjectResponseDto {
  project: ProjectType;
}

export interface GetProjectResponseDto {
  project: ProjectType;
}

export interface GetProjectsResponseDto {
  projects: ProjectType[];
}

export interface GetProjectsPageResponseDto {
  page: number;
}

//////////////////////////////////////////////////////////////////////////

export interface ProjectType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: 'Project' | 'Study' | 'Social';
  author: MemberType;
  title: string;
  content: string;
  tags: string[];
  image: string;
}
