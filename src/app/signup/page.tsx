'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, InputFieldProps, InputField } from '@/components';

import { WinkApi } from '@/api';

import web_in_kookmin from '@/public/web_in_kookmin.svg';

import * as yup from 'yup';

type InputFieldId =
  | 'studentId'
  | 'name'
  | 'email'
  | 'verificationCode'
  | 'password'
  | 'confirmPassword';

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });
  const [sendCode, setSendCode] = useState<boolean>(false);
  const [verifyToken, setVerifyToken] = useState<string>('');

  const inputFields: InputFieldProps<InputFieldId>[] = [
    {
      id: 'studentId',
      type: 'text',
      placeholder: '학번',
      maxLength: 8,
      validation: yup.string().required('학번을 입력해주세요.').length(8, '학번은 8자리입니다.'),
    },
    {
      id: 'name',
      type: 'text',
      placeholder: '이름',
      maxLength: 4,
      validation: yup
        .string()
        .required('이름을 입력해주세요.')
        .min(2, '이름은 2자리 이상입니다.')
        .max(4, '이름은 4자리 이하입니다.')
        .matches(/^[가-힣]+$/, '이름은 한글로 입력해주세요.'),
    },
    {
      id: 'email',
      type: 'email',
      placeholder: '학교 이메일',
      disabled: verifyToken !== '',
      validation: yup
        .string()
        .required('이메일을 입력해주세요.')
        .email('이메일 형식이 아닙니다.')
        .matches(/^[a-zA-Z0-9._%+-]+@kookmin\.ac\.kr$/i, '국민대학교 이메일을 입력해주세요.'),
      button: (
        <Button
          type="button"
          label="인증번호 발송"
          onClick={async () => {
            await WinkApi.Auth.sendCode({
              email: formData.email,
            });

            setSendCode(true);

            toast.success('인증번호가 전송되었습니다.');
          }}
          className="text-[13px] px-1.5 py-3 w-28"
        />
      ),
    },
    {
      id: 'verificationCode',
      type: 'text',
      placeholder: '인증번호',
      maxLength: 6,
      hidden: !sendCode || verifyToken !== '',
      validation: yup
        .string()
        .required('인증번호를 입력해주세요.')
        .length(6, '인증번호는 6자리입니다.'),
      button: (
        <Button
          type="button"
          label="확인"
          onClick={async () => {
            const { verifyToken } = await WinkApi.Auth.verifyCode({
              email: formData.email,
              code: formData.verificationCode,
            });

            setVerifyToken(verifyToken);

            toast.success('인증이 완료되었습니다.');
          }}
          className="text-[13px] px-1.5 py-3 w-28"
        />
      ),
    },
    {
      id: 'password',
      type: 'password',
      placeholder: '비밀번호',
      validation: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '비밀번호는 8자리 이상입니다.')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,}$/,
          '비밀번호는 영문, 숫자, 특수문자를 포함해야합니다.',
        ),
    },
    {
      id: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호 재확인',
      validation: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .test(
          'passwords-match',
          '비밀번호가 일치하지 않습니다.',
          (value) => value === formData.password,
        ),
    },
  ];

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'studentId' || id === 'verificationCode') {
      if (isNaN(Number(value))) {
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onClickSignUpButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

    if (!verifyToken) {
      toast.error('이메일 인증을 완료해주세요.');
      return;
    }

    await WinkApi.Auth.register({
      name: formData.name,
      studentId: formData.studentId,
      password: formData.password,
      verifyToken,
    });

    toast.success('회원 가입 요청이 완료되었습니다.');

    router.push('/');
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-[50px] mt-[56px]">
        <Image src={web_in_kookmin} alt="WINK Authentication" width={610} height={110} priority />

        <div className="flex flex-col items-center justify-center gap-[10px]">
          <p className="text-xl font-normal">국민대학교 소프트웨어융합대학 유일무이 Web 동아리</p>

          <p className="text-lg text-[#757575] font-normal">
            부원 확인을 위하여 회원 가입 요청 후 승인 까지 수 일이 소요될 수 있습니다.
          </p>
        </div>

        <div className="bg-white px-9 rounded-lg w-full max-w-md flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[15px]">
            {inputFields
              .filter((field) => !field.hidden)
              .map((field) => (
                <div key={field.id} className="flex flex-col gap-[3px]">
                  <div className="flex items-center gap-[10px]">
                    <InputField {...field} value={formData[field.id]} onChange={onChangeInput} />
                    {field.button && field.button}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            <Button
              type="submit"
              label="회원 가입 요청"
              onClick={onClickSignUpButton}
              className="w-full py-2 text-[14px]"
            />

            <div className="text-center text-[11px]">
              이미 회원이신가요?
              <Link href="/login" className="text-[#9DB8FF] hover:underline ml-1.5">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
