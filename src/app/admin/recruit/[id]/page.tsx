'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

import FinalizeInterviewModal from '@/app/admin/recruit/[id]/_component/modal/finalize-interview';
import FinalizePaperModal from '@/app/admin/recruit/[id]/_component/modal/finalize-paper';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';
import { Separator } from '@/ui/separator';
import { SidebarTrigger, useSidebar } from '@/ui/sidebar';
import { Skeleton } from '@/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Recruit, { Step } from '@/api/type/schema/recruit';
import RecruitForm, {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';
import { useApi } from '@/api/useApi';

import { cn, formatDate } from '@/util';

import Loading from '@/app/loading';

import { FileUser, Speech } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';

interface AdminRecruitDetailPageProps {
  params: { id: string };
}

export default function AdminRecruitDetailPage({ params }: AdminRecruitDetailPageProps) {
  const [isApi, startApi] = useApi();

  const { state } = useSidebar();

  const [query, setQuery] = useQueryState('query', parseAsString.withDefault(''));

  const [recruit, setRecruit] = useState<Recruit>();
  const [forms, setForms] = useState<RecruitForm[]>([]);
  const [queriedForms, setQueriedForms] = useState<RecruitForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<RecruitForm>();

  const [finalizePaperModalOpen, setFinalizePaperModalOpen] = useState(false);
  const [finalizeInterviewModalOpen, setFinalizeInterviewModalOpen] = useState(false);

  const paperClear = useCallback(async (recruit: Recruit, form: RecruitForm) => {
    await Api.Domain.AdminRecruitForm.paperClear(recruit.id, form.id);

    setForms((prev) =>
      prev ? prev.map((a) => (a.id === form.id ? { ...form, paperPass: null } : a)) : [],
    );

    setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, paperPass: null } : prev));
  }, []);

  const paperPass = useCallback(async (recruit: Recruit, form: RecruitForm) => {
    await Api.Domain.AdminRecruitForm.paperPass(recruit.id, form.id);

    setForms((prev) =>
      prev ? prev.map((a) => (a.id === form.id ? { ...form, paperPass: true } : a)) : [],
    );

    setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, paperPass: true } : prev));
  }, []);

  const paperFail = useCallback(
    async (recruit: Recruit, form: RecruitForm) => {
      await Api.Domain.AdminRecruitForm.paperFail(recruit.id, form.id);

      setForms((prev) =>
        prev ? prev.map((a) => (a.id === form.id ? { ...form, paperPass: false } : a)) : [],
      );

      setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, paperPass: false } : prev));
    },
    [recruit],
  );

  const interviewClear = useCallback(async (recruit: Recruit, form: RecruitForm) => {
    await Api.Domain.AdminRecruitForm.interviewClear(recruit.id, form.id);

    setForms((prev) =>
      prev ? prev.map((a) => (a.id === form.id ? { ...form, interviewPass: null } : a)) : [],
    );

    setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, interviewPass: null } : prev));
  }, []);

  const interviewPass = useCallback(async (recruit: Recruit, form: RecruitForm) => {
    await Api.Domain.AdminRecruitForm.interviewPass(recruit.id, form.id);

    setForms((prev) =>
      prev ? prev.map((a) => (a.id === form.id ? { ...form, interviewPass: true } : a)) : [],
    );

    setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, interviewPass: true } : prev));
  }, []);

  const interviewFail = useCallback(async (recruit: Recruit, form: RecruitForm) => {
    await Api.Domain.AdminRecruitForm.interviewFail(recruit.id, form.id);

    setForms((prev) =>
      prev ? prev.map((a) => (a.id === form.id ? { ...form, interviewPass: false } : a)) : [],
    );

    setSelectedForm((prev) => (prev?.id === form.id ? { ...prev, interviewPass: false } : prev));
  }, []);

  useEffect(() => {
    startApi(async () => {
      const { recruit } = await Api.Domain.AdminRecruit.getRecruit(params.id);
      setRecruit(recruit);

      const { forms } = await Api.Domain.AdminRecruitForm.getForms(params.id);
      setForms(forms);
    });
  }, [params.id]);

  useEffect(() => {
    if (forms.length <= 0) return;
    if (!selectedForm) {
      setSelectedForm(forms[0]);
    }
  }, [forms]);

  useEffect(() => {
    setQueriedForms(
      forms
        .filter(
          (form) =>
            form.name.includes(query) ||
            form.studentId.includes(query) ||
            form.email.includes(query) ||
            form.phoneNumber.includes(query),
        )
        .sort((a, b) => {
          const rank = (form: RecruitForm) => {
            if (form.paperPass && form.interviewPass === null) return 1;
            if (form.paperPass && form.interviewPass === true) return 2;
            if (form.paperPass && form.interviewPass === false) return 3;
            if (form.interviewPass === null && form.paperPass === null) return 4;
            if (form.interviewPass === null && form.paperPass === true) return 5;
            if (form.interviewPass === null && form.paperPass === false) return 6;
            return 7;
          };

          const rankDiff = rank(a) - rank(b);
          return rankDiff !== 0 ? rankDiff : a.name.localeCompare(b.name);
        }),
    );
  }, [forms, query]);

  if (!recruit) return <Loading />;

  return (
    <>
      <div className="flex space-x-1 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <div className="pl-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>관리자 페이지</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>모집</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {recruit.year}년 {recruit.semester}학기
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col md:flex-row gap-2">
          <Link href={`/admin/recruit/${recruit.id}/statistics`}>
            <Button variant="outline" className="w-full">
              통계
            </Button>
          </Link>

          <Input
            placeholder="검색어를 입력해주세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {recruit.step === Step.PRE && (
            <>
              {selectedForm && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="w-full md:w-fit"
                    onClick={() =>
                      selectedForm.paperPass !== false
                        ? paperFail(recruit!, selectedForm)
                        : paperClear(recruit!, selectedForm)
                    }
                  >
                    {selectedForm.paperPass !== false ? '불합격' : '초기화'}
                  </Button>
                  <Button
                    variant="wink"
                    className="w-full md:w-fit"
                    onClick={() =>
                      selectedForm.paperPass !== true
                        ? paperPass(recruit!, selectedForm)
                        : paperClear(recruit!, selectedForm)
                    }
                  >
                    {selectedForm.paperPass !== true ? '합격' : '초기화'}
                  </Button>
                </div>
              )}
              {!(forms?.some((x) => x.paperPass === null) || forms.length === 0) && (
                <Button variant="outline" onClick={() => setFinalizePaperModalOpen(true)}>
                  확정
                </Button>
              )}
            </>
          )}

          {recruit.step === Step.PAPER_END && (
            <>
              {selectedForm && selectedForm.paperPass && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="w-full md:w-fit"
                    onClick={() =>
                      selectedForm.interviewPass !== false
                        ? interviewFail(recruit!, selectedForm)
                        : interviewClear(recruit!, selectedForm)
                    }
                  >
                    {selectedForm.interviewPass !== false ? '불합격' : '초기화'}
                  </Button>
                  <Button
                    variant="wink"
                    className="w-full md:w-fit"
                    onClick={() =>
                      selectedForm.interviewPass !== true
                        ? interviewPass(recruit!, selectedForm)
                        : interviewClear(recruit!, selectedForm)
                    }
                  >
                    {selectedForm.interviewPass !== true ? '합격' : '초기화'}
                  </Button>
                </div>
              )}
              {!forms?.some((x) => x.paperPass && x.interviewPass === null) && (
                <Button variant="outline" onClick={() => setFinalizeInterviewModalOpen(true)}>
                  확정
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <ScrollArea className={state === 'expanded' ? 'md:w-[calc(100dvw-315px)]' : 'md:w-screen'}>
        <div className="flex space-x-3">
          {isApi ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} className="w-[150px] h-[70px] rounded-md " />
            ))
          ) : queriedForms && queriedForms.length > 0 ? (
            queriedForms?.map((form) => (
              <div
                key={form.id}
                className={cn(
                  'w-[150px] border rounded-md px-5 py-3 shadow cursor-pointer hover:bg-neutral-50',
                  form.id === selectedForm?.id ? 'bg-neutral-50 hover:bg-neutral-100/75' : '',
                )}
                onClick={() => setSelectedForm(form)}
              >
                <div className="flex justify-between">
                  <p className="font-medium">{form.name}</p>

                  <div className="flex space-x-1">
                    {form.paperPass === null ? (
                      <FileUser className="w-[18px] h-[18px] text-neutral-600" />
                    ) : form.paperPass ? (
                      <FileUser className="w-[18px] h-[18px] text-green-600" />
                    ) : (
                      <FileUser className="w-[18px] h-[18px] text-red-600" />
                    )}

                    {recruit?.step !== Step.PRE &&
                      form.paperPass &&
                      (form.interviewPass === null ? (
                        <Speech className="w-[18px] h-[18px] text-neutral-600" />
                      ) : form.interviewPass ? (
                        <Speech className="w-[18px] h-[18px] text-green-600" />
                      ) : (
                        <Speech className="w-[18px] h-[18px] text-red-600" />
                      ))}
                  </div>
                </div>
                <p className="text-neutral-500 text-sm">{form.studentId}</p>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">검색 결과가 없습니다.</p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {selectedForm && (
        <Table className="w-full">
          <TableBody>
            <TableRow>
              <TableHead className="w-[180px]">이름</TableHead>
              <TableCell>{selectedForm.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">학번</TableHead>
              <TableCell>{selectedForm.studentId}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">학과</TableHead>
              <TableCell>{selectedForm.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">이메일</TableHead>
              <TableCell>{selectedForm.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">전화번호</TableHead>
              <TableCell>{selectedForm.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">
                지원동기
                <br />
                <span className="text-xs font-light">({selectedForm.jiwonDonggi.length}자)</span>
              </TableHead>
              <TableCell className="whitespace-pre-line break-all">
                {selectedForm.jiwonDonggi}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">
                자기소개
                <br />
                <span className="text-xs font-light">({selectedForm.selfIntroduce.length}자)</span>
              </TableHead>
              <TableCell className="whitespace-pre-line break-all">
                {selectedForm.selfIntroduce}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">외부활동</TableHead>
              <TableCell className="whitespace-pre-line">
                {selectedForm.outings.join('\n')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">면접 날짜</TableHead>
              <TableCell className="whitespace-pre-line">
                {selectedForm.whyCannotInterview
                  ? selectedForm.whyCannotInterview
                  : selectedForm.interviewDates.map((date) => formatDate(date, true)).join('\n')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">Github</TableHead>
              <TableCell>
                {selectedForm.github ? (
                  <Link
                    href={`https://github.com/${selectedForm.github}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-600/90"
                  >
                    {selectedForm.github}
                  </Link>
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">프론트엔드 기술</TableHead>
              <TableCell>
                {selectedForm.frontendTechStacks.length > 0
                  ? selectedForm.frontendTechStacks
                      .map((s) => s as unknown as keyof typeof FrontendTechStack)
                      .map((s) => FrontendTechStack[s])
                      .join(', ')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">백엔드 기술</TableHead>
              <TableCell>
                {selectedForm.backendTechStacks.length > 0
                  ? selectedForm.backendTechStacks
                      .map((s) => s as unknown as keyof typeof BackendTechStack)
                      .map((s) => BackendTechStack[s])
                      .join(', ')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">데브옵스 기술</TableHead>
              <TableCell>
                {selectedForm.devOpsTechStacks.length > 0
                  ? selectedForm.devOpsTechStacks
                      .map((s) => s as unknown as keyof typeof DevOpsTechStack)
                      .map((s) => DevOpsTechStack[s])
                      .join(', ')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">디자인 기술</TableHead>
              <TableCell>
                {selectedForm.designTechStacks.length > 0
                  ? selectedForm.designTechStacks
                      .map((s) => s as unknown as keyof typeof DesignTechStack)
                      .map((s) => DesignTechStack[s])
                      .join(', ')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">
                스스로 공부하거나 기억에 남는 프로젝트
                {selectedForm.favoriteProject && (
                  <>
                    <br />
                    <span className="text-xs font-light">
                      ({selectedForm.favoriteProject.length}자)
                    </span>
                  </>
                )}
              </TableHead>
              <TableCell className="whitespace-pre-line break-all">
                {selectedForm.favoriteProject || '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      <FinalizePaperModal
        open={finalizePaperModalOpen}
        setOpen={setFinalizePaperModalOpen}
        recruit={recruit}
        callback={() =>
          setRecruit((prev) => (prev ? { ...prev, step: Step.PAPER_END } : undefined))
        }
      />

      <FinalizeInterviewModal
        open={finalizeInterviewModalOpen}
        setOpen={setFinalizeInterviewModalOpen}
        recruit={recruit}
        callback={() =>
          setRecruit((prev) => (prev ? { ...prev, step: Step.INTERVIEW_END } : undefined))
        }
      />
    </>
  );
}
