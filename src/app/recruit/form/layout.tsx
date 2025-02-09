'use client';

import { ReactNode } from 'react';

import AnonymousGuard from '@/guard/anonymous';

interface RecruitApplicationLayoutProps {
  children: ReactNode;
}

export default function RecruitApplicationLayout({ children }: RecruitApplicationLayoutProps) {
  return (
    <AnonymousGuard>
      <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 pb-10 space-y-10">
        {children}
      </div>
    </AnonymousGuard>
  );
}
