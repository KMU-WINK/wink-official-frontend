import React from 'react';

import Image from 'next/image';

import logo from '@/public/logo.png';

interface StudyCardProps {
  id: number;
  image: string | null;
  link: string;
  title: string;
  description: string;
  category: string;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  id,
  image,
  link,
  title,
  description,
  category,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full justify-between items-center border border-gray-400 px-5 py-2.5 rounded-lg hover:bg-gray-50"
    >
      {/* 스터디 제목 및 설명 */}
      <div className="flex flex-col gap-2.5 my-4">
        <h2 className="font-bold text-xl max-w-screen-sm truncate">{title}</h2>
        <p className="font-medium text-base text-slate-500 max-w-screen-sm truncate">
          {description}
        </p>
        <p className="font-medium text-base max-w-screen-sm truncate">{link}</p>
      </div>

      {/* 이미지 영역 */}
      <div className="flex items-center flex-shrink-0 w-36 h-28">
        <Image src={image || logo} alt={title} width={139} height={112} />
      </div>
    </a>
  );
};
