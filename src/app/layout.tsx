// src/app/layout.tsx
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'WINK',
    description: '국민대학교 소프트웨어융합대학 웹 학술 동아리 윙크 😉',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                type="text/css"
                rel="stylesheet"
            />
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
