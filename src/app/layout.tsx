'use client';

import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { WinkApiApplication } from '@/api';
import { Header, Footer } from '@/components';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const HIDE_FOOTER_PATHS = ['/login', '/signup'];

const RootLayout = ({ children }: RootLayoutProps) => {
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

          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
          />
        </WinkApiApplication>
      </body>
    </html>
  );
};

export default RootLayout;
