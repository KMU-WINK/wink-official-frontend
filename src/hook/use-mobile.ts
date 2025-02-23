import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
    };

    checkIsMobile(); // 컴포넌트 로드 시 체크
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export default useIsMobile;
