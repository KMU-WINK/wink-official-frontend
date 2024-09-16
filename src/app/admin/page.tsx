'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/member/list');
  }, []);

  return null;
};

export default AdminPage;
