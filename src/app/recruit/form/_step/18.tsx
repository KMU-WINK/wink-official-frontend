import React, { useState } from 'react';
import { IconMBallotBoxWithBallot } from 'react-fluentui-emoji/lib/modern';

import ConfirmSurveyModal from '@/app/recruit/form/_component/modal/confirm-survey';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';

import { useRecruitStore } from '@/store/recruit';

import { formatDate } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';

export default function Step18({ go, recruit, form }: RecruitStepProps) {
  const { setModify, developer, stack } = useRecruitStore();

  const [confirmSurveyModalOpen, setConfirmSurveyModalOpen] = useState(false);

  return (
    <>
      <div className="size-[48px] sm:size-[72px]">
        <IconMBallotBoxWithBallot size="auto" />
      </div>

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
                setModify(18);
                go(1);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">이름</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('name')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(2);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">학번</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('studentId')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(3);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">학과</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('department')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(4);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">이메일</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('email')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(5);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">전화번호</TableHead>
              <TableCell className="hover:underline cursor-pointer">
                {form.getValues('phoneNumber')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(6);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">지원동기</TableHead>
              <TableCell className="whitespace-pre-line break-all hover:underline cursor-pointer">
                {form.getValues('jiwonDonggi')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(7);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">자기소개</TableHead>
              <TableCell className="whitespace-pre-line break-all hover:underline cursor-pointer">
                {form.getValues('selfIntroduce')}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(8);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">대외활동</TableHead>
              <TableCell className="whitespace-pre-line break-all hover:underline cursor-pointer">
                {form.getValues('outings').join('\n') || '-'}
              </TableCell>
            </TableRow>
            <TableRow
              onClick={() => {
                setModify(18);
                go(9);
              }}
            >
              <TableHead className="w-[120px] hover:underline cursor-pointer">면접 날짜</TableHead>
              <TableCell className="whitespace-pre-line break-all hover:underline cursor-pointer">
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
            {developer && (
              <>
                <TableRow
                  onClick={() => {
                    setModify(18);
                    go(11);
                  }}
                >
                  <TableHead className="w-[120px] hover:underline cursor-pointer">Github</TableHead>
                  <TableCell className="hover:underline cursor-pointer">
                    {form.getValues('github') ? form.getValues('github') : '-'}
                  </TableCell>
                </TableRow>
                {stack.includes('frontend') && (
                  <TableRow
                    onClick={() => {
                      setModify(18);
                      go(13);
                    }}
                  >
                    <TableHead className="w-[120px] hover:underline cursor-pointer">
                      프론트엔드
                      <br />
                      기술
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
                {stack.includes('backend') && (
                  <TableRow
                    onClick={() => {
                      setModify(18);
                      go(14);
                    }}
                  >
                    <TableHead className="w-[120px] hover:underline cursor-pointer">
                      백엔드 기술
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
                {stack.includes('devops') && (
                  <TableRow
                    onClick={() => {
                      setModify(18);
                      go(15);
                    }}
                  >
                    <TableHead className="w-[120px] hover:underline cursor-pointer">
                      데브옵스 기술
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
                {stack.includes('design') && (
                  <TableRow
                    onClick={() => {
                      setModify(18);
                      go(16);
                    }}
                  >
                    <TableHead className="w-[120px] hover:underline cursor-pointer">
                      디자인 기술
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
                    setModify(18);
                    go(17);
                  }}
                >
                  <TableHead className="w-[120px] hover:underline cursor-pointer">
                    가장 기억에
                    <br />
                    남는 프로젝트
                  </TableHead>
                  <TableCell className="whitespace-pre-line break-all hover:underline cursor-pointer">
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
        <Button variant="wink" onClick={() => setConfirmSurveyModalOpen(true)}>
          지원서 제출하기
        </Button>
      </motion.div>

      <ConfirmSurveyModal
        open={confirmSurveyModalOpen}
        setOpen={setConfirmSurveyModalOpen}
        recruit={recruit}
        form={form}
      />
    </>
  );
}
