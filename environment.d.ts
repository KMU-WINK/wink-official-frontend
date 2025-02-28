declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
      NEXT_PUBLIC_KAKAO_TEMPLATE_ID: string;
    }
  }

  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export {};
