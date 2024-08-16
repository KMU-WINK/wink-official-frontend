import { Auth, Member, Activity, MemberAdmin } from "@/api/domain";
import { WinkApiRequest, WinkApiResponse } from "@/api/util";

export class WinkApi {
  private static instance: WinkApi | null = null;

  private readonly request = new WinkApiRequest();

  private readonly auth: Auth = new Auth(this.request);
  private readonly member: Member = new Member(this.request);
  private readonly memberAdmin: MemberAdmin = new MemberAdmin(this.request);
  private readonly activity: Activity = new Activity(this.request);

  private constructor() {}

  private static get Instance(): WinkApi {
    if (WinkApi.instance === null) {
      WinkApi.instance = new WinkApi();
    }

    return WinkApi.instance;
  }

  public static setToken(accessToken: string, refreshToken: string): void {
    WinkApi.Instance.request.setToken(accessToken, refreshToken);
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
