import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Stack } from '@/app/recruit/form/_component/StackButton';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';

import BallotBox from '@/public/recruit/icon/ballot_box.avif';

import { RecruitStepProps } from '@/app/recruit/form/page';
import { formatDate } from '@/lib/util';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step18({ go, recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState<boolean>(false);

  const [stacks, setStacks] = useState<Stack[]>([]);

  useEffect(() => {
    const _stacks = localStorage.getItem('recruit:stacks');

    if (!_stacks) return;

    setStacks(JSON.parse(_stacks));
  }, []);

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
        <p className="font-medium text-lg">지원서를 제출할까요?</p>
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
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(1);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">이름</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('name')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(2);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">학번</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('studentId')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(3);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">학과</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('department')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(4);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">이메일</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('email')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(5);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">전화번호</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('phoneNumber')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(6);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">지원동기</TableHead>
              <TableCell className="break-all whitespace-pre-line hover:underline cursor-pointer">
                {form.getValues('jiwonDonggi')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(7);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">자기소개</TableHead>
              <TableCell className="break-all whitespace-pre-line hover:underline cursor-pointer">
                {form.getValues('selfIntroduce')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(8);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">대외활동</TableHead>
              <TableCell className="whitespace-pre-wrap hover:underline cursor-pointer">
                {form.getValues('outings').join('\n') || '-'}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                sessionStorage.setItem('recruit:final_edit', 'true');
                go(9);
              }}
            >
              <TableHead className="w-[180px] hover:underline cursor-pointer">
                면접 가능한 날짜
              </TableHead>
              <TableCell className="whitespace-pre-wrap hover:underline cursor-pointer">
                {form
                  .getValues('interviewDates')
                  .map((date) =>
                    date === '0001-01-01'
                      ? `기타 (사유: ${form.getValues('whyCannotInterview')})`
                      : formatDate(date, true),
                  )
                  .join('\n')}
              </TableCell>
            </TableRow>
            {sessionStorage.getItem('recruit:prev-develop') !== 'false' && (
              <>
                <TableRow
                  onClick={() => {
                    sessionStorage.setItem('recruit:final_edit', 'true');
                    go(11);
                  }}
                >
                  <TableHead className="w-[180px] hover:underline cursor-pointer">
                    Github 아이디
                  </TableHead>
                  <TableCell className="hover:underline cursor-pointer">
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
                {stacks.includes('frontend') && (
                  <TableRow
                    onClick={() => {
                      sessionStorage.setItem('recruit:final_edit', 'true');
                      go(13);
                    }}
                  >
                    <TableHead className="w-[180px] hover:underline cursor-pointer">
                      프론트엔드 기술 스택
                    </TableHead>
                    <TableCell className="hover:underline cursor-pointer">
                      {form.getValues('frontendTechStacks')!.length > 0
                        ? form
                            .getValues('frontendTechStacks')!
                            .map((s) => s as unknown as keyof typeof FrontendTechStack)
                            .map((s) => FrontendTechStack[s])
                            .join(', ')
                        : '-'}
                    </TableCell>
                  </TableRow>
                )}
                {stacks.includes('backend') && (
                  <TableRow
                    onClick={() => {
                      sessionStorage.setItem('recruit:final_edit', 'true');
                      go(14);
                    }}
                  >
                    <TableHead className="w-[180px] hover:underline cursor-pointer">
                      백엔드 기술 스택
                    </TableHead>
                    <TableCell className="hover:underline cursor-pointer">
                      {form.getValues('backendTechStacks')!.length > 0
                        ? form
                            .getValues('backendTechStacks')!
                            .map((s) => s as unknown as keyof typeof BackendTechStack)
                            .map((s) => BackendTechStack[s])
                            .join(', ')
                        : '-'}
                    </TableCell>
                  </TableRow>
                )}
                {stacks.includes('devops') && (
                  <TableRow
                    onClick={() => {
                      sessionStorage.setItem('recruit:final_edit', 'true');
                      go(15);
                    }}
                  >
                    <TableHead className="w-[180px] hover:underline cursor-pointer">
                      데브옵스 기술 스택
                    </TableHead>
                    <TableCell className="hover:underline cursor-pointer">
                      {form.getValues('devOpsTechStacks')!.length > 0
                        ? form
                            .getValues('devOpsTechStacks')!
                            .map((s) => s as unknown as keyof typeof DevOpsTechStack)
                            .map((s) => DevOpsTechStack[s])
                            .join(', ')
                        : '-'}
                    </TableCell>
                  </TableRow>
                )}
                {stacks.includes('design') && (
                  <TableRow
                    onClick={() => {
                      sessionStorage.setItem('recruit:final_edit', 'true');
                      go(16);
                    }}
                  >
                    <TableHead className="w-[180px] hover:underline cursor-pointer">
                      디자인 기술 스택
                    </TableHead>
                    <TableCell className="hover:underline cursor-pointer">
                      {form.getValues('designTechStacks')!.length > 0
                        ? form
                            .getValues('designTechStacks')!
                            .map((s) => s as unknown as keyof typeof DesignTechStack)
                            .map((s) => DesignTechStack[s])
                            .join(', ')
                        : '-'}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow
                  onClick={() => {
                    sessionStorage.setItem('recruit:final_edit', 'true');
                    go(17);
                  }}
                >
                  <TableHead className="w-[180px] hover:underline cursor-pointer">
                    가장 기억에 남는 프로젝트
                  </TableHead>
                  <TableCell className="whitespace-pre-line hover:underline cursor-pointer">
                    {form.getValues('favoriteProject') || '-'}
                  </TableCell>
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
                await Api.Domain.Recruit.recruitForm(recruit.id, {
                  ...form.getValues(),
                  whyCannotInterview: form.getValues('whyCannotInterview') || undefined,
                  github: form.getValues('github') || undefined,
                  favoriteProject: form.getValues('favoriteProject') || undefined,
                });

                localStorage.removeItem('recruit:data');
                localStorage.removeItem('recruit:stacks');
                localStorage.removeItem('recruit:step');
                sessionStorage.setItem('recruit:confetti', 'true');
                sessionStorage.removeItem('recruit:prev-develop');
                sessionStorage.removeItem('recruit:back');

                router.push('/recruit');
              },
              {
                loading: '지원서를 제출하고 있습니다.',
                success: (
                  <div className="flex flex-col space-y-2">
                    <p className="font-medium">지원서를 제출했습니다.</p>
                    <p className="text-neutral-500">
                      면접 대상자는 추후 문자와 이메일로 안내될 예정입니다.
                    </p>
                  </div>
                ),
                duration: 1000 * 60 * 3,
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
