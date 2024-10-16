'use client';

import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import Title from '@/app/auth/_components/Title';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function LoginPage() {
  const router = useRouter();

  const formSchema = useMemo(
    () =>
      z.object({
        email: z
          .string({ required_error: '이메일을 입력해주세요.' })
          .min(1, '이메일을 입력해주세요.')
          .email('이메일 형식이 올바르지 않습니다.')
          .endsWith('@kookmin.ac.kr', '국민대학교 이메일을 입력해주세요.'),
        password: z
          .string({ required_error: '비밀번호를 입력해주세요.' })
          .min(1, '비밀번호를 입력해주세요.'),
      }),
    [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log(values);
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <Title title="국민대학교 소프트웨어융합대학 유일무이 Web 동아리" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-72 sm:w-96 mt-12">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="국민대학교 이메일" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="비밀번호" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-4" type="submit">
            로그인
          </Button>

          <div className="flex space-x-2 w-full justify-center">
            <p className="text-sm text-neutral-500">아직 계정이 없으신가요?</p>
            <a
              className="text-sm text-wink-500 cursor-pointer hover:underline"
              onClick={() => router.push('/auth/register')}
            >
              회원가입
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
