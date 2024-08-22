import { Cookies } from 'react-cookie';

import { RefreshResponseDto, User } from '@/api';

import { useUserStore } from '@/store';

interface WinkRawApiResponse<T> {
  code: number;
  error: boolean;
  content: string | T;
}

export class WinkApiContent<T> {
  public constructor(private readonly content: string | T) {}

  public unwrap(): T {
    return this.content as T;
  }

  public unwrapError(): string {
    return this.content as string;
  }
}

export class WinkApiResponse<T> {
  private readonly _code: number;
  private readonly _error: boolean;
  private readonly _content: WinkApiContent<T>;

  constructor(code: number, error: boolean, content: string | T) {
    this._code = code;
    this._error = error;
    this._content = new WinkApiContent(content);
  }

  public get code(): number {
    return this._code;
  }

  public get error(): boolean {
    return this._error;
  }

  public get content(): WinkApiContent<T> {
    return this._content;
  }
}

export class WinkApiRequest {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private readonly cookies = new Cookies();

  public constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const accessToken: string | null = this.cookies.get('accessToken');
    const refreshToken: string | null = this.cookies.get('refreshToken');

    if (accessToken && refreshToken) {
      this.setToken(accessToken, refreshToken);
    }
  }

  private async request<T>(url: string, options: RequestInit): Promise<WinkApiResponse<T>> {
    const response = await fetch(`http://localhost:3000/api${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const apiResponse: WinkRawApiResponse<T> = await response.json();

    if (
      apiResponse.error &&
      apiResponse.content === '접근 토큰이 만료되었습니다.' &&
      (await this.refresh())
    ) {
      return this.request(url, options);
    }

    return new WinkApiResponse(apiResponse.code, apiResponse.error, apiResponse.content);
  }

  private async refresh(): Promise<boolean> {
    const refreshResponse: WinkApiResponse<RefreshResponseDto> = await this.post('/auth/refresh', {
      refreshToken: this.refreshToken,
    });

    if (!refreshResponse.error) {
      return false;
    }

    const { accessToken, refreshToken } = refreshResponse.content.unwrap();

    this.setToken(accessToken, refreshToken);

    return true;
  }

  public async get<T>(url: string): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: 'GET' });
  }

  public async post<T>(url: string, body?: object): Promise<WinkApiResponse<T>> {
    return this.request(url, {
      method: 'POST',
      body: body && JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body?: object): Promise<WinkApiResponse<T>> {
    return this.request(url, {
      method: 'PUT',
      body: body && JSON.stringify(body),
    });
  }

  public async patch<T>(url: string, body?: object): Promise<WinkApiResponse<T>> {
    return this.request(url, {
      method: 'PATCH',
      body: body && JSON.stringify(body),
    });
  }

  public async delete<T>(url: string): Promise<WinkApiResponse<T>> {
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
      if (response.error) {
        this.cookies.remove('accessToken');
        this.cookies.remove('refreshToken');
        return;
      }

      useUserStore.setState({ user: response.content.unwrap() as User });
    });
  }
}
