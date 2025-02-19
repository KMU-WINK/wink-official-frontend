'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/app/loading';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/user');
  }, []);

  return <Loading />;
}
