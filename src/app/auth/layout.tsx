'use client';

import { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import WebInKookmin from '@/app/auth/_component/web-in-kookmin';

import AnonymousGuard from '@/guard/anonymous';

interface AuthLayoutProps {
  children: ReactNode;
}

const IGNORE_PATHS = ['/auth/register'];

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();

  return (
    <AnonymousGuard>
      <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 space-y-10">
        {!IGNORE_PATHS.includes(pathname) && (
          <div className="flex flex-col items-center space-y-1 text-neutral-600">
            <WebInKookmin />
            <p className="text-lg sm:text-xl text-center">
              국민대학교 소프트웨어융합대학 <br className="block sm:hidden" />
              유일무이 웹 동아리
            </p>
          </div>
        )}

        {children}
      </div>
    </AnonymousGuard>
  );
}
