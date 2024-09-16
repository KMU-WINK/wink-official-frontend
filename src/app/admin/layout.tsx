'use client';

import React from 'react';

import { AdminSideBar } from '@/component';

import { AdminGuard } from '@/guard';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AdminGuard>
      <div className="flex mt-14">
        <div className="mt-36 ml-6">
          <AdminSideBar />
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
