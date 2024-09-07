import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { RefreshResponseDto, User } from '@/api';

import { useUserStore, useApplicationState } from '@/store';

interface WinkRawApiResponse<T> {
  code: number;
  error: boolean;
  content: string | T;
}

export class WinkApiRequest {
  private readonly baseUrl: string = 'http://localhost:3000';

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  public constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.baseUrl = window.origin;

    const accessToken: string | undefined = Cookies.get('accessToken');
    const refreshToken: string | undefined = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      this.setToken(accessToken, refreshToken);
    } else {
      useApplicationState.setState({ loaded: true });
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
      this.removeToken();

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

    Cookies.set('accessToken', accessToken, { expires: (1 / 24 / 60) * 15 });
    Cookies.set('refreshToken', refreshToken, { expires: 30 });

    this.updateUser();
  }

  public removeToken() {
    if (typeof window === 'undefined') {
      throw new Error('This method is only available in the browser.');
    }

    this.accessToken = null;
    this.refreshToken = null;

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    this.updateUser();
  }

  private updateUser() {
    if (!this.accessToken) {
      useUserStore.setState({ user: null });
      return;
    }

    this.get('/auth/me').then((user) => {
      useUserStore.setState({ user: user as User });

      if (!useApplicationState.getState().loaded) {
        useApplicationState.setState({ loaded: true });
      }
    });
  }
}
