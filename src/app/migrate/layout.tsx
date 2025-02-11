import { ReactNode } from 'react';

interface MigrateProps {
  children: ReactNode;
}

export default function MigrateLayout({ children }: MigrateProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 pb-10 space-y-10">
      {children}
    </div>
  );
}
