import React from 'react';

import Link from 'next/link';

import Logo from '@/public/wink_footer_logo.svg';
import Github from '@/public/wink_github.svg';
import Instagram from '@/public/wink_instagram.svg';
import Tistory from '@/public/wink_tistory.svg';

interface Link {
  id: string;
  href: string;
  icon: React.ReactNode;
}

const LINKS: Link[] = [
  {
    id: 'github',
    href: 'https://github.com/KMU-WINK',
    icon: <Github />,
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/kmu_wink/',
    icon: <Instagram />,
  },
  {
    id: 'tistory',
    href: 'https://cs-kookmin-club.tistory.com/category/WINK-%28Web%20%26%20App%29',
    icon: <Tistory />,
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col py-20 items-center justify-center w-full bg-white mt-auto">
      <div className="flex justify-center gap-1 mb-7">
        <Logo />
        <p className="text-lg text-slate-400">WINK</p>
      </div>

      <ul className="flex justify-center list-none gap-5 mb-7">
        {LINKS.map(link => (
          <Link key={link.id} href={link.href}>
            {link.icon}
          </Link>
        ))}
      </ul>

      <div className="flex flex-col gap-7">
        <h3 className="flex justify-center text-md text-slate-400">
          서울 성북구 정릉로 77 미래관 605-1
        </h3>
        <p className="text-md text-gray-500">
          © WINK 2024 All rights reserved.
        </p>
      </div>
    </footer>
  );
};
