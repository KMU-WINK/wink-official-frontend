'use client';

import { ReactNode, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Toaster } from '@/ui/sonner';

import Footer from '@/layout/footer';
import Header from '@/layout/header';

import Api from '@/api';

import Loading from '@/app/loading';
import { cn } from '@/lib/util';
import '@/style/global.css';

interface RootLayoutProps {
  children: ReactNode;
}

const IGNORE_PATHS = ['/auth', '/recruit/application', '/admin'];

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken: string | null = localStorage.getItem('accessToken');
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        await Api.Request.setToken(accessToken, refreshToken);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <html lang="ko">
      <head>
        <title>WINK: Web IN Kookmin</title>
        <meta name="description" content="국민대학교 소프트웨어융합대학 웹 학술 동아리 WINK" />
        <meta name="keywords" content="국민대학교, WINK, 웹 개발, 웹 동아리, 국민대 웹 동아리" />
        <meta name="author" content="WINK - Web IN Kookmin" />
        <meta name="robots" content="index,nofollow" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />

        <meta property="og:url" content="https://wink.kookmin.ac.kr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web IN Kookmin" />
        <meta
          property="og:description"
          content="국민대학교 소프트웨어융합대학 웹 학술 동아리 WINK"
        />
        <meta property="og:image" content="https://i.imgur.com/qXRRE56.png" />
      </head>
      <body>
        <Header loading={loading} />

        <main
          className={cn(
            'pt-14',
            IGNORE_PATHS.find((path) => pathname.startsWith(path))
              ? 'min-h-[100dvh]'
              : 'min-h-[calc(100dvh-274px)]',
          )}
        >
          {loading ? <Loading /> : children}
        </main>

        {!IGNORE_PATHS.find((path) => pathname.startsWith(path)) && <Footer />}

        <Toaster position="top-center" duration={3000} closeButton={true} richColors={true} />
      </body>
    </html>
  );
}
