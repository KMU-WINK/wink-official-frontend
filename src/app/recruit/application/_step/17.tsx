import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { domains } from '@/app/recruit/_constant/domain';
import {
  backendTechStacks,
  designTechStacks,
  devOpsTechStacks,
  frontendTechStacks,
} from '@/app/recruit/application/_constant/tech_stack';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';

import { RecruitStepProps } from '@/app/recruit/application/page';
import { formatDate } from '@/lib/util';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Step17({ recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsProcessing(true);

    await Api.Domain.Recruit.application(recruit.id, {
      ...form.getValues(),
      github: form.getValues('github') || undefined,
      favoriteProject: form.getValues('favoriteProject') || undefined,
      lastComment: form.getValues('lastComment') || undefined,
    });

    toast.success('지원이 완료되었습니다.');

    router.push('/recruit');

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
        <p className="font-medium text-lg">지원서를 제출하시겠습니까?</p>
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
              <TableHead className="w-[180px]">이름</TableHead>
              <TableCell>{form.getValues('name')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">학번</TableHead>
              <TableCell>{form.getValues('studentId')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">이메일</TableHead>
              <TableCell>{form.getValues('email')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">전화번호</TableHead>
              <TableCell>{form.getValues('phoneNumber')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">지원동기</TableHead>
              <TableCell>{form.getValues('jiwonDonggi')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">배우고 싶은 점</TableHead>
              <TableCell>{form.getValues('baeugoSipeunJeom')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">면접 가능한 날짜</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form
                  .getValues('canInterviewDates')
                  .map((date) => formatDate(date, true))
                  .join('\n')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">지원 분야</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form
                  .getValues('domains')
                  .map((domain) => domains.find((d) => d.raw === domain)!.domain)
                  .join('\n')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">Github 아이디</TableHead>
              <TableCell>{form.getValues('github') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">프론트엔드 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form.getValues('frontendTechStacks')!.length > 0
                  ? form
                      .getValues('frontendTechStacks')!
                      .map((techStack) => frontendTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">백엔드 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form.getValues('backendTechStacks')!.length > 0
                  ? form
                      .getValues('backendTechStacks')!
                      .map((techStack) => backendTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">DevOps 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form.getValues('devOpsTechStacks')!.length > 0
                  ? form
                      .getValues('devOpsTechStacks')!
                      .map((techStack) => devOpsTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">디자인 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form.getValues('designTechStacks')!.length > 0
                  ? form
                      .getValues('designTechStacks')!
                      .map((techStack) => designTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableHead className="w-[180px]">가장 기억에 남는 프로젝트</TableHead>
              <TableCell>{form.getValues('favoriteProject') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">마지막 한마디</TableHead>
              <TableCell>{form.getValues('lastComment') || '-'}</TableCell>
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
          지원하기
        </Button>
      </motion.div>
    </>
  );
}
