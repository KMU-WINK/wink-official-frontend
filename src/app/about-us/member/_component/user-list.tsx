import { User } from '@/app/about-us/member/_component/user';

import { Skeleton } from '@/ui/skeleton';

import UserType from '@/api/type/schema/user';

import { cn } from '@/lib/util';

type Direction = 'row' | 'col' | 'flex';

interface UserListProps {
  role?: string;
  description?: string;
  direction?: Direction;
  users: UserType[];
  skeleton: number;
  loading: boolean;
}

export default function UserList({
  role,
  description,
  direction = 'row',
  users,
  skeleton,
  loading,
}: UserListProps) {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      {(role || description) && (
        <div className="flex flex-col space-y-2 items-center justify-center">
          <p className="text-xl sm:text-2xl font-bold">&lt;{role}&gt;</p>
          <p className="text-sm sm:text-base">{description}</p>
        </div>
      )}

      <div
        className={cn(
          'flex gap-4 items-center justify-center',
          direction === 'row' ? 'flex-row' : direction === 'col' ? 'flex-col' : 'flex-wrap',
        )}
      >
        {loading
          ? Array.from({ length: skeleton }).map((_, index) => (
              <Skeleton key={index} className="w-[300px] h-[170px] rounded-3xl mt-3" />
            ))
          : users.map((user) => <User key={user.id} user={user} />)}
      </div>
    </div>
  );
}
