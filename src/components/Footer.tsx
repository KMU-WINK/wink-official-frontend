import { FiGithub } from 'react-icons/fi';
import { SiInstagram, SiTistory } from 'react-icons/si';

import FooterLogo from '@/public/footer/logo.svg';

export default function Footer() {
  return (
    <footer className="pt-24 pb-8 bg-white">
      <div className="container mx-auto flex flex-col items-center space-y-8 text-neutral-500">
        <div className="flex items-center space-x-2">
          <FooterLogo width={38} />
          <span className="text-lg font-semibold">WINK</span>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/KMU-WINK"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://instagram.com/kmu_wink"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700"
          >
            <SiInstagram size={24} />
          </a>
          <a
            href="https://cs-kookmin-club.tistory.com/category/WINK-(Web & App)"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700"
          >
            <SiTistory size={24} />
          </a>
        </div>

        <div className="flex flex-col">
          <p className="hidden sm:block text-neutral-500">
            서울특별시 성북구 정릉로 77 | 국민대학교 미래관 605-1
          </p>

          <p className="sm:hidden text-neutral-500 text-center">서울특별시 성북구 정릉로 77</p>
          <p className="sm:hidden text-sm text-neutral-500 text-center">국민대학교 미래관 605-1</p>
        </div>

        <p className="text-sm text-neutral-500">© WINK 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}
