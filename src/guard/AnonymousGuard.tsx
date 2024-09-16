import React from 'react';

import { useRouter } from 'next/navigation';

import { useMemberStore } from '@/store';

interface AnonymousGuardProps {
  children: React.ReactNode;
}

export const AnonymousGuard: React.FC<AnonymousGuardProps> = ({ children }) => {
  const router = useRouter();

  const { member } = useMemberStore();

  if (member) {
    router.back();

    return null;
  }

  return children;
};
