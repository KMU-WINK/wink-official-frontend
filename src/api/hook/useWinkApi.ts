import { useEffect, useState } from 'react';

import { WinkApiContent, WinkApiResponse } from '@/api';

interface WinkApiHookResponse<T> {
  fetching: boolean;
  code: number;
  error: boolean;
  content: WinkApiContent<T>;
}

export function useWinkApi<T>(result: Promise<WinkApiResponse<T>>): WinkApiHookResponse<T> {
  const [fetching, setFetching] = useState<boolean>(true);
  const [code, setCode] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [content, setContent] = useState<WinkApiContent<T>>(new WinkApiContent<T>(''));

  useEffect(() => {
    result.then((response) => {
      setCode(response.code);
      setError(response.error);
      setContent(response.content);
      setFetching(false);
    });
  }, []);

  return { fetching, code, error, content };
}
