import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Step1({ go, user }: RegisterStepProps) {
  const router = useRouter();

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <BadgeCheck size={64} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.25,
            duration: 0.5,
          },
        }}
        onAnimationComplete={() => setTitleAnimationComplete(true)}
      >
        <p className="font-medium text-lg">먼저, 아래 정보를 확인해주세요!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={
          titleAnimationComplete
            ? {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.75,
                  duration: 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>학번</TableHead>
              <TableCell>{user?.studentId}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>이메일</TableHead>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>전화번호</TableHead>
              <TableCell>{user?.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          titleAnimationComplete
            ? {
                opacity: 1,
                transition: {
                  delay: 0.75,
                  duration: 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        className="flex space-x-4"
      >
        <Button
          variant="destructive"
          onClick={() => {
            toast.warning('취소되었습니다.');
            router.push('/');
          }}
        >
          제가 아니에요
        </Button>

        <Button variant="wink" onClick={() => go((prev) => prev + 1)}>
          제가 맞아요
        </Button>
      </motion.div>
    </>
  );
}
