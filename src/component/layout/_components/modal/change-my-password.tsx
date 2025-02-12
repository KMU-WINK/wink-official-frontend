import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { UpdateMyPasswordRequest, UpdateMyPasswordRequestSchema } from '@/api/type/domain/user';
import { useApiWithToast } from '@/api/useApi';

import { zodResolver } from '@hookform/resolvers/zod';

interface ChangeMyInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangePasswordModal({ open, setOpen }: ChangeMyInfoModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const form = useForm<UpdateMyPasswordRequest>({
    resolver: zodResolver(UpdateMyPasswordRequestSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const onSubmit = useCallback(
    (values: UpdateMyPasswordRequest) =>
      startApi(() => Api.Domain.User.updateMyPassword(values), {
        loading: '비밀번호를 수정하고 있습니다.',
        success: '비밀번호를 수정했습니다.',
        finally: () => {
          setOpen(false);
          form.reset();
        },
      }),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>비밀번호를 변경합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>현재 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="현재 비밀번호를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="새 비밀번호를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" disabled={isApi} className="w-full">
              비밀번호 변경
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
