import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';

import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Step8({ user, form }: RegisterStepProps) {
  const router = useRouter();

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsProcessing(true);

    await Api.Domain.Auth.register({
      ...form.getValues(),
      description: form.getValues('description') || undefined,
      github: form.getValues('github') || undefined,
      instagram: form.getValues('instagram') || undefined,
      blog: form.getValues('blog') || undefined,
    });

    localStorage.setItem('register-confetti', 'true');

    toast.success('가입이 완료되었습니다.');

    router.push('/auth/login');

    setIsProcessing(false);
  }, [router]);

  return (
    <>
      <Send size={64} />

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
        <p className="font-medium text-lg">이 정보로 가입할까요?</p>
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
        <Table className="w-full max-w-[600px]">
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
            <TableRow>
              <TableHead>한 줄 소개</TableHead>
              <TableCell>{form.getValues('description') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Github 아이디</TableHead>
              <TableCell>{form.getValues('github') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Instagram 아이디</TableHead>
              <TableCell>{form.getValues('instagram') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>블로그 주소</TableHead>
              <TableCell>{form.getValues('blog') || '-'}</TableCell>
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
      >
        <Button variant="wink" disabled={isProcessing} onClick={onSubmit}>
          가입하기
        </Button>
      </motion.div>
    </>
  );
}
