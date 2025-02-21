'use client';

import Image from 'next/image';

import History from '@/api/type/schema/history';

interface HistoryPreLoaderProps {
  histories: History[];
}

export default function HistoryPreLoader({ histories }: HistoryPreLoaderProps) {
  return (
    <div className="hidden">
      {histories.map((history) => (
        <Image
          key={history.id}
          src={history.image}
          alt={history.image}
          width={600}
          height={338}
          quality={100}
          loading="eager"
          priority={false}
        />
      ))}
    </div>
  );
}
