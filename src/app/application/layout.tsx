import { ReactNode } from 'react';

import MemberGuard from '@/guard/member';

interface ApplicationLayoutProps {
  children: ReactNode;
}

export default function ApplicationLayout({ children }: ApplicationLayoutProps) {
  return <MemberGuard>{children}</MemberGuard>;
}
