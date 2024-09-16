import React from 'react';

import { useRouter } from 'next/navigation';

import { useApplicationState, useMemberStore } from '@/store';

interface MemberGuardProps {
  children: React.ReactNode;
}

export const MemberGuard: React.FC<MemberGuardProps> = ({ children }) => {
  const router = useRouter();

  const { refreshing } = useApplicationState();
  const { member } = useMemberStore();

  if (!refreshing && !member) {
    router.back();

    return null;
  }

  return children;
};
