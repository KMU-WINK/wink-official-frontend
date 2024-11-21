'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Role } from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

const ADMIN_ROLES = [
  Role.PRESIDENT,
  Role.VICE_PRESIDENT,
  Role.TREASURY_HEAD,
  Role.TREASURY_ASSISTANT,
  Role.PLANNING_HEAD,
  Role.PLANNING_ASSISTANT,
  Role.PUBLIC_RELATIONS_HEAD,
  Role.PUBLIC_RELATIONS_ASSISTANT,
];

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user || !ADMIN_ROLES.includes(user.role)) {
      router.replace('/');
    }
  }, [user]);

  if (!user || !ADMIN_ROLES.includes(user.role)) return null;

  return children;
}
