import { Projector, School, Ticket, User, UserCheck, Video } from 'lucide-react';

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
    group: '활동',
    items: [
      {
        title: '활동 목록',
        url: '/admin/activity',
        icon: Video,
      },
    ],
  },
  {
    group: '모집',
    items: [
      {
        title: '모집 목록',
        url: '/admin/recruit',
        icon: Ticket,
      },
    ],
  },
  {
    group: '정기 회의',
    items: [
      {
        title: '정기 회의 목록',
        url: '/admin/conference',
        icon: Projector,
      },
      {
        title: '정기 회의 출석부',
        url: '/admin/conference/attendance',
        icon: School,
      },
    ],
  },
];
