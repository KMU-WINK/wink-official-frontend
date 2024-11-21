import { ReactNode } from 'react';
import { FiGithub, FiInstagram } from 'react-icons/fi';
import { SiTistory } from 'react-icons/si';

interface FooterLinkType {
  name: string;
  icon: ReactNode;
  href: string;
}

export const FooterLinks: FooterLinkType[] = [
  {
    name: 'github',
    icon: <FiGithub />,
    href: 'https://github.com/KMU-WINK',
  },
  {
    name: 'instagram',
    icon: <FiInstagram />,
    href: 'https://www.instagram.com/kmu_wink',
  },
  {
    name: 'tistory',
    icon: <SiTistory />,
    href: 'https://cs-kookmin-club.tistory.com/category/WINK-%28Web%20%26%20App%29',
  },
];
