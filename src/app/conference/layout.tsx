'use client';

import { ReactNode } from 'react';

import MemberGuard from '@/guard/member';

interface ConferenceLayoutProps {
  children: ReactNode;
}

export default function ConferenceLayout({ children }: ConferenceLayoutProps) {
  return <MemberGuard>{children}</MemberGuard>;
}
