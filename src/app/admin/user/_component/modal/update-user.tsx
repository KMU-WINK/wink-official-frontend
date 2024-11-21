import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Switch } from '@/ui/switch';

import Api from '@/api';
import { UpdateRequest, UpdateRequestSchema } from '@/api/type/domain/user';
import User, { Role, getKoreanRole } from '@/api/type/schema/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface UpdateUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
  callback: (user: User) => void;
}

export default function UpdateUserModal({ open, setOpen, user, callback }: UpdateUserModalProps) {
  const form = useForm<UpdateRequest>({
    resolver: zodResolver(UpdateRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      phoneNumber: '',
      role: Role.MEMBER,
      fee: false,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateRequest) => {
      const { user: _user } = await Api.Domain.AdminUser.update(user!.id, values);

      setOpen(false);
      form.reset(_user);

      toast.success('유저를 수정했습니다.');

      callback(_user);
    },
    [user],
  );

  useEffect(() => {
    form.reset(user ?? undefined);
  }, [user]);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>유저 수정</DialogTitle>
          <DialogDescription>유저를 수정합니다.</DialogDescription>
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
                  <FormLabel>학번</FormLabel>
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>권한</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Role).map((role) => (
                          <SelectItem key={role} value={role}>
                            {getKoreanRole(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>회비 납부</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" className="w-full">
              유저 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
