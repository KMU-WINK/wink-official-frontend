'use client';

import React, { useEffect } from 'react';

import { AdminSideBar } from '@/component';

import { AdminGuard } from '@/guard';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AdminGuard>
      <div className="flex mt-12">
        <div className="mt-36 ml-6">
          <AdminSideBar />
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
