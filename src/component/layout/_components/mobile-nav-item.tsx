import Link from 'next/link';

import { NavItemType } from '@/layout/_constant/header-item';

interface MobileNavItem {
  item: NavItemType;
  setOpen: (open: boolean) => void;
}

export default function MobileNavItem({ item, setOpen }: MobileNavItem) {
  if ('href' in item) {
    return (
      <Link href={item.href} className="font-medium" onClick={() => setOpen(false)}>
        {item.title}
      </Link>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium">{item.title}</p>
      <div className="flex flex-col space-y-2 pl-2">
        {item.items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="text-sm"
            onClick={() => setOpen(false)}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
