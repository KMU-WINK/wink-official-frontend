'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useUserStore } from '@/store/user';

interface AnonymousGuardProps {
  children: ReactNode;
}

export default function AnonymousGuard({ children }: AnonymousGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  if (user) return null;

  return children;
}
