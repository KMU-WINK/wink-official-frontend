'use client';

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { cn } from '@/util';

interface ProgramLayoutProps {
  children: ReactNode;
}

const IGNORE_PADDING_URLS = ['/program/activity'];

export default function ProgramLayout({ children }: ProgramLayoutProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex flex-col items-center px-6 pt-20 sm:pt-28 space-y-10',
        IGNORE_PADDING_URLS.includes(pathname) ? 'px-0' : '',
      )}
    >
      {children}
    </div>
  );
}
