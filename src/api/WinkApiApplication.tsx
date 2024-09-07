'use client';

import React, { useEffect } from 'react';

import { Loading } from '@/components';

import { WinkApi } from '@/api';

import { useApplicationState } from '@/store';

interface WinkApiApplicationProps {
  children: React.ReactNode;
}

export const WinkApiApplication: React.FC<WinkApiApplicationProps> = ({
  children,
}: WinkApiApplicationProps) => {
  const { loaded } = useApplicationState();

  useEffect(() => {
    WinkApi.init();
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return <>{children}</>;
};
