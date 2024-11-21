'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/about-us/wink');
  }, []);

  return null;
}
