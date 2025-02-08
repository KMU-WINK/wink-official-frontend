import { useMemo } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Separator } from '@/ui/separator';

import UserType, { Role, getKoreanRole } from '@/api/type/schema/user';

import { cn } from '@/lib/util';

import { UserIcon } from 'lucide-react';

interface UserProps {
  user: UserType;
}

export function User({ user }: UserProps) {
  const social = useMemo(
    () => [
      {
        name: 'Github',
        url: user.social.github ? `https://github.com/${user.social.github}` : '',
      },
      {
        name: 'Instagram',
        url: user.social.instagram ? `https://www.instagram.com/${user.social.instagram}` : '',
      },
      {
        name: 'Blog',
        url: user.social.blog,
      },
    ],
    [user.social.github, user.social.instagram, user.social.blog],
  );

  return (
    <div className="relative">
      {user.role !== Role.MEMBER && (
        <div className="absolute left-6 top-0 border border-wink-300 rounded-full bg-white px-3 py-0.5 text-xs sm:text-sm font-medium">
          {getKoreanRole(user.role).replace(/^.*(부장|차장)$/, '$1')}
        </div>
      )}

      <div
        className={cn(
          'flex flex-col w-[250px] sm:w-[300px] space-y-3 sm:space-y-4 py-3 sm:py-4 border border-wink-300 rounded-3xl mt-3',
          user.role !== Role.MEMBER ? 'pt-4 sm:pt-5' : '',
        )}
      >
        <div className="flex items-center gap-3 sm:gap-4 px-4">
          <Avatar className="w-12 sm:w-16 h-12 sm:h-16">
            <AvatarImage src={user?.avatar} alt="avatar" />
            <AvatarFallback>
              <UserIcon size={32} />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-sm sm:text-base font-medium">{user.name}</p>
            {user.description && (
              <p className="text-xs sm:text-sm line-clamp-2 break-all">{user.description}</p>
            )}
          </div>
        </div>

        <Separator className="bg-wink-300" />

        <div className="flex justify-evenly">
          {social.map(({ name, url }) => {
            return url ? (
              <Link
                key={name}
                href={url}
                target="_blank"
                className="text-sm sm:text-base text-wink-500 font-bold italic font-roboto uppercase"
              >
                {name}
              </Link>
            ) : (
              <p
                key={name}
                className="text-sm sm:text-base text-wink-200 font-bold italic font-roboto uppercase"
              >
                {name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
