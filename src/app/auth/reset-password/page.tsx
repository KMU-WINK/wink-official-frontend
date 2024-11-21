'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { ResetPasswordRequest, ResetPasswordRequestSchema } from '@/api/type/domain/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export default function AuthResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    mode: 'onChange',
    defaultValues: {
      token: '',
      newPassword: '',
    },
  });

  const onSubmit = useCallback(
    async (values: ResetPasswordRequest) => {
      await Api.Domain.Auth.resetPassword(values);

      toast.success('비밀번호를 변경했습니다.');

      router.push('/auth/login');
    },
    [router],
  );

  useEffect(() => {
    form.setValue('token', token || '');
  }, [token]);

  useEffect(() => {
    (async () => {
      const { isValid } = await Api.Domain.Auth.checkResetPassword({
        token: token ?? 'invalid',
      });

      if (!isValid) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
      }

      setLoading(false);
    })();
  }, [token]);

  if (loading) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[300px] space-y-4 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>새로운 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="새로운 비밀번호를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="wink" type="submit" className="w-full">
          비밀번호 변경
        </Button>
      </form>
    </Form>
  );
}
