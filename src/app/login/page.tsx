'use client';

import React from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Fields, FormContainer, TextField, WebInKookmin } from '@/component';

import { useForm } from '@/hook';

import { WinkApi } from '@/api';

import * as yup from 'yup';

type Inputs = 'email' | 'password';

const LoginPage = () => {
  const router = useRouter();

  const { values, errors, validate, onChange } = useForm<Inputs, string>(
    yup.object({
      email: yup.string().required('이메일을 입력해주세요.').email('이메일 형식이 아닙니다.'),
      password: yup.string().required('비밀번호를 입력해주세요.'),
    }),
  );

  const fields: Fields<Inputs>[] = [
    { id: 'email', type: 'email', placeholder: '이메일' },
    {
      id: 'password',
      type: 'password',
      placeholder: '비밀번호',
    },
  ];

  const onLoginButtonClick = async () => {
    if (!(await validate())) {
      return;
    }

    const { accessToken, refreshToken } = await WinkApi.Auth.login({
      email: values.email,
      password: values.password,
    });

    WinkApi.Request.setToken(accessToken, refreshToken);

    toast.success('로그인에 성공했습니다.');

    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-12">
        <div className="text-center gap-6">
          <WebInKookmin />

          <p className="mt-9 text-xl font-normal">
            국민대학교 소프트웨어융합대학 유일무이 Web 동아리
          </p>
        </div>

        <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <FormContainer
              values={values}
              errors={errors}
              onChange={onChange}
              onEnter={onLoginButtonClick}
            >
              {fields.map(({ id, ...rest }) => (
                <TextField key={id} id={id} {...rest} />
              ))}
            </FormContainer>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Button
              type="button"
              label="로그인"
              onClick={onLoginButtonClick}
              className="w-full py-2 text-base"
            />

            <div className="text-center text-xs">
              회원이 아니신가요?
              <Link
                href="/signup"
                className="text-wink-300 hover:underline hover:text-wink-500 ml-1.5"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
