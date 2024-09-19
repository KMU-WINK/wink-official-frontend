'use client';

import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { usePathname } from 'next/navigation';

import { Footer, Header } from '@/component';

import { WinkApiApplication } from '@/api';

import '@/style/globals.css';

import 'aos/dist/aos.css';
import 'aos/dist/aos.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const HIDE_FOOTER_PATHS = ['/auth', '/admin'];

const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();

  const hideFooter = HIDE_FOOTER_PATHS.some((path) => pathname.startsWith(path));

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
