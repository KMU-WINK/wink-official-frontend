'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { WinkApiApplication } from '@/api';
import { Header, Footer } from '@/components';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const HIDE_FOOTER_PATHS = ['/login', '/signup'];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideFooter = HIDE_FOOTER_PATHS.includes(pathname);

  return (
    <html lang="ko">
      <head>
        <title>WINK: Web IN Kookmin</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <WinkApiApplication>
          <Header />
          {children}
          {!hideFooter && <Footer />}

          <ToastContainer />
        </WinkApiApplication>
      </body>
    </html>
  );
}
