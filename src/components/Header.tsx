'use client';

import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import logo from '@/public/logo.png';

export const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [cookies, , removeCookie] = useCookies(['token']);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const pathName = usePathname() as string;

  const navigations = [
    {
      title: 'about us',
      href: '#',
      mobileHide: true,
      useLink: false,
    },
    {
      title: 'program',
      href: '#',
      mobileHide: true,
      useLink: false,
    },
    {
      title: 'recruit',
      href: '/apply',
      mobileHide: false,
      useLink: true,
    },
    {
      title: cookies.token ? 'logout' : 'login',
      href: cookies.token ? '#' : '/login',
      mobileHide: true,
      useLink: !cookies.token,
    },
  ];

  const aboutUsDropdownItems = [
    { title: '동아리 소개', href: '/' },
    { title: '부원 소개', href: '/member' },
  ];

  const programDropdownItems = [
    { title: '연혁', href: '/history' },
    { title: '프로젝트', href: '/project' },
    { title: '스터디', href: '/study' },
    { title: '친목활동', href: '/social' },
  ];

  const updateScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', updateScroll);
    }, 200);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  useEffect(() => {
    // 페이지가 이동할 때 드롭다운 닫기
    setIsProgramDropdownOpen(false);
    setIsAboutUsDropdownOpen(false);
  }, [pathName]);

  const getActiveNav = () => {
    if (pathName === '/' || pathName === '/member') {
      return 'about us';
    } else if (
      pathName === '/history' ||
      pathName === '/project' ||
      pathName === '/study' ||
      pathName === '/social'
    ) {
      return 'program';
    } else if (pathName === '/apply') {
      return 'recruit';
    } else if (pathName === '/signup' || pathName === '/login') {
      return 'login';
    }
    return '';
  };

  const getActiveDropdownItem = (dropdownItems: { title: string; href: string }[]) => {
    const activeItem = dropdownItems.find((item) => item.href === pathName);
    return activeItem ? activeItem.title : '';

  const onClickLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeCookie('token');
    window.location.reload();
  };

  const toggleDropdown = (type: string) => {
    if (type === 'about us') {
      setIsAboutUsDropdownOpen(!isAboutUsDropdownOpen);
      setIsProgramDropdownOpen(false);
    } else if (type === 'program') {
      setIsProgramDropdownOpen(!isProgramDropdownOpen);
      setIsAboutUsDropdownOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 bg-white w-full h-14 flex items-center justify-center border-b`}
    >
      <div className="w-full max-w-[1440px] flex justify-between p-4 lg:p-6">
        <Link href={'/'} replace>
          <Image
            className="object-contain h-6"
            src={logo}
            alt="Logo of WINK"
            placeholder="blur"
            height={24}
            priority
          />
        </Link>
        <nav className="flex justify-center items-center">
          <ul className="flex justify-center items-center list-none gap-8">
            {navigations.map((link) => (
              <li
                key={link.title}
                className={`font-pretendard font-bold text-sm relative ${
                  getActiveNav() === link.title ? 'text-[#3a70ff]' : 'text-black'
                } ${link.mobileHide && 'hidden sm:block'}`}
              >
                {link.title === 'logout' ? (
                  <a href={link.href} onClick={onClickLogout} className="cursor-pointer">
                    {link.title}
                  </a>
                ) : link.useLink ? (
                  <Link href={link.href}>{link.title}</Link>
                ) : (
                  <a href="#" onClick={() => toggleDropdown(link.title)} className="cursor-pointer">
                    {link.title}
                  </a>
                )}
                {link.title === 'program' && isProgramDropdownOpen && (
                  <ul className="flex flex-col items-center absolute mt-[18px] left-[-13px] w-20 bg-white shadow-lg border">
                    {programDropdownItems.map((item) => (
                      <li
                        key={item.title}
                        className={`py-2 ${
                          getActiveDropdownItem(programDropdownItems) === item.title
                            ? 'text-[#3a70ff]'
                            : 'text-black'
                        }`}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                {link.title === 'about us' && isAboutUsDropdownOpen && (
                  <ul className="flex flex-col items-center absolute mt-[18px] left-[-18px] w-24 bg-white shadow-lg border">
                    {aboutUsDropdownItems.map((item) => (
                      <li
                        key={item.title}
                        className={`py-2 ${
                          getActiveDropdownItem(aboutUsDropdownItems) === item.title
                            ? 'text-[#3a70ff]'
                            : 'text-black'
                        }`}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
