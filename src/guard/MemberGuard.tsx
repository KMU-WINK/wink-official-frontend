import React from 'react';

import { useRouter } from 'next/navigation';

import { useMemberStore } from '@/store';

interface MemberGuardProps {
  children: React.ReactNode;
}

export const MemberGuard: React.FC<MemberGuardProps> = ({ children }) => {
  const router = useRouter();

  const { member } = useMemberStore();

  if (!member) {
    router.back();

    return null;
  }

  return children;
};
