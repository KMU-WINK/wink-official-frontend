import React from 'react';

import { Metadata } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';

import { WinkApiApplication } from '@/lib/wink-api';

import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'WINK',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <WinkApiApplication>
          <Header />
          <div className="mt-14 min-h-[calc(100vh-376px)]">{children}</div>
          <Footer />
        </WinkApiApplication>

        <Toaster />
      </body>
    </html>
  );
}
