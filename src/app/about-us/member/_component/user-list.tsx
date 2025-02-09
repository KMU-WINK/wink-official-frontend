import { User } from '@/app/about-us/member/_component/user';

import UserType from '@/api/type/schema/user';

import { cn } from '@/util';

type Direction = 'row' | 'col';

interface UserListProps {
  role?: string;
  description?: string;
  direction?: Direction;
  users: UserType[];
}

export default function UserList({ role, description, direction = 'row', users }: UserListProps) {
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
          direction === 'row' ? 'flex-row flex-wrap' : 'flex-col',
        )}
      >
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
