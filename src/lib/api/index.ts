import AdminRecruit from '@/api/domain/$recruit';
import AdminUser from '@/api/domain/$user';
import Application from '@/api/domain/application';
import Auth from '@/api/domain/auth';
import AdminActivity from '@/api/domain/program/$activity';
import AdminHistory from '@/api/domain/program/$history';
import AdminProject from '@/api/domain/program/$project';
import Activity from '@/api/domain/program/activity';
import History from '@/api/domain/program/history';
import Project from '@/api/domain/program/project';
import Study from '@/api/domain/program/study';
import Upload from '@/api/domain/program/upload';
import Recruit from '@/api/domain/recruit';
import User from '@/api/domain/user';
import WinkRequest from '@/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new WinkRequest();

  private readonly domain = {
    Auth: new Auth(this.request),
    User: new User(this.request),
    AdminUser: new AdminUser(this.request),
    Recruit: new Recruit(this.request),
    AdminRecruit: new AdminRecruit(this.request),
    Program: {
      Activity: new Activity(this.request),
      AdminActivity: new AdminActivity(this.request),
      History: new History(this.request),
      AdminHistory: new AdminHistory(this.request),
      Project: new Project(this.request),
      AdminProject: new AdminProject(this.request),
      Study: new Study(this.request),
      Upload: new Upload(this.request),
    },
    Application: new Application(this.request),
  };

  private constructor() {
    Api.instance = this;
  }

  private static get Instance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance!;
  }

  public static get Domain() {
    return Api.Instance.domain;
  }

  public static get Request(): WinkRequest {
    return Api.Instance.request;
  }
}
