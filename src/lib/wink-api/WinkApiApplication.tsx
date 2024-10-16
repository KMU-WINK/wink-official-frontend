'use client';

import React, { useEffect } from 'react';

import useUserStore from '@/store/user';

import { WinkApi } from '@/lib/wink-api';

interface WinkApiApplicationProps {
  children: React.ReactNode;
}

export const WinkApiApplication: React.FC<WinkApiApplicationProps> = ({
  children,
}: WinkApiApplicationProps) => {
  const { fetching } = useUserStore();

  useEffect(() => {
    WinkApi.init();
  }, []);

  if (fetching) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-current border-e-transparent" />
      </div>
    );
  }

  return <>{children}</>;
};
