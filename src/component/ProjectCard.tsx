import React from 'react';

import Image from 'next/image';

import logo from '@/public/logo.png';

interface ProjectCardProps {
  title: string;
  imageUrl: string | null;
  tags: string[];
  year: number;
  link: string; // 추가된 props
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  imageUrl,
  tags,
  year,
  link,
}: ProjectCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-border rounded-project-card overflow-hidden shadow-lg cursor-pointer block"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={360}
          height={160}
          className="object-cover w-full h-48"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <Image src={logo} alt={'이미지 없음'} width={100} height={100} />
        </div>
      )}
      <div className="p-7 pt-3.5">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="max-w-[calc(100% - 100px)] font-bold text-lg flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </h2>
            <div className="flex justify-center items-center bg-zinc-200 text-center rounded-xl px-3 py-1">
              <h2 className="text-base font-medium text-center">{year}년</h2>
            </div>
          </div>

          <div className="text-zinc-500 text-3 font-semibold">
            {tags.map((tag, index) => (
              <span key={index} className="mr-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};
