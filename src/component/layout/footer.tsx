import Image from 'next/image';
import Link from 'next/link';

import { FooterLinks } from '@/layout/_constant/footer-link';

import logo from '@/public/footer/logo.png';

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-6 sm:space-y-8 items-center pt-16 pb-8">
      <div className="flex space-x-0.5 sm:space-x-1 items-center">
        <Image
          src={logo}
          alt={logo.src}
          width="48"
          height="18"
          className="w-[32px] h-[12px] sm:w-[48px] sm:h-[18px]"
        />
        <p className="text-neutral-500 font-medium text-sm sm:text-base">WINK</p>
      </div>

      <div className="flex space-x-6">
        {FooterLinks.map(({ name, icon, href }) => (
          <Link
            title={name}
            key={name}
            href={href}
            target="_blank"
            className="bg-neutral-500 text-white p-3 rounded-full"
          >
            {icon}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-1.5">
        <p className="text-neutral-500 text-center text-sm sm:text-base">
          서울특별시 성북구 정릉로 77 <br className="block sm:hidden" />
          (국민대학교 미래관 605-1)
        </p>
        <p className="text-neutral-500 font-light text-xs sm:text-sm">
          &copy; WINK 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
