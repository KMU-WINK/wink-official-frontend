import User, { isAdmin } from '@/api/type/schema/user';

interface MenuItemType {
  title: string;
  href: string;
}

interface MenuGroupType {
  title: string;
  items: MenuItemType[];
  mobileHidden?: boolean;
}

export type NavItemType = MenuItemType | MenuGroupType;

const DEFAULT_NAV_ITEMS: NavItemType[] = [
  {
    title: 'About Us',
    items: [
      { title: '동아리 소개', href: '/about-us/wink' },
      { title: '부원 목록', href: '/about-us/member' },
    ],
  },
  {
    title: 'Program',
    items: [
      { title: '연혁', href: '/program/history' },
      { title: '스터디', href: '/program/study' },
      { title: '프로젝트', href: '/program/project' },
      { title: '활동', href: '/program/activity' },
    ],
  },
  {
    title: 'Recruit',
    href: '/recruit',
  },
];

export function getMenuItems(user: User | null) {
  return [
    ...DEFAULT_NAV_ITEMS,
    ...(isAdmin(user?.role) ? [{ title: 'Admin', href: '/admin' }] : []),
  ];
}
