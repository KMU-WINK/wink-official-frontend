import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';

import { RecruitStepProps } from '@/app/recruit/form/page';
import { formatDate } from '@/lib/util';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Step18({ recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <Send size={64} />

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
        <p className="font-medium text-lg">지원서를 제출하시겠습니까?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.75,
            duration: 0.5,
            ease: 'easeInOut',
          },
        }}
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
              <TableHead className="w-[180px]">학과</TableHead>
              <TableCell>{form.getValues('department')}</TableCell>
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
              <TableCell className="break-all">{form.getValues('jiwonDonggi')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">자기소개</TableHead>
              <TableCell className="break-all">{form.getValues('selfIntroduce')}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">대외활동</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form
                  .getValues('outings')

                  .join('\n') || '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">면접 가능한 날짜</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {form
                  .getValues('interviewDates')
                  .map((date) => formatDate(date, true))
                  .join('\n')}
              </TableCell>
            </TableRow>
            {sessionStorage.getItem('recruit:prev-develop') !== 'false' && (
              <>
                <TableRow>
                  <TableHead className="w-[180px]">Github 아이디</TableHead>
                  <TableCell>
                    {form.getValues('github') ? (
                      <Link
                        href={`https://github.com/${form.getValues('github')}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-600/90"
                      >
                        {form.getValues('github')}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[180px]">프론트엔드 기술 스택</TableHead>
                  <TableCell className="whitespace-pre-wrap">
                    {form.getValues('frontendTechStacks')!.length > 0
                      ? form
                          .getValues('frontendTechStacks')!
                          .map((s) => s as unknown as keyof typeof FrontendTechStack)
                          .map((s) => FrontendTechStack[s])
                          .join(', ')
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[180px]">백엔드 기술 스택</TableHead>
                  <TableCell className="whitespace-pre-wrap">
                    {form.getValues('backendTechStacks')!.length > 0
                      ? form
                          .getValues('backendTechStacks')!
                          .map((s) => s as unknown as keyof typeof BackendTechStack)
                          .map((s) => BackendTechStack[s])
                          .join(', ')
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[180px]">데브옵스 기술 스택</TableHead>
                  <TableCell className="whitespace-pre-wrap">
                    {form.getValues('devOpsTechStacks')!.length > 0
                      ? form
                          .getValues('devOpsTechStacks')!
                          .map((s) => s as unknown as keyof typeof DevOpsTechStack)
                          .map((s) => DevOpsTechStack[s])
                          .join(', ')
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[180px]">디자인 기술 스택</TableHead>
                  <TableCell className="whitespace-pre-wrap">
                    {form.getValues('designTechStacks')!.length > 0
                      ? form
                          .getValues('designTechStacks')!
                          .map((s) => s as unknown as keyof typeof DesignTechStack)
                          .map((s) => DesignTechStack[s])
                          .join(', ')
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-[180px]">가장 기억에 남는 프로젝트</TableHead>
                  <TableCell>{form.getValues('favoriteProject') || '-'}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 3.1,
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
                await Api.Domain.Recruit.recruitForm(recruit.id, {
                  ...form.getValues(),
                  github: form.getValues('github') || undefined,
                  favoriteProject: form.getValues('favoriteProject') || undefined,
                });

                localStorage.setItem('recruit:confetti', 'true');
                localStorage.removeItem('recruit:data');
                localStorage.removeItem('recruit:stacks');
                localStorage.removeItem('recruit:step');
                sessionStorage.removeItem('recruit:prev-develop');
                sessionStorage.removeItem('recruit:back');

                router.push('/recruit');
              },
              {
                loading: '지원서를 쓰고 있습니다.',
                success: '지원이 완료되었습니다.',
                finally: () => setClicked(false),
              },
            );
          }}
        >
          지원하기
        </Button>
      </motion.div>
    </>
  );
}
