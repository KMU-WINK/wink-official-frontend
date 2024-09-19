import React from 'react';

import Image from 'next/image';

interface StudyCardProps {
  image: string;
  link: string;
  title: string;
  content: string;
  author: string;
}

export const StudyCard: React.FC<StudyCardProps> = ({ image, link, title, content, author }) => {
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
        <p className="font-normal text-base text-slate-500 max-w-screen-sm truncate">{content}</p>
        <div className="flex flex-row justify-between">
          <p className="font-normal text-base max-w-screen-sm truncate">{link}</p>
          <p className="font-normal text-base text-slate-500 max-w-screen-sm truncate">{author}</p>
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="flex items-center flex-shrink-0 w-36 h-28">
        <Image src={image} alt={title} width={139} height={112} />
      </div>
    </a>
  );
};
