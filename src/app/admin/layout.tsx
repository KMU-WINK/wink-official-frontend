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
import MobileGuard from '@/guard/mobile';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <MobileGuard>
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
      </MobileGuard>
    </AdminGuard>
  );
}
