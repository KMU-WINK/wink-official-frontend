import { Shapes, User, UserCheck, Waypoints } from 'lucide-react';

export const sideItems = [
  {
    group: '유저',
    items: [
      {
        title: '유저 목록',
        url: '/admin/user',
        icon: User,
      },
      {
        title: '대기 유저 목록',
        url: '/admin/user/pre',
        icon: UserCheck,
      },
    ],
  },
  {
    group: '모집',
    items: [
      {
        title: '모집 목록',
        url: '/admin/recruit',
        icon: Shapes,
      },
    ],
  },
  {
    group: '활동',
    items: [
      {
        title: '활동 목록',
        url: '/admin/activity',
        icon: Waypoints,
      },
    ],
  },
];
