'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { isAdmin } from '@/api/type/schema/user';

import { useInitStore } from '@/store/init';
import { useUserStore } from '@/store/user';

import { nowPath } from '@/util';

import Loading from '@/app/loading';

import { toast } from 'sonner';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();
  const { isInit } = useInitStore();

  useEffect(() => {
    if (!isInit) return;

    if (!user) {
      router.replace(`/auth/login?next=${encodeURIComponent(nowPath())}`);
    } else if (!isAdmin(user.role)) {
      router.replace('/');
      toast.error('권한이 없습니다.');
    }
  }, [isInit, user]);

  if (!isInit || !isAdmin(user?.role)) return <Loading />;

  return children;
}
