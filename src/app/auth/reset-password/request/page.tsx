'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import {
  RequestResetPasswordRequest,
  RequestResetPasswordRequestSchema,
} from '@/api/type/domain/auth';
import { useApiWithToast } from '@/api/useApi';

import { zodResolver } from '@hookform/resolvers/zod';

export default function AuthResetPasswordRequestPage() {
  const router = useRouter();

  const [isApi, startApi] = useApiWithToast();

  const form = useForm<RequestResetPasswordRequest>({
    resolver: zodResolver(RequestResetPasswordRequestSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback((values: RequestResetPasswordRequest) => {
    startApi(
      async () => {
        await Api.Domain.Auth.requestResetPassword(values);
        router.push('/auth/login');
      },
      {
        loading: '비밀번호 초기화 메일을 전송하고 있습니다.',
        success: '비밀번호 초기화 메일을 전송했습니다.',
      },
    );
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[300px] space-y-4 items-center justify-center"
      >
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

        <Button variant="wink" type="submit" disabled={isApi} className="w-full">
          비밀번호 초기화 요청
        </Button>
      </form>
    </Form>
  );
}
