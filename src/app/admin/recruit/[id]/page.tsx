'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  backendTechStacks,
  designTechStacks,
  devOpsTechStacks,
  frontendTechStacks,
} from '@/app/recruit/application/_constant/tech_stack';

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
import { Skeleton } from '@/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Application from '@/api/type/schema/application';
import Recruit from '@/api/type/schema/recruit';

import { cn, formatDate } from '@/util';

import { Ticket, TicketCheck, TicketX } from 'lucide-react';
import { toast } from 'sonner';

interface AdminRecruitPageProps {
  params: { id: string };
}

export default function AdminRecruitPage({ params }: AdminRecruitPageProps) {
  const router = useRouter();

  const [recruit, setRecruit] = useState<Recruit | null>(null);
  const [applications, setApplications] = useState<Application[] | null>(null);

  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [queriedApplications, setQueriedApplications] = useState<Application[] | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const pass = useCallback(
    async (application: Application) => {
      await Api.Domain.AdminRecruit.passApplication(recruit!.id, application.id);

      setApplications((prev) =>
        prev
          ? prev.map((a) => (a.id === application.id ? { ...application, passed: true } : a))
          : [],
      );

      setSelectedApplication((prev) => (prev ? { ...prev, passed: true } : null));
    },
    [recruit],
  );

  const fail = useCallback(
    async (application: Application) => {
      await Api.Domain.AdminRecruit.failApplication(recruit!.id, application.id);

      setApplications((prev) =>
        prev
          ? prev.map((a) => (a.id === application.id ? { ...application, passed: false } : a))
          : [],
      );

      setSelectedApplication((prev) => (prev ? { ...prev, passed: false } : null));
    },
    [recruit],
  );

  const finalize = useCallback(async () => {
    await Api.Domain.AdminRecruit.finalizeRecruit(recruit!.id);

    setRecruit((prev) => (prev ? { ...prev, finalized: true } : null));

    toast.success('모집을 확정했습니다.');
  }, [recruit]);

  useEffect(() => {
    (async () => {
      try {
        const { recruit } = await Api.Domain.AdminRecruit.getRecruit(params.id);
        setRecruit(recruit);
      } catch (e) {
        router.back();
        throw e;
      }
    })();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { applications } = await Api.Domain.AdminRecruit.getApplications(params.id);

        setLoading(false);
        setApplications(applications);
        if (applications.length > 0) {
          setSelectedApplicationId(applications[0].id);
        }
      } catch (e) {
        router.back();
        throw e;
      }
    })();
  }, [params.id]);

  useEffect(() => {
    setQueriedApplications(
      applications
        ? applications.filter(
            (application) =>
              application.name.includes(query) ||
              application.studentId.includes(query) ||
              application.email.includes(query) ||
              application.phoneNumber.includes(query),
          )
        : [],
    );
  }, [applications, query]);

  useEffect(() => {
    (async () => {
      if (!selectedApplicationId) return;

      const { application } = await Api.Domain.AdminRecruit.getApplication(
        recruit!.id,
        selectedApplicationId,
      );
      setSelectedApplication(application);
    })();
  }, [selectedApplicationId]);

  if (!recruit) return null;

  return (
    <>
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

      <div className="flex space-x-2">
        <Input
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!recruit.finalized && (
          <>
            {selectedApplication && (
              <>
                <Button variant="destructive" onClick={() => fail(selectedApplication)}>
                  불합격
                </Button>
                <Button variant="wink" onClick={() => pass(selectedApplication)}>
                  합격
                </Button>
              </>
            )}
            <Button
              variant="outline"
              disabled={applications?.some((x) => x.passed === null)}
              onClick={finalize}
            >
              확정
            </Button>
          </>
        )}
      </div>

      <ScrollArea className="md:w-[calc(100vw-305px)]">
        <div className="flex space-x-3">
          {loading ? (
            Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} className="w-[150px] h-[70px] rounded-md " />
            ))
          ) : queriedApplications && queriedApplications.length > 0 ? (
            queriedApplications?.map((application) => (
              <div
                key={application.id}
                className={cn(
                  'w-[150px] border rounded-md px-5 py-3 shadow cursor-pointer hover:bg-neutral-50',
                  application.id === selectedApplicationId
                    ? 'bg-neutral-50 hover:bg-neutral-100/75'
                    : '',
                )}
                onClick={() => setSelectedApplicationId(application.id)}
              >
                <div className="flex justify-between">
                  <p className="font-medium">{application.name}</p>
                  {application.passed === null ? (
                    <Ticket className="w-5 h-5 text-neutral-600" />
                  ) : application.passed ? (
                    <TicketCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <TicketX className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="text-neutral-500 text-sm">{application.studentId}</p>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">검색 결과가 없습니다.</p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {selectedApplication && (
        <Table className="w-full">
          <TableBody>
            <TableRow>
              <TableHead className="w-[180px]">이름</TableHead>
              <TableCell>{selectedApplication.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">학번</TableHead>
              <TableCell>{selectedApplication.studentId}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">이메일</TableHead>
              <TableCell>{selectedApplication.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">전화번호</TableHead>
              <TableCell>{selectedApplication.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">지원동기</TableHead>
              <TableCell>{selectedApplication.jiwonDonggi}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">배우고 싶은 점</TableHead>
              <TableCell>{selectedApplication.baeugoSipeunJeom}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">면접 가능한 날짜</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {selectedApplication.canInterviewDates
                  .map((date) => formatDate(date, true))
                  .join('\n')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">Github 아이디</TableHead>
              <TableCell>{selectedApplication.github || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">프론트엔드 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {selectedApplication.frontendTechStacks.length > 0
                  ? selectedApplication.frontendTechStacks
                      .map((techStack) => frontendTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">백엔드 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {selectedApplication.backendTechStacks.length > 0
                  ? selectedApplication.backendTechStacks
                      .map((techStack) => backendTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">DevOps 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {selectedApplication.devOpsTechStacks.length > 0
                  ? selectedApplication.devOpsTechStacks
                      .map((techStack) => devOpsTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">디자인 기술 스택</TableHead>
              <TableCell className="whitespace-pre-wrap">
                {selectedApplication.designTechStacks.length > 0
                  ? selectedApplication.designTechStacks
                      .map((techStack) => designTechStacks.find((t) => t.raw === techStack)!.name)
                      .join('\n')
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">가장 기억에 남는 프로젝트</TableHead>
              <TableCell>{selectedApplication.favoriteProject || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[180px]">마지막 한마디</TableHead>
              <TableCell>{selectedApplication.lastComment || '-'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}
