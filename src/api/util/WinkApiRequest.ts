import { RefreshResponseDto } from "@/api/domain";

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

  public constructor() {
    if (typeof window !== "undefined") {
      document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .map(([key, value]) => [key.trim(), value.trim()])
        .forEach(([key, value]) => {
          if (key === "accessToken") {
            this.accessToken = value;
          } else if (key === "refreshToken") {
            this.refreshToken = value;
          }
        });
    }
  }

  private async request<T>(
    url: string,
    options: RequestInit,
  ): Promise<WinkApiResponse<T>> {
    const response = await fetch(`http://localhost:3000/api${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const apiResponse: WinkRawApiResponse<T> = await response.json();

    if (
      apiResponse.error &&
      apiResponse.content === "접근 토큰이 만료되었습니다." &&
      (await this.refresh())
    ) {
      return this.request(url, options);
    }

    return new WinkApiResponse(
      apiResponse.code,
      apiResponse.error,
      apiResponse.content,
    );
  }

  private async refresh(): Promise<boolean> {
    const refreshResponse: WinkApiResponse<RefreshResponseDto> =
      await this.post("/auth/refresh", { refreshToken: this.refreshToken });

    if (!refreshResponse.error) {
      return false;
    }

    const { accessToken, refreshToken } = refreshResponse.content.unwrap();

    this.setToken(accessToken, refreshToken);

    return true;
  }

  public async get<T>(url: string): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: "GET" });
  }

  public async post<T>(url: string, body: any): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: "POST", body: JSON.stringify(body) });
  }

  public async put<T>(url: string, body: any): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: "PUT", body: JSON.stringify(body) });
  }

  public async patch<T>(url: string, body: any): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: "PATCH", body: JSON.stringify(body) });
  }

  public async delete<T>(url: string): Promise<WinkApiResponse<T>> {
    return this.request(url, { method: "DELETE" });
  }

  public setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    if (typeof window !== "undefined") {
      const permute = (key: string, value: string) =>
        `${key}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

      document.cookie = permute("accessToken", accessToken);
      document.cookie = permute("refreshToken", refreshToken);
    }
  }
}
