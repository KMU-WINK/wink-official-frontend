import WinkRequest from '@/api/request';
import {
  UpdateMyAvatarResponse,
  UpdateMyInfoRequest,
  UpdateMyPasswordRequest,
  UserResponse,
  UsersResponse,
} from '@/api/type/domain/user';

export default class User {
  constructor(private readonly request: WinkRequest) {}

  public async getUsers(): Promise<UsersResponse> {
    return this.request.get('/user');
  }

  public async updateMyInfo(data: UpdateMyInfoRequest): Promise<UserResponse> {
    return this.request.put('/user/info', data);
  }

  public async updateMyAvatar(): Promise<UpdateMyAvatarResponse> {
    return this.request.post('/user/avatar');
  }

  public async deleteMyAvatar(): Promise<UserResponse> {
    return this.request.delete('/user/avatar');
  }

  public async updateMyPassword(data: UpdateMyPasswordRequest): Promise<void> {
    return this.request.put('/user/password', data);
  }
}
