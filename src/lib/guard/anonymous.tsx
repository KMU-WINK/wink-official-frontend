'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useInitStore } from '@/store/init';
import { useUserStore } from '@/store/user';

import Loading from '@/app/loading';

interface AnonymousGuardProps {
  children: ReactNode;
}

export default function AnonymousGuard({ children }: AnonymousGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();
  const { isInit } = useInitStore();

  useEffect(() => {
    if (!isInit) return;
    if (user) {
      router.replace('/');
    }
  }, [isInit, user]);

  if (!isInit || user) return <Loading />;

  return children;
}
