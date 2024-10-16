'use client';

import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { FaBookOpen, FaProjectDiagram } from 'react-icons/fa';
import { MdGroup, MdHistory, MdKey, MdLogout, MdPerson, MdQuestionMark } from 'react-icons/md';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import useUserStore from '@/store/user';

import Logo from '@/public/logo.svg';

import { ChevronDown, Menu, X } from 'lucide-react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
  href?: string;
  hidden?: boolean;
  mobileHidden?: boolean;
}

export default function Header() {
  const { user } = useUserStore();

  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const MENU_ITEMS: MenuItem[] = useMemo(
    () => [
      {
        label: 'About Us',
        subItems: [
          {
            label: '동아리 소개',
            icon: <MdQuestionMark />,
            href: '/about-us/wink',
          },
          {
            label: '부원 목록',
            icon: <MdGroup />,
            href: '/about-us/member',
          },
        ],
      },
      {
        label: 'Program',
        subItems: [
          { label: '연혁', icon: <MdHistory />, href: '/program/history' },
          { label: '프로젝트', icon: <FaProjectDiagram />, href: '/program/project' },
          { label: '스터디', icon: <FaBookOpen />, href: '/program/study' },
          { label: '친목 활동', icon: <MdGroup />, href: '/program/activity' },
        ],
      },
      { label: 'Recruit', href: '/recruit' },
      { label: 'Admin', href: '/admin', hidden: !user?.role?.includes('admin') },
      { label: 'Login', href: '/auth/login', hidden: !!user, mobileHidden: true },
    ],
    [],
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
            <Logo width={60} color="red" />
          </div>

          <nav className="hidden sm:flex">
            {MENU_ITEMS.filter((item) => !item.hidden).map((item) => (
              <React.Fragment key={item.label}>
                {item.subItems ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link">
                        {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem
                          key={item.label + subItem.label}
                          onClick={() => router.push(subItem.href!)}
                        >
                          {subItem.icon && <div className="mr-2">{subItem.icon}</div>}{' '}
                          {subItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="link" onClick={() => router.push(item.href!)}>
                    {item.label}
                  </Button>
                )}
              </React.Fragment>
            ))}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link" className="flex items-center">
                    <Image
                      src="/avatar.svg"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    {user.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <MdPerson className="mr-2" />내 정보 수정
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MdKey className="mr-2" />내 비밀번호 수정
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MdLogout className="mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out sm:hidden overflow-y-auto z-50`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={toggleMobileMenu}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="p-6 mt-6 relative">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center mb-4">
              <Image
                src="/avatar.svg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span
                className={`font-semibold ${!user ? 'cursor-pointer underline-offset-4 hover:underline' : ''}`}
                onClick={() => router.push('/auth/login')}
              >
                {user ? user.name : '로그인하기'}
              </span>
            </div>
            {user && (
              <div className="w-full mb-4">
                <div className="flex flex-row items-center justify-around w-full space-x-2">
                  <Button variant="link" size="sm">
                    <MdPerson className="mr-2" />내 정보 수정
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="link" size="sm">
                    <MdKey className="mr-2" />
                    비밀번호 수정
                  </Button>
                </div>
                <Separator className="my-2" />
                <Button variant="link" size="sm" className="w-full">
                  <MdLogout className="mr-2" />
                  로그아웃
                </Button>
              </div>
            )}
            <nav className="space-y-6">
              {MENU_ITEMS.filter((item) => !item.hidden)
                .filter((item) => !item.mobileHidden)
                .map((item) => (
                  <div key={item.label}>
                    <Button
                      variant="link"
                      onClick={() => item.href && router.push(item.href)}
                      className="w-full justify-start"
                    >
                      {item.label}
                    </Button>

                    <div className="ml-4 space-y-2">
                      {item.subItems &&
                        item.subItems.map((subItem) => (
                          <Button
                            key={item.label + subItem.label}
                            variant="link"
                            size="sm"
                            onClick={() => router.push(subItem.href!)}
                            className="w-full justify-start"
                          >
                            {subItem.icon && <div className="mr-2">{subItem.icon}</div>}
                            {subItem.label}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
