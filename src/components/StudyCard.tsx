import React from 'react';
import Image from 'next/image';
import logo from '@/public/logo.png';

interface StudyCardProps {
  study: {
    id: number;
    image: string | null;
    link: string;
    title: string;
    description: string;
    category: string;
  };
}

export const StudyCard: React.FC<StudyCardProps> = ({ study }) => {
  return (
    <a
      href={study.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full justify-between items-center border border-[#ADADAD] px-5 py-2.5 rounded-[10px] hover:bg-gray-100"
    >
      {/* 스터디 제목 및 설명 */}
      <div className="flex flex-col gap-[9px] my-[16.22px]">
        <h2 className="font-pretendard font-bold text-xl max-w-screen-sm truncate">
          {study.title}
        </h2>
        <p className="font-pretendard font-medium text-base text-[#868686] max-w-screen-sm truncate">
          {study.description}
        </p>
        <p className="font-pretendard font-medium text-base max-w-screen-sm truncate">
          {study.link}
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="flex items-center flex-shrink-0 w-[139px] h-[112px]">
        <Image src={study.image || logo} alt={study.title} width={139} height={112} />
      </div>
    </a>
  );
};
