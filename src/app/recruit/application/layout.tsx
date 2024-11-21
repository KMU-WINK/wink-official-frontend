'use client';

import { ReactNode } from 'react';

import AnonymousGuard from '@/guard/anonymous';

interface RecruitApplicationLayoutProps {
  children: ReactNode;
}

export default function RecruitApplicationLayout({ children }: RecruitApplicationLayoutProps) {
  return <AnonymousGuard>{children}</AnonymousGuard>;
}
