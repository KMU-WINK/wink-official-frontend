import ApiResponse from '@/api/type/api-response';
import { LoginResponse } from '@/api/type/domain/Auth';
import { UserResponse } from '@/api/type/domain/User';

import { useUserStore } from '@/store/user';

import { toast } from 'sonner';

export default class WinkRequest {
  private readonly baseUrl?: string;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  public constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.baseUrl = window.origin;
  }

  public async setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const response = await this.get<UserResponse>('/auth/me');

    if (response === null) {
      this.removeToken();
    } else {
      useUserStore.getState().setUser(response.user);
    }
  }

  public removeToken() {
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    useUserStore.getState().setUser(null);
  }

  private async refresh(): Promise<boolean> {
    try {
      const { accessToken, refreshToken } = await this.post<LoginResponse>('/auth/refresh', {
        refreshToken: this.refreshToken,
      });

      await this.setToken(accessToken, refreshToken);

      return true;
    } catch (_) {
      this.removeToken();

      return false;
    }
  }

  // ############################################################

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response: ApiResponse<T> = await (
      await fetch(`${this.baseUrl}/api${url}`, options)
    ).json();

    if (response.error === '엑세스 토큰이 만료되었습니다.') {
      this.removeToken();

      if (!(await this.refresh())) return null as T;

      const headers = options.headers as Headers;
      headers.set('Authorization', `Bearer ${this.accessToken}`);

      return this.request(url, {
        ...options,
        headers,
      });
    }

    if (url === '/auth/me' && response.error === '인증에 실패하였습니다.') {
      this.removeToken();
      return null as T;
    }

    if (response.error) {
      toast.error(response.error);
      throw new Error(`${url} [${response.statusCode}] ${response.error}`);
    }

    return response.content!;
  }

  public async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    return this.request(url, {
      method: 'GET',
      headers: this.generateHeaders(),
      ...options,
    });
  }

  public async post<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async put<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PUT',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async patch<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  public async delete<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'DELETE',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
    });
  }

  // ############################################################

  private generateBody(body?: object | FormData): string | FormData | null {
    if (!body) {
      return null;
    }

    if (body instanceof FormData) {
      return body;
    }

    return JSON.stringify(body);
  }

  private generateHeaders(body?: object | FormData): Headers {
    const headers = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    if (this.accessToken) {
      headers.set('Authorization', `Bearer ${this.accessToken}`);
    }

    if (body && body instanceof FormData) {
      headers.delete('Content-Type');
    }

    return headers;
  }
}
