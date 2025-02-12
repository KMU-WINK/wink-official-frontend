import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { NavItemType } from '@/layout/_constant/header-item';

import MobileNavItem from '@/layout/_components/mobile-nav-item';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import User from '@/api/type/schema/user';

import { ArrowRight, Menu, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface MobileMenuProps {
  loading: boolean;
  user: User | null;
  menuItems: NavItemType[];
  setChangeMyInfoModalOpen: (open: boolean) => void;
  setChangeMyPasswordModalOpen: (open: boolean) => void;
}

export default function MobileMenu({
  loading,
  user,
  menuItems,
  setChangeMyInfoModalOpen,
  setChangeMyPasswordModalOpen,
}: MobileMenuProps) {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col space-y-4 pt-10">
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-4 items-center">
            {loading ? (
              <Skeleton className="w-10 h-10 rounded-full" />
            ) : (
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            )}

            {loading ? (
              <Skeleton className="w-16 h-4" />
            ) : user ? (
              <p>{user.name}</p>
            ) : (
              <Link
                className="flex items-center space-x-1"
                href="/auth/login"
                onClick={() => setOpen(false)}
              >
                <span className="font-medium">로그인을 해주세요</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {user && (
            <div>
              <div className="flex items-center justify-center">
                <Button
                  variant="link"
                  className="flex-1 text-xs"
                  onClick={() => {
                    setOpen(false);
                    setChangeMyInfoModalOpen(true);
                  }}
                >
                  내 정보 수정
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="link"
                  className="flex-1 text-xs"
                  onClick={() => {
                    setOpen(false);
                    setChangeMyPasswordModalOpen(true);
                  }}
                >
                  내 비밀번호 수정
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-center">
                <Button
                  variant="link"
                  className="flex-1 text-xs"
                  onClick={() => {
                    setOpen(false);
                    router.push('/application');
                  }}
                >
                  내 애플리케이션
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="link"
                  className="flex-1 text-xs"
                  onClick={() => {
                    Api.Request.removeToken();
                    setOpen(false);
                    toast.success('로그아웃되었습니다.');
                  }}
                >
                  로그아웃
                </Button>
              </div>
            </div>
          )}
        </div>

        {menuItems.map((item) => (
          <MobileNavItem key={item.title} item={item} setOpen={setOpen} />
        ))}
      </SheetContent>
    </Sheet>
  );
}
