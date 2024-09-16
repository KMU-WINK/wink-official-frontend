'use client';

import React, { useEffect } from 'react';

import { AdminSideBar } from '@/component';

import { AdminGuard } from '@/guard';

interface RootLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: RootLayoutProps) => {
  return (
    <AdminGuard>
      <div className="flex mt-12">
        <div className="mt-36">
          <AdminSideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
