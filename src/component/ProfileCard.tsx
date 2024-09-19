import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

// SVG 파일은 React 컴포넌트로 사용
import AvatarSvg from '@/public/profile.svg';

interface ProfileCardProps {
  name: string;
  description: string | null;
  avatar: string | null; // avatar가 URL이면 string
  github: string | null;
  instagram: string | null;
  blog: string | null;
  role: string | null;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  role,
  name,
  description,
  avatar,
  github,
  instagram,
  blog,
}) => {
  const URL = [
    {
      name: 'github',
      url: github,
    },
    {
      name: 'instagram',
      url: instagram,
    },
    {
      name: 'blog',
      url: blog,
    },
  ];

  return (
    <div className="relative w-72 border border-wink-400 rounded-lg">
      {role && (
        <div className="absolute -top-3 left-5 bg-white px-3 py-0.5 rounded-full border border-wink-400 text-sm font-bold">
          {role}
        </div>
      )}

      <div className="flex space-x-2 p-4">
        {/* avatar가 URL인 경우 next/image 사용, 그렇지 않으면 SVG 컴포넌트 렌더링 */}
        {avatar ? (
          <Image
            src={avatar}
            alt="Profile"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-full"
          />
        ) : (
          <AvatarSvg className="w-16 h-16 object-cover rounded-full" />
        )}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mt-1.5">{name}</h2>
          {description && (
            <p className="w-44 text-gray-600 truncate">{description}</p>
          )}
        </div>
      </div>

      <div className="flex justify-around border-t border-wink-400 py-3 px-5">
        {URL.map(url => (
          <Link
            key={url.name}
            href={url.url || ''}
            aria-disabled={!url.url}
            className="text-blue-600 font-roboto font-bold italic uppercase aria-disabled:cursor-default aria-disabled:text-wink-200"
          >
            {url.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
