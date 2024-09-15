import {
  CommonAdmin,
  Project,
  ProjectAdmin,
  Social,
  SocialAdmin,
  Study,
  StudyAdmin,
  WinkApiRequest,
} from '@/api';

export class Activity {
  constructor(private readonly request: WinkApiRequest) {}

  private readonly commonAdmin: CommonAdmin = new CommonAdmin(this.request);
  private readonly project: Project = new Project(this.request);
  private readonly projectAdmin: ProjectAdmin = new ProjectAdmin(this.request);
  private readonly study: Study = new Study(this.request);
  private readonly studyAdmin: StudyAdmin = new StudyAdmin(this.request);
  private readonly social: Social = new Social(this.request);
  private readonly socialAdmin: SocialAdmin = new SocialAdmin(this.request);

  public get CommonAdmin() {
    return this.commonAdmin;
  }

  public get Project() {
    return this.project;
  }

  public get ProjectAdmin() {
    return this.projectAdmin;
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

  public get SocialAdmin() {
    return this.socialAdmin;
  }
}
