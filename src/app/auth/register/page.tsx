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

export default function RegisterPage() {
  const router = useRouter();

  const formSchema = useMemo(
    () =>
      z
        .object({
          name: z.string({ required_error: '이름을 입력해주세요.' }).min(1, '이름을 입력해주세요.'),
          studentId: z
            .string({ required_error: '학번을 입력해주세요.' })
            .min(1, '학번을 입력해주세요.')
            .length(8, '학번 형식이 올바르지 않습니다.'),
          email: z
            .string({ required_error: '이메일을 입력해주세요.' })
            .min(1, '이메일을 입력해주세요.')
            .email('이메일 형식이 올바르지 않습니다.')
            .endsWith('@kookmin.ac.kr', '국민대학교 이메일을 입력해주세요.'),
          verifyCode: z
            .string({ required_error: '인증코드를 입력해주세요.' })
            .min(1, '인증코드를 입력해주세요.')
            .length(6, '인증코드 형식이 올바르지 않습니다.'),
          password: z
            .string({ required_error: '비밀번호를 입력해주세요.' })
            .min(1, '비밀번호를 입력해주세요.')
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .max(20, '비밀번호는 20자 이하여야 합니다.')
            .refine(
              (value) => /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(value),
              '비밀번호는 영문과 숫자를 포함해야 합니다.',
            ),
          passwordConfirm: z
            .string({ required_error: '비밀번호 확인을 입력해주세요.' })
            .min(1, '비밀번호 확인을 입력해주세요.'),
        })
        .superRefine(({ password, passwordConfirm }, ctx) => {
          if (password !== passwordConfirm) {
            ctx.addIssue({
              code: 'custom',
              message: '비밀번호가 일치하지 않습니다.',
              path: ['passwordConfirm'],
            });
          }
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
      <Title
        title="국민대학교 소프트웨어융합대학 유일무이 Web 동아리"
        subTitle="부원 확인을 위하여 회원 가입 요청 후 승인 까지 수 일이 소요될 수 있습니다."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-72 sm:w-96 mt-12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="이름" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="학번" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input placeholder="국민대학교 이메일" {...field} />
                    <Button variant="outline" type="button">
                      전송
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verifyCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input placeholder="인증코드" {...field} />
                    <Button variant="outline" type="button">
                      확인
                    </Button>
                  </div>
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="비밀번호 확인" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-4" type="submit">
            회원가입
          </Button>

          <div className="flex space-x-2 w-full justify-center">
            <p className="text-sm text-neutral-500">이미 계정이 있으신가요?</p>
            <a
              className="text-sm text-wink-500 cursor-pointer hover:underline"
              onClick={() => router.push('/auth/login')}
            >
              로그인
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
