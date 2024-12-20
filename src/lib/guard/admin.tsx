'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { isAdmin } from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (!isAdmin(user?.role)) {
      router.replace('/');
    }
  }, [user]);

  if (!isAdmin(user?.role)) return null;

  return children;
}
