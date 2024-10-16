'use client';

import React from 'react';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'WINK | 404',
};

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-64">
      <h1 className="text-3xl sm:text-4xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <Button onClick={() => router.back()}>뒤로가기</Button>
    </div>
  );
}
