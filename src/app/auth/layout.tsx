'use client';

import React from 'react';

import { AnonymousGuard } from '@/guard';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AnonymousGuard>{children}</AnonymousGuard>;
};

export default AuthLayout;
