'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useUserStore } from '@/store/user';

import { nowPath } from '@/util';

interface MemberGuardProps {
  children: ReactNode;
}

export default function MemberGuard({ children }: MemberGuardProps) {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      router.replace(`/auth/login?next=${encodeURIComponent(nowPath())}`);
    }
  }, [user]);

  if (!user) return null;

  return children;
}
