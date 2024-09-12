import React from 'react';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import logo from '@/public/wink_footer_logo.svg';
import icon_github from '@/public/wink_github.svg';
import icon_instagram from '@/public/wink_instagram.svg';
import icon_tistory from '@/public/wink_tistory.svg';

interface Link {
  id: string;
  href: string;
  icon: StaticImageData;
}

const LINKS: Link[] = [
  {
    id: 'github',
    href: 'https://github.com/KMU-WINK',
    icon: icon_github,
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/kmu_wink/',
    icon: icon_instagram,
  },
  {
    id: 'tistory',
    href: 'https://cs-kookmin-club.tistory.com/category/WINK-%28Web%20%26%20App%29',
    icon: icon_tistory,
  },
];

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-col py-20 items-center">
      <div className="flex gap-1 mb-7">
        <Image src={logo} alt={'logo'} width={36} />
        <p className="text-lg text-slate-400">WINK</p>
      </div>

      <ul className="flex list-none gap-5 mb-7">
        {LINKS.map((link) => (
          <Link key={link.id} href={link.href}>
            <Image className="h-14" src={link.icon} alt={link.id} />
          </Link>
        ))}
      </ul>

      <div className="flex flex-col gap-7">
        <h3 className="text-xl text-slate-400">서울 성북구 정릉로 77 미래관 605-1</h3>
        <p className="text-xl text-gray-500">© WINK 2024 All rights reserved.</p>
      </div>
    </div>
  );
};
