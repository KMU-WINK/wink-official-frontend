'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

const ITEM = [
  {
    title: 'Member',
    description: '동아리 부원 관리',
    items: [
      { title: '부원 조회 및 수정', href: '/admin/member/list' },
      { title: '회원가입 승인', href: '/admin/member/waiting' },
    ],
  },
  {
    title: 'Activities',
    description: '동아리 활동 관리',
    items: [
      { title: '스터디', href: '/admin/activity/study' },
      { title: '프로젝트', href: '/admin/activity/project' },
      { title: '친목 활동', href: '/admin/activity/social' },
    ],
  },
];

export const AdminSideBar: React.FC = () => {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <div className="w-72">
      <nav className="space-y-1 p-4">
        {ITEM.map(({ title, description, items }) => (
          <div key={title}>
            <h2 className="flex items-center justify-between text-lg font-semibold px-6 py-3 border-b">
              <span>{title}</span>
              <span className="text-sm font-normal text-gray-500">{description}</span>
            </h2>
            <ul className="mt-2">
              {items.map(({ title, href }) => (
                <li key={href}>
                  <button
                    onClick={() => router.push(href)}
                    className={`w-full text-left block pl-8 py-3 text-sm text-gray-700 ${pathname !== href ? 'hover:bg-gray-50' : ''} rounded-md ${pathname === href ? 'bg-wink-50' : ''}`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};
