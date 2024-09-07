import { Cookies } from 'react-cookie';

import { RefreshResponseDto, User } from '@/api';

import { useUserStore } from '@/store';
import { toast } from 'react-toastify';

interface WinkRawApiResponse<T> {
  code: number;
  error: boolean;
  content: string | T;
}

export class WinkApiRequest {
  private readonly baseUrl: string = 'http://localhost:3000';

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private readonly cookies = new Cookies();

  public constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.baseUrl = window.origin;

    const accessToken: string | null = this.cookies.get('accessToken');
    const refreshToken: string | null = this.cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      this.setToken(accessToken, refreshToken);
    }
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const apiResponse: WinkRawApiResponse<T> = await response.json();

    if (
      apiResponse.error &&
      apiResponse.content === 'Refresh Token이 만료되었습니다.' &&
      (await this.refresh())
    ) {
      return this.request(url, options);
    } else {
      this.removeToken();
    }

    if (apiResponse.error) {
      toast.error(apiResponse.content as string);

      throw new Error(`${url} [${apiResponse.code}] ${apiResponse.content}`);
    }

    return apiResponse.content as T;
  }

  private async refresh(): Promise<boolean> {
    try {
      const { accessToken, refreshToken } = await this.post<RefreshResponseDto>('/auth/refresh', {
        refreshToken: this.refreshToken,
      });

      this.setToken(accessToken, refreshToken);

      return true;
    } catch (_) {
      return false;
    }
  }

  public async get<T>(url: string): Promise<T> {
    return this.request(url, { method: 'GET' });
  }

  public async post<T>(url: string, body?: object): Promise<T> {
    return this.request(url, {
      method: 'POST',
      body: body && JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body?: object): Promise<T> {
    return this.request(url, {
      method: 'PUT',
      body: body && JSON.stringify(body),
    });
  }

  public async patch<T>(url: string, body?: object): Promise<T> {
    return this.request(url, {
      method: 'PATCH',
      body: body && JSON.stringify(body),
    });
  }

  public async delete<T>(url: string): Promise<T> {
    return this.request(url, { method: 'DELETE' });
  }

  public setToken(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') {
      throw new Error('This method is only available in the browser.');
    }

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.cookies.set('accessToken', accessToken, {
      path: '/',
      expires: new Date(9999, 11, 31),
    });
    this.cookies.set('refreshToken', refreshToken, {
      path: '/',
      expires: new Date(9999, 11, 31),
    });

    this.updateUser();
  }

  public removeToken() {
    if (typeof window === 'undefined') {
      throw new Error('This method is only available in the browser.');
    }

    this.accessToken = null;
    this.refreshToken = null;

    this.cookies.remove('accessToken');
    this.cookies.remove('refreshToken');

    this.updateUser();
  }

  private updateUser() {
    if (this.accessToken === null) {
      useUserStore.setState({ user: null });
      return;
    }

    this.get('/auth/me').then((response) => {
      try {
        useUserStore.setState({ user: response as User });
      } catch (_) {
        this.removeToken();
      }
    });
  }
}
