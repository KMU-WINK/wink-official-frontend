import { Activity, Auth, Member, MemberAdmin, WinkApiRequest } from '@/api';

export class WinkApi {
  private static instance: WinkApi | null = null;

  private readonly request = new WinkApiRequest();

  private readonly auth: Auth = new Auth(this.request);
  private readonly member: Member = new Member(this.request);
  private readonly memberAdmin: MemberAdmin = new MemberAdmin(this.request);
  private readonly activity: Activity = new Activity(this.request);

  private constructor() {
    if (WinkApi.instance !== null) {
      throw new Error('WinkApi is already initialized');
    }

    WinkApi.instance = this;
  }

  private static get Instance(): WinkApi {
    if (WinkApi.instance === null) {
      throw new Error('WinkApi is not initialized');
    }

    return WinkApi.instance!;
  }

  public static init(): void {
    if (WinkApi.instance !== null) {
      return;
    }

    new WinkApi();
  }

  public static get Request(): WinkApiRequest {
    return WinkApi.Instance.request;
  }

  public static get Auth(): Auth {
    return WinkApi.Instance.auth;
  }

  public static get Member(): Member {
    return WinkApi.Instance.member;
  }

  public static get MemberAdmin(): MemberAdmin {
    return WinkApi.Instance.memberAdmin;
  }

  public static get Activity(): Activity {
    return WinkApi.Instance.activity;
  }
}
