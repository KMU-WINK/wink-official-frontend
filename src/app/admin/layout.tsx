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
      <div className="flex mt-14 gap-6 p-6">
        <div className="mt-admin-sidebar">
          <AdminSideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
