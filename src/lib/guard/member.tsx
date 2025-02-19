'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useInitStore } from '@/store/init';
import { useUserStore } from '@/store/user';

import { nowPath } from '@/util';

import Loading from '@/app/loading';

interface MemberGuardProps {
  children: ReactNode;
}

export default function MemberGuard({ children }: MemberGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();
  const { isInit } = useInitStore();

  useEffect(() => {
    if (!isInit) return;
    if (!user) {
      router.replace(`/auth/login?next=${encodeURIComponent(nowPath())}`);
    }
  }, [isInit, user]);

  if (!isInit || !user) return <Loading />;

  return children;
}
