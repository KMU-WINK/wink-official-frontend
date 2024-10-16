import React from 'react';

import WebInKookmin from '@/app/auth/_components/WebInKookmin';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-36">
      <WebInKookmin />
      {children}
    </div>
  );
}
