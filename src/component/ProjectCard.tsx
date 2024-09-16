import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  createdAt: Date;
  title: string;
  tags: string[];
  image: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  createdAt,
  title,
  tags,
  image,
}: ProjectCardProps) => {
  console.log(image);
  return (
    <Link
      href={`/activity/project/${id}`}
      passHref
      className="border border-border rounded-project-card overflow-hidden shadow-lg cursor-pointer block"
    >
      <Image
        src={image}
        alt={title}
        width={360}
        height={160}
        className="object-cover w-full h-48"
      />

      <div className="p-7 pt-3.5">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="max-w-[calc(100% - 100px)] font-bold text-lg flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </h2>
            <div className="flex justify-center items-center bg-zinc-200 text-center rounded-xl px-3 py-1">
              <h2 className="text-base font-medium text-center">
                {new Date(createdAt).getFullYear()}년
              </h2>
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
    </Link>
  );
};
