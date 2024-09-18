'use client';

import React, { useState } from 'react';
import { CiLogout } from 'react-icons/ci';

import Dropdown from '@/public/assets/arrow-down.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useMemberStore } from '@/store';

import { PERMIT_ROLES } from '@/guard';

import { WinkApi } from '@/api';

import logo from '@/public/logo.png';
import avatar from '@/public/profile.svg';

import { AnimatePresence, motion } from 'framer-motion';

export const Header: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();

  const { member } = useMemberStore();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const ITEMS = [
    {
      title: 'about us',
      mobileHide: true,
      href: '/about-us',
      dropdown: [
        { title: '동아리 소개', href: '/about-us/we' },
        { title: '부원 소개', href: '/about-us/member' },
      ],
    },
    {
      title: 'program',
      mobileHide: true,
      href: '/activity',
      dropdown: [
        { title: '연혁', href: '/activity/history' },
        { title: '프로젝트', href: '/activity/project' },
        { title: '스터디', href: '/activity/study' },
        { title: '친목활동', href: '/activity/social' },
      ],
    },
    {
      title: 'recruit',
      href: '/recruit',
      mobileHide: false,
    },
    {
      title: 'admin',
      href: '/admin',
      mobileHide: false,
      hide: !member || !PERMIT_ROLES.includes(member.role),
    },
    {
      title: 'login',
      href: '/auth/login',
      mobileHide: true,
      hide: member,
    },
  ];

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const handleLogout = () => {
    WinkApi.Request.removeToken();

    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 z-50 bg-white w-full h-14 flex items-center justify-center border-b">
      <div className="w-page flex justify-between p-4 lg:p-6">
        <Link href={'/about-us/we'} replace>
          <Image
            className="object-contain h-6 mt-1"
            src={logo}
            alt="logo"
            height={24}
            priority
          />
        </Link>
        <nav className="flex justify-center items-center capitalize">
          <ul className="flex justify-center items-center list-none gap-8">
            {ITEMS.filter(item => !item.hide).map(item => (
              <div
                key={item.title}
                className={item.mobileHide ? 'hidden sm:block' : ''}
              >
                <li className="font-medium text-sm relative cursor-pointer">
                  <div
                    className={`flex items-center gap-1 ${pathname.startsWith(item.href) ? 'text-wink-500' : ''}`}
                    onClick={() => {
                      if (item.dropdown) {
                        handleDropdownToggle(item.title);
                      } else {
                        router.push(item.href);
                      }
                    }}
                  >
                    {item.title}
                    {item.dropdown && <Dropdown />}
                  </div>
                  <AnimatePresence>
                    {activeDropdown === item.title && item.dropdown && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -left-1/4 w-28 top-full transform bg-white font-normal shadow-md rounded-md py-2 mt-4.5"
                      >
                        {item.dropdown.map(subItem => (
                          <li
                            key={subItem.href}
                            className={`px-4 py-2 hover:bg-gray-100 ${pathname.startsWith(subItem.href) ? 'text-wink-500' : ''}`}
                            onClick={() => {
                              router.push(subItem.href);
                              setActiveDropdown(null);
                            }}
                          >
                            <p>{subItem.title}</p>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </div>
            ))}

            {member && (
              <li className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleDropdownToggle('profile')}
                >
                  <Image
                    src={member.avatar || avatar}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-bold text-sm">{member.name}</span>
                  <Dropdown />
                </div>
                <AnimatePresence>
                  {activeDropdown === 'profile' && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute w-28 top-full right-0 bg-white shadow-md rounded-md py-2 mt-4 text-sm"
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center gap-2">
                          <CiLogout size={16} />
                          <span>로그아웃</span>
                        </div>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
