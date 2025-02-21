'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import RegisterModal from '@/app/auth/register/_component/modal/register-modal';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import PreUser from '@/api/type/schema/pre-user';
import { useApi } from '@/api/useApi';

import Loading from '@/app/loading';

import { parseAsString, useQueryState } from 'nuqs';
import { toast } from 'sonner';

export default function AuthRegisterPage() {
  const router = useRouter();

  const [isApi, startApi] = useApi();

  const [token] = useQueryState('token', parseAsString.withDefault(''));

  const [user, setUser] = useState<PreUser>();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    startApi(async () => {
      const { isValid, user } = await Api.Domain.Auth.checkRegister({ token });

      if (!isValid) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
        return;
      }

      setUser(user);
    });
  }, []);

  if (isApi || !user) return <Loading />;

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium">사용자 정보 확인</p>
          <p className="text-sm text-neutral-500">아래 정보가 올바른지 확인해주세요.</p>
        </div>

        <Table className="w-full max-w-[300px] sm:max-w-[600px]">
          <TableBody>
            <TableRow>
              <TableHead className="min-w-[85px]">이름</TableHead>
              <TableCell>{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="min-w-[85px]">학번</TableHead>
              <TableCell>{user.studentId}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="min-w-[85px]">학부(과)</TableHead>
              <TableCell>{user.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="min-w-[85px]">이메일</TableHead>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="min-w-[85px]">전화번호</TableHead>
              <TableCell>{user.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex space-x-4">
          <Button
            variant="destructive"
            onClick={() => {
              toast.error('임원진에게 문의해주세요.');
              router.push('/');
            }}
          >
            수정이 필요해요
          </Button>

          <Button variant="wink" onClick={() => setRegisterModalOpen(true)}>
            다음으로
          </Button>
        </div>
      </div>

      <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} token={token} />
    </>
  );
}
