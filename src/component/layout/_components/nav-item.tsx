import { useState } from 'react';

import Link from 'next/link';

import { NavItemType } from '@/layout/_constant/header-item';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

interface NavItemProps {
  item: NavItemType;
}

export default function NavItem({ item }: NavItemProps) {
  const [isOpen, setOpen] = useState(false);

  if ('href' in item) {
    return (
      <Link href={item.href} onClick={() => setOpen(false)}>
        <Button variant="ghost" className="rounded-lg">
          {item.title}
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-lg">
          {item.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {item.items.map((item) => (
          <Link href={item.href} key={item.title} onClick={() => setOpen(false)}>
            <DropdownMenuItem>{item.title}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
