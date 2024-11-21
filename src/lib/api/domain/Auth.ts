import WinkRequest from '@/api/request';
import {
  CheckRegisterRequest,
  CheckRegisterResponse,
  CheckResetPasswordRequest,
  CheckResetPasswordResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RegisterRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
} from '@/api/type/domain/auth';
import { UserResponse } from '@/api/type/domain/user';

export default class Auth {
  constructor(private readonly request: WinkRequest) {}

  public async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request.post('/auth/login', data);
  }

  public async refresh(data: RefreshRequest): Promise<LoginResponse> {
    return this.request.post('/auth/refresh-token', data);
  }

  public async register(data: RegisterRequest): Promise<void> {
    return this.request.post('/auth/register', data);
  }

  public async checkRegister(data: CheckRegisterRequest): Promise<CheckRegisterResponse> {
    return this.request.post('/auth/register/check', data);
  }

  public async requestResetPassword(data: RequestResetPasswordRequest): Promise<void> {
    return this.request.post('/auth/reset-password/request', data);
  }

  public async checkResetPassword(
    data: CheckResetPasswordRequest,
  ): Promise<CheckResetPasswordResponse> {
    return this.request.post('/auth/reset-password/check', data);
  }

  public async resetPassword(data: ResetPasswordRequest): Promise<void> {
    return this.request.post('/auth/reset-password', data);
  }

  public async me(): Promise<UserResponse> {
    return this.request.get('/auth/me');
  }
}
