import { useRouter } from 'next/navigation';

import { ArrowRightIcon } from 'lucide-react';

export default function Recruitment() {
  const router = useRouter();

  return (
    <div
      className="flex items-center space-x-2 text-wink-500 font-semibold cursor-pointer"
      onClick={() => router.push('/recruit')}
    >
      지원하기 <ArrowRightIcon className="w-4 h-4" />
    </div>
  );
}
