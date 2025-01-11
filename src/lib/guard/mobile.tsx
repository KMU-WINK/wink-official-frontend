'use client';

import { ReactNode, useEffect, useState } from 'react';

import { Smartphone } from 'lucide-react';

interface MobileGuardProps {
  children: ReactNode;
}

export default function MobileGuard({ children }: MobileGuardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center space-y-4 mt-16">
        <Smartphone size={48} />
        <p className="font-medium">모바일 환경에서는 사용할 수 없습니다.</p>
      </div>
    );
  }

  return children;
}
