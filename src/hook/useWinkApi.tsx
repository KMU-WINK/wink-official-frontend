import { useEffect, useState } from 'react';

interface WinkApiHookResponse<T> {
  fetching: boolean;
  content: T;
}

export const useWinkApi = <T,>(result: Promise<T>): WinkApiHookResponse<T> => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [content, setContent] = useState<T>({} as T);

  useEffect(() => {
    result.then((response) => {
      setContent(response);
      setFetching(false);
    });
  }, []);

  return { fetching, content };
};
