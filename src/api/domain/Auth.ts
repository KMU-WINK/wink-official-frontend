import { MyInfoLinks, RoleString } from "@/api/domain/Member";
import { WinkApiRequest, WinkApiResponse } from "@/api/request";

export class Auth {
  constructor(private readonly request: WinkApiRequest) {}

  public async login(
    data: LoginRequestDto,
  ): Promise<WinkApiResponse<LoginResponseDto>> {
    return this.request.post("/auth/login", data);
  }

  public async refresh(
    data: RefreshRequestDto,
  ): Promise<WinkApiResponse<RefreshResponseDto>> {
    return this.request.post("/auth/refresh", data);
  }

  public async register(
    data: RegisterRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.post("/auth/register", data);
  }

  public async sendCode(
    data: SendCodeRequestDto,
  ): Promise<WinkApiResponse<void>> {
    return this.request.post("/auth/register/code", data);
  }

  public async verifyCode(
    data: VerifyCodeRequestDto,
  ): Promise<WinkApiResponse<VerifyCodeResponseDto>> {
    return this.request.post("/auth/register/code/verify", data);
  }

  public async myInfo(): Promise<WinkApiResponse<MyInfoResponseDto>> {
    return this.request.get("/auth/me");
  }
}

//////////////////////////////////////////////////////////////////////////

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RefreshRequestDto {
  refreshToken: string;
}

export interface RegisterRequestDto {
  name: string;
  studentId: string;
  password: string;
  verifyToken: string;
}

export interface SendCodeRequestDto {
  email: string;
}

export interface VerifyCodeRequestDto {
  email: string;
  code: string;
}

//////////////////////////////////////////////////////////////////////////

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyCodeResponseDto {
  verifyToken: string;
}

export interface MyInfoResponseDto {
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  studentId: string;
  email: string;
  avatar: string | null;
  description: string | null;
  link: MyInfoLinks;
  role: RoleString | null;
  fee: boolean;
}
