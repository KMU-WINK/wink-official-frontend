'use client';

import React, { useState } from 'react';
import { WinkApi } from '@/api';
import { Button, InputField } from '@/components';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import web_in_kookmin from '@/public/web_in_kookmin.svg';

interface InputFieldType {
  id: 'email' | 'password';
  type: string;
  placeholder: string;
}

const inputFields: InputFieldType[] = [
  {
    id: 'email',
    type: 'email',
    placeholder: '학교 이메일',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setUser } = useUserStore.getState();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onClickLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { code, error, content } = await WinkApi.Auth.login({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(`Error: ${code} - ${content.unwrapError()}`);
      return;
    }

    const { accessToken, refreshToken } = content.unwrap();
    WinkApi.Request.setToken(accessToken, refreshToken);

    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-[50px]">
        <div className="text-center gap-6">
          <Image src={web_in_kookmin} alt="WINK Authentication" width={610} height={110} priority />

          <p className="mt-[38px] text-xl font-normal font-roboto">
            국민대학교 소프트웨어융합대학 유일무이 Web 동아리
          </p>
        </div>

        <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            {inputFields.map((field) => (
              <InputField
                key={field.id}
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={onChangeInput}
              />
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
