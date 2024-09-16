'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Fields, FormContainer, TextField, WebInKookmin } from '@/component';

import { useForm } from '@/hook';

import { WinkApi } from '@/api';

import * as yup from 'yup';

type Inputs =
  | 'studentId'
  | 'name'
  | 'email'
  | 'verifyCode'
  | 'verifyToken'
  | 'password'
  | 'confirmPassword';

const SignUpPage = () => {
  const router = useRouter();

  const [isSendCode, setSendCode] = useState(false);

  const { values, setValues, errors, validate, onChange } = useForm<Inputs, string>(
    yup.object({
      studentId: yup
        .string()
        .required('학번을 입력해주세요.')
        .test('is-number', '학번은 숫자로만 입력해주세요.', (value) => !isNaN(Number(value)))
        .length(8, '학번은 8자리 입니다.'),
      name: yup
        .string()
        .required('이름을 입력해주세요.')
        .min(2, '이름은 2자리 이상입니다.')
        .max(4, '이름은 4자리 이하입니다.')
        .matches(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.'),
      email: yup
        .string()
        .required('이메일을 입력해주세요.')
        .email('이메일 형식이 아닙니다.')
        .matches(/^[a-zA-Z0-9._%+-]+@kookmin\.ac\.kr$/i, '국민대학교 이메일 형식이어야 합니다.'),
      verifyCode: yup
        .string()
        .required('인증 코드를 입력해주세요.')
        .test('is-number', '인증 코드는 숫자로만 입력해주세요.', (value) => !isNaN(Number(value)))
        .length(6, '인증 코드는 6자리 입니다.'),
      verifyToken: yup.string().required('인증 토큰을 입력해주세요.'),
      password: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '비밀번호는 8자리 이상입니다.')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,}$/,
          '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
        ),
      confirmPassword: yup
        .string()
        .required('비밀번호 확인을 입력해주세요.')
        .test(
          'password-match',
          '비밀번호가 일치하지 않습니다.',
          (value): boolean => value === values.password,
        ),
    }),
  );

  const fields: Fields<Inputs>[] = [
    { id: 'studentId', type: 'text', placeholder: '학번', maxLength: 8 },
    { id: 'name', type: 'text', placeholder: '이름', maxLength: 4 },
    {
      id: 'email',
      type: 'email',
      placeholder: '이메일',
      disabled: !!values.verifyToken,
      button: (
        <Button
          className="w-32 py-4.5 px-2 text-sm"
          type="button"
          label="인증번호 요청"
          hidden={!!values.verifyToken}
          disabled={!values.email || !!errors.email}
          onClick={onVerifyCodeSendButtonClick}
        />
      ),
    },
    {
      id: 'verifyCode',
      placeholder: '인증 코드',
      maxLength: 6,
      hidden: !isSendCode || !!values.verifyToken,
      button: (
        <Button
          className="w-28 py-2 text-sm"
          type="button"
          label="인증번호 확인"
          disabled={!values.verifyCode || !!errors.verifyCode}
          onClick={onVerifyCodeButtonClick}
        />
      ),
    },
    { id: 'verifyToken', type: 'text', placeholder: '인증 토큰', hidden: true },
    { id: 'password', type: 'password', placeholder: '비밀번호' },
    { id: 'confirmPassword', type: 'password', placeholder: '비밀번호 확인' },
  ];

  const proxyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'studentId' || id === 'verifyCode') {
      if (isNaN(Number(value))) {
        return;
      }
    }

    onChange(e);
  };

  async function onVerifyCodeSendButtonClick() {
    await WinkApi.Auth.sendCode({
      email: values.email,
    });

    setSendCode(true);

    toast.success('인증 코드가 전송되었습니다.');
  }

  async function onVerifyCodeButtonClick() {
    const { verifyToken } = await WinkApi.Auth.verifyCode({
      email: values.email,
      code: values.verifyCode,
    });

    setValues((prev) => ({ ...prev, verifyToken }));

    toast.success('인증 코드가 확인되었습니다.');
  }

  const onSignUpButtonClick = async () => {
    if (!(await validate())) {
      return;
    }

    await WinkApi.Auth.register({
      name: values.name,
      studentId: values.studentId,
      password: values.password,
      verifyToken: values.verifyToken,
    });

    toast.success('회원 가입 요청이 완료되었습니다.');

    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 mt-14">
        <WebInKookmin />

        <div className="flex flex-col items-center justify-center gap-2.5">
          <p className="text-xl font-normal">국민대학교 소프트웨어융합대학 유일무이 Web 동아리</p>
          <p className="text-lg text-zinc-500 font-normal">
            부원 확인을 위하여 회원 가입 요청 후 승인 까지 수 일이 소요될 수 있습니다.
          </p>
        </div>

        <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <FormContainer
              values={values}
              errors={errors}
              onChange={proxyOnChange}
              onEnter={onSignUpButtonClick}
            >
              {fields
                .filter((options) => !options.hidden)
                .map(({ id, button, ...rest }) => (
                  <div key={id} className="flex items-center gap-2.5">
                    <TextField id={id} {...rest} />

                    {button && button}
                  </div>
                ))}
            </FormContainer>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Button
              type="button"
              label="회원 가입 요청"
              onClick={onSignUpButtonClick}
              className="w-full py-2 text-sm"
            />

            <div className="text-center text-xs">
              이미 회원이신가요?
              <Link
                href="/auth/login"
                className="text-wink-500 hover:underline hover:text-wink-600 ml-1.5"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
