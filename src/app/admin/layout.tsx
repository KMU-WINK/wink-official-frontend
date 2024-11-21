'use client';

import { ReactNode } from 'react';

import Link from 'next/link';

import { sideItems } from '@/app/admin/_constant/side-menus';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/sidebar';

import AdminGuard from '@/guard/admin';

/**
 * 1. 유저 목록(수정), 유저 초대, 임시 유저 목록(삭제)
 * 2. 모집 목록, 모집 생성, 신청자 목록, 신청자 조회, 합격 불합격 처리
 * 3. 연혁 목록(수정 삭제), 연혁 생성
 * 4. 활동 목록(수정, 삭제, 고정O, 고정X), 활동 생성
 */

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent className="sm:pt-14">
            {sideItems.map(({ group, items }) => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map(({ title, url, icon: Icon }) => (
                      <SidebarMenuItem key={title}>
                        <SidebarMenuButton asChild>
                          <Link href={url}>
                            <Icon />
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-col w-full p-6 space-y-6">{children}</main>
      </SidebarProvider>
    </AdminGuard>
  );
}
