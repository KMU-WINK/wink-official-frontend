'use client';

import React, { useEffect } from 'react';

import { WinkApi } from '@/api';

interface WinkApiApplicationProps {
  children: React.ReactNode;
}

export const WinkApiApplication: React.FC<WinkApiApplicationProps> = ({
  children,
}: WinkApiApplicationProps) => {
  useEffect(() => {
    WinkApi.init();
  }, []);

  return <>{children}</>;
};
