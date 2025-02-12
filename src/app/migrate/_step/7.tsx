import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';

import { useRegisterStore } from '@/store/register';

import BallotBox from '@/public/recruit/icon/ballot_box.png';

import { MigrateStepProps } from '@/app/migrate/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step7({ form }: MigrateStepProps) {
  const router = useRouter();

  const { setConfetti } = useRegisterStore();

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Image
        src={BallotBox}
        width={72}
        height={72}
        className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]"
        alt="icon"
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.2,
            duration: 0.4,
          },
        }}
      >
        <p className="font-medium text-lg">WINK에 가입하시겠어요?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: 1.9,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
      >
        <Table className="w-full max-w-[300px] sm:max-w-[600px]">
          <TableBody>
            <TableRow>
              <TableHead className="w-[100px]">이름</TableHead>
              <TableCell>{form.getValues('name')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[100px]">학번</TableHead>
              <TableCell>{form.getValues('studentId')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[100px]">학부(과)</TableHead>
              <TableCell>{form.getValues('department')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[100px]">이메일</TableHead>
              <TableCell>{form.getValues('email')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[100px]">전화번호</TableHead>
              <TableCell>{form.getValues('phoneNumber')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.8,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
      >
        <Button
          variant="wink"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            toast.promise(
              async () => {
                await Api.Domain.Migrate.migrate(form.getValues());
                setConfetti(true);
                router.push('/auth/login');
              },
              {
                loading: 'WINK에 가입하고 있어요!',
                success: '가입이 완료되었습니다.',
                finally: () => setClicked(false),
              },
            );
          }}
        >
          가입하기
        </Button>
      </motion.div>
    </>
  );
}
