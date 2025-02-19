'use client';

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { ResetPasswordRequest, ResetPasswordRequestSchema } from '@/api/type/domain/auth';
import { useApi, useApiWithToast } from '@/api/useApi';

import Loading from '@/app/loading';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseAsString, useQueryState } from 'nuqs';
import { toast } from 'sonner';

export default function AuthResetPasswordPage() {
  const router = useRouter();

  const [isApi, startApi] = useApi();
  const [isApi2, startApi2] = useApiWithToast();

  const [token] = useQueryState('token', parseAsString.withDefault(''));

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    mode: 'onChange',
    defaultValues: {
      token: '',
      newPassword: '',
    },
  });

  const onSubmit = useCallback((values: ResetPasswordRequest) => {
    startApi2(
      async () => {
        await Api.Domain.Auth.resetPassword(values);
        router.push('/auth/login');
      },
      {
        loading: '비밀번호를 변경하고 있습니다',
        success: '비밀번호를 변경했습니다.',
      },
    );
  }, []);

  useEffect(() => {
    form.setValue('token', token);
  }, [token]);

  useEffect(() => {
    startApi(async () => {
      const { isValid } = await Api.Domain.Auth.checkResetPassword({ token });

      if (!isValid) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
      }
    });
  }, [token]);

  if (isApi) return <Loading />;

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

        <Button variant="wink" type="submit" disabled={isApi2} className="w-full">
          비밀번호 변경
        </Button>
      </form>
    </Form>
  );
}
