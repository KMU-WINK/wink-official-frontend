import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { UpdateMyInfoRequest, UpdateMyInfoRequestSchema } from '@/api/type/domain/user';
import User from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Upload, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ChangeMyInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangeMyInfoModal({ open, setOpen }: ChangeMyInfoModalProps) {
  const { user, setUser } = useUserStore();

  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UpdateMyInfoRequest>({
    resolver: zodResolver(UpdateMyInfoRequestSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      github: '',
      instagram: '',
      blog: '',
    },
  });

  const handleImageUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      const { url } = await Api.Domain.User.updateMyAvatar();

      try {
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        const avatarUrl = url.replace('/original', '').replace(/\?.+$/, '.webp');

        let isUploaded = false;
        const checkInterval = setInterval(async () => {
          const response = await fetch(avatarUrl);

          if (response.ok) {
            clearInterval(checkInterval);

            isUploaded = true;

            setUser({
              ...user,
              avatar: avatarUrl,
            } as User);

            toast.success('프로필 이미지가 업데이트되었습니다.');
          }
        }, 500);

        setTimeout(() => {
          if (isUploaded) return;
          clearInterval(checkInterval);
          toast.error('프로필 이미지 업로드에 실패했습니다.');
        }, 1000 * 30);
      } catch (error) {
        toast.error(`이미지 업로드에 실패했습니다. ${error}`);
        throw new Error(error as string);
      } finally {
        setIsUploading(false);
      }
    },
    [user],
  );

  const onSubmit = useCallback(async (values: UpdateMyInfoRequest) => {
    const { user } = await Api.Domain.User.updateMyInfo({
      description: values.description || undefined,
      github: values.github || undefined,
      instagram: values.instagram || undefined,
      blog: values.blog || undefined,
    });

    setUser(user);
    setOpen(false);

    toast.success('내 정보를 수정했습니다.');
  }, []);

  useEffect(() => {
    form.reset({
      description: user?.description || '',
      github: user?.social?.github || '',
      instagram: user?.social?.instagram || '',
      blog: user?.social?.blog || '',
    });
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>내 정보 수정</DialogTitle>
          <DialogDescription>내 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <div
              className="relative w-24 h-24 mx-auto cursor-pointer"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  document.getElementById('avatar-upload')?.click();
                }
              }}
            >
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} alt="avatar" />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Upload className="w-8 h-8 text-white" />
              </div>
              {user?.avatar && (
                <div
                  className="absolute bottom-0 right-0 p-1 bg-black/50 rounded-full"
                  onClick={async (e) => {
                    e.stopPropagation();

                    const { user } = await Api.Domain.User.deleteMyAvatar();

                    setUser(user);

                    toast.success('프로필 이미지를 삭제했습니다.');
                  }}
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>한 줄 소개</FormLabel>
                  <FormControl>
                    <Input placeholder="한 줄 소개를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input placeholder="Github 아이디를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram 아이디를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="blog"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>블로그</FormLabel>
                  <FormControl>
                    <Input placeholder="블로그 주소를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" className="w-full">
              내 정보 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
