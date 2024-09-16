import React from 'react';

import { useRouter } from 'next/navigation';

import { useMemberStore } from '@/store';

const PERMIT_ROLES = [
  'PRESIDENT',
  'VICE_PRESIDENT',
  'TREASURY_HEAD',
  'TREASURY_ASSISTANT',
  'PUBLIC_RELATIONS_HEAD',
  'PUBLIC_RELATIONS_ASSISTANT',
  'PLANNING_HEAD',
  'PLANNING_ASSISTANT',
];

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const router = useRouter();

  const { member } = useMemberStore();

  if (!member || !PERMIT_ROLES.includes(member.role)) {
    router.back();

    return null;
  }

  return children;
};
