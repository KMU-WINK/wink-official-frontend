import WinkRequest from '@/api/request';
import {
  AdminPreUserResponse,
  AdminPreUsersResponse,
  AdminUsersResponse,
  InviteRequest,
  UpdateRequest,
  UserResponse,
} from '@/api/type/domain/user';

export default class AdminUser {
  constructor(private readonly request: WinkRequest) {}

  public async getUsers(page: number, query: string): Promise<AdminUsersResponse> {
    return this.request.get(`/admin/user?page=${page}&query=${query}`);
  }

  public async getPreUsers(page: number, query: string): Promise<AdminPreUsersResponse> {
    return this.request.get(`/admin/user/pre-user?page=${page}&query=${query}`);
  }

  public async invite(data: InviteRequest): Promise<AdminPreUserResponse> {
    return this.request.post('/admin/user', data);
  }

  public async removePreUser(id: string): Promise<void> {
    return this.request.delete(`/admin/user/pre-user/${id}`);
  }

  public async update(id: string, data: UpdateRequest): Promise<UserResponse> {
    return this.request.put(`/admin/user/${id}`, data);
  }
}
