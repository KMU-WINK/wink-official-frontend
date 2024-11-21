'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';

import Api from '@/api';
import { LoginRequest, LoginRequestSchema } from '@/api/type/domain/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export default function AuthLoginPage() {
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (values: LoginRequest) => {
      const { accessToken, refreshToken } = await Api.Domain.Auth.login(values);

      await Api.Request.setToken(accessToken, refreshToken);

      toast.success('로그인에 성공했습니다.');

      router.push('/');
    },
    [router],
  );

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="wink" type="submit" className="w-full">
          로그인
        </Button>

        <Separator />

        <div className="flex space-x-1 text-xs sm:text-sm text-neutral-600">
          <p>비밀번호를 잊으셨나요?</p>
          <Link
            href="/auth/reset-password/request"
            className="underline underline-offset-4 hover:text-neutral-600/90"
          >
            비밀번호 찾기
          </Link>
        </div>
      </form>
    </Form>
  );
}
