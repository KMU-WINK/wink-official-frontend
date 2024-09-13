import { Project, Social, Study, StudyAdmin, WinkApiRequest } from '@/api';

export class Activity {
  constructor(private readonly request: WinkApiRequest) {}

  private readonly project: Project = new Project(this.request);
  private readonly study: Study = new Study(this.request);
  private readonly studyAdmin: StudyAdmin = new StudyAdmin(this.request);
  private readonly social: Social = new Social(this.request);

  public get Project() {
    return this.project;
  }

  public get Study() {
    return this.study;
  }

  public get StudyAdmin() {
    return this.studyAdmin;
  }

  public get Social() {
    return this.social;
  }
}
