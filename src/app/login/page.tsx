'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, InputField, InputFieldProps, WebInKookmin } from '@/components';

import { WinkApi } from '@/api';

import * as yup from 'yup';

type InputFieldId = 'email' | 'password';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Record<InputFieldId, string>>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<Record<InputFieldId, string>>({
    email: '',
    password: '',
  });

  const inputFields: InputFieldProps<InputFieldId>[] = [
    {
      id: 'email',
      type: 'email',
      placeholder: '이메일',
      validation: yup.string().required('이메일을 입력해주세요.').email('이메일 형식이 아닙니다.'),
    },
    {
      id: 'password',
      type: 'password',
      placeholder: '비밀번호',
      validation: yup.string().required('비밀번호를 입력해주세요.'),
    },
  ];

  const validateAllField = async (): Promise<boolean> => {
    let hasError = false;

    for (let inputField of inputFields) {
      try {
        await inputField?.validation?.validate(formData[inputField.id]);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          hasError = true;

          setError((prevState) => ({
            ...prevState,
            [inputField.id]: error.message,
          }));
        }
      }
    }

    return !hasError;
  };

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onClickLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!(await validateAllField())) {
      return;
    }

    try {
      await Promise.all(
        inputFields.map(async (field) => {
          await field.validation?.validate(formData[field.id]);
        }),
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
        return;
      }
    }

    const { accessToken, refreshToken } = await WinkApi.Auth.login({
      email: formData.email,
      password: formData.password,
    });

    WinkApi.Request.setToken(accessToken, refreshToken);

    toast.success('로그인에 성공했습니다.');

    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-[50px]">
        <div className="text-center gap-6">
          <WebInKookmin />

          <p className="mt-[38px] text-xl font-normal">
            국민대학교 소프트웨어융합대학 유일무이 Web 동아리
          </p>
        </div>

        <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            {inputFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-[3px]">
                <InputField {...field} value={formData[field.id]} onChange={onChangeInput} />
                {error[field.id] && <p className="text-[11px] text-[#FF0000]">{error[field.id]}</p>}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            <Button
              type="submit"
              label="로그인"
              onClick={onClickLoginButton}
              className="w-full py-2 text-[14px]"
            />

            <div className="text-center text-[11px]">
              회원이 아니신가요?
              <Link href="/signup" className="text-[#9DB8FF] hover:underline ml-1.5">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
