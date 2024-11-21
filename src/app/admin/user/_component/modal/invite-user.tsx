import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { InviteRequest, InviteRequestSchema } from '@/api/type/domain/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface InviteUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function InviteUserModal({ open, setOpen }: InviteUserModalProps) {
  const form = useForm<InviteRequest>({
    resolver: zodResolver(InviteRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = useCallback(async (values: InviteRequest) => {
    await Api.Domain.AdminUser.invite(values);

    setOpen(false);
    form.reset();

    toast.success('유저를 초대했습니다.');
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>유저 초대</DialogTitle>
          <DialogDescription>유저를 초대합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>학번</FormLabel>
                  <FormControl>
                    <Input placeholder="학번을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="이메일을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>전화번호</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="전화번호를 입력해주세요."
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                          .replace(/(-{1,2})$/g, '');

                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" className="w-full">
              유저 초대
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
