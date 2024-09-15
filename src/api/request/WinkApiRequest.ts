import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { RefreshResponseDto, MyInfoResponseDto } from '@/api';

import { useMemberStore, useApplicationState } from '@/store';

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
    const response = await fetch(`${this.baseUrl}/api${url}`, options);

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

  public async get<T>(url: string, body?: object | FormData): Promise<T> {
    return this.request(url, {
      method: 'GET',
      body: this.generateBody(body),
      headers: this.generateHeaders(body),
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

  public setToken(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') {
      throw new Error('This method is only available in the browser.');
    }

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    Cookies.set('accessToken', accessToken, { expires: (1 / 24 / 60) * 15 });
    Cookies.set('refreshToken', refreshToken, { expires: 30 });

    this.updateMember();
  }

  public removeToken() {
    if (typeof window === 'undefined') {
      throw new Error('This method is only available in the browser.');
    }

    this.accessToken = null;
    this.refreshToken = null;

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    this.updateMember();
  }

  private updateMember() {
    if (!this.accessToken) {
      useMemberStore.setState({ member: null });
      return;
    }

    (async () => {
      const response: MyInfoResponseDto = await this.get('/auth/me');
      const { member } = response;

      useMemberStore.setState({ member });

      if (!useApplicationState.getState().loaded) {
        useApplicationState.setState({ loaded: true });
      }
    })();
  }

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
