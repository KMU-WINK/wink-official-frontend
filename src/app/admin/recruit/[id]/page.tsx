'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  backendTechStacks,
  designTechStacks,
  devOpsTechStacks,
  frontendTechStacks,
} from '@/app/recruit/application/_constant/tech_stack';

import FinalizeInterviewModal from '@/app/admin/recruit/[id]/_component/modal/finalize-interview';
import FinalizePaperModal from '@/app/admin/recruit/[id]/_component/modal/finalize-paper';

import { Badge } from '@/ui/badge';
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
import Recruit, { Step } from '@/api/type/schema/recruit';

import { cn, formatDate } from '@/util';

import { FileUser, Speech } from 'lucide-react';

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
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const [finalizePaperModalOpen, setFinalizePaperModalOpen] = useState<boolean>(false);
  const [finalizeInterviewModalOpen, setFinalizeInterviewModalOpen] = useState<boolean>(false);

  const paperPass = useCallback(async (recruit: Recruit, application: Application) => {
    await Api.Domain.AdminRecruit.paperPass(recruit.id, application.id);

    setApplications((prev) =>
      prev
        ? prev.map((a) => (a.id === application.id ? { ...application, paperPass: true } : a))
        : [],
    );

    setSelectedApplication((prev) =>
      prev?.id === application.id ? { ...prev, paperPass: true } : prev,
    );
  }, []);

  const paperFail = useCallback(
    async (recruit: Recruit, application: Application) => {
      await Api.Domain.AdminRecruit.paperFail(recruit.id, application.id);

      setApplications((prev) =>
        prev
          ? prev.map((a) => (a.id === application.id ? { ...application, paperPass: false } : a))
          : [],
      );

      setSelectedApplication((prev) =>
        prev?.id === application.id ? { ...prev, paperPass: false } : prev,
      );
    },
    [recruit],
  );

  const interviewPass = useCallback(async (recruit: Recruit, application: Application) => {
    await Api.Domain.AdminRecruit.interviewPass(recruit.id, application.id);

    setApplications((prev) =>
      prev
        ? prev.map((a) => (a.id === application.id ? { ...application, interviewPass: true } : a))
        : [],
    );

    setSelectedApplication((prev) =>
      prev?.id === application.id ? { ...prev, interviewPass: true } : prev,
    );
  }, []);

  const interviewFail = useCallback(async (recruit: Recruit, application: Application) => {
    await Api.Domain.AdminRecruit.interviewFail(recruit.id, application.id);

    setApplications((prev) =>
      prev
        ? prev.map((a) => (a.id === application.id ? { ...application, interviewPass: false } : a))
        : [],
    );

    setSelectedApplication((prev) =>
      prev?.id === application.id ? { ...prev, interviewPass: false } : prev,
    );
  }, []);

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
          setSelectedApplication(applications[0]);
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
        ? applications
            .filter(
              (application) =>
                application.name.includes(query) ||
                application.studentId.includes(query) ||
                application.email.includes(query) ||
                application.phoneNumber.includes(query),
            )
            .sort((a, b) => {
              const rankA = a.interviewPass ? 1 : a.paperPass ? 2 : 3;
              const rankB = b.interviewPass ? 1 : b.paperPass ? 2 : 3;

              if (rankA !== rankB) {
                return rankA - rankB;
              }

              return a.name.localeCompare(b.name);
            })
        : [],
    );
  }, [applications, query]);

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

      {applications && (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Badge variant="outline" className="text-sm">
              전체 지원자&nbsp;<span className="font-normal">{applications.length}명</span>
            </Badge>
            <Badge variant="outline" className="text-sm">
              서류 합격자&nbsp;
              <span className="font-normal">
                {applications.filter((x) => x.paperPass).length}명 / {applications.length}명
              </span>
            </Badge>
            {recruit?.step !== Step.PRE && (
              <Badge variant="outline" className="text-sm">
                면접 합격자&nbsp;
                <span className="font-normal">
                  {applications.filter((x) => x.interviewPass).length}명 /{' '}
                  {applications.filter((x) => x.paperPass).length}명
                </span>
              </Badge>
            )}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="검색어를 입력해주세요."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {recruit.step === Step.PRE && (
              <>
                {selectedApplication && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => paperFail(recruit!, selectedApplication)}
                    >
                      서류 불합격
                    </Button>
                    <Button variant="wink" onClick={() => paperPass(recruit!, selectedApplication)}>
                      서류 합격
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  disabled={applications?.some((x) => x.paperPass === null)}
                  onClick={() => setFinalizePaperModalOpen(true)}
                >
                  서류 결과 확정
                </Button>
              </>
            )}

            {recruit.step === Step.PAPER_END && (
              <>
                {selectedApplication && (
                  <>
                    <Button
                      variant="destructive"
                      disabled={!selectedApplication.paperPass}
                      onClick={() => interviewFail(recruit!, selectedApplication)}
                    >
                      면접 불합격
                    </Button>
                    <Button
                      variant="wink"
                      disabled={!selectedApplication.paperPass}
                      onClick={() => interviewPass(recruit!, selectedApplication)}
                    >
                      면접 합격
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  disabled={applications?.some((x) => x.paperPass && x.interviewPass === null)}
                  onClick={() => setFinalizeInterviewModalOpen(true)}
                >
                  면접 결과 확정
                </Button>
              </>
            )}
          </div>
        </div>
      )}

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
                  application.id === selectedApplication?.id
                    ? 'bg-neutral-50 hover:bg-neutral-100/75'
                    : '',
                )}
                onClick={() => setSelectedApplication(application)}
              >
                <div className="flex justify-between">
                  <p className="font-medium">{application.name}</p>

                  <div className="flex space-x-1">
                    {application.paperPass === null ? (
                      <FileUser className="w-[18px] h-[18px] text-neutral-600" />
                    ) : application.paperPass ? (
                      <FileUser className="w-[18px] h-[18px] text-green-600" />
                    ) : (
                      <FileUser className="w-[18px] h-[18px] text-red-600" />
                    )}

                    {recruit?.step !== Step.PRE &&
                      application.paperPass &&
                      (application.interviewPass === null ? (
                        <Speech className="w-[18px] h-[18px] text-neutral-600" />
                      ) : application.interviewPass ? (
                        <Speech className="w-[18px] h-[18px] text-green-600" />
                      ) : (
                        <Speech className="w-[18px] h-[18px] text-red-600" />
                      ))}
                  </div>
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
              <TableCell>
                {selectedApplication.github ? (
                  <Link
                    href={`https://github.com/${selectedApplication.github}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-600/90"
                  >
                    {selectedApplication.github}
                  </Link>
                ) : (
                  '-'
                )}
              </TableCell>
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

      <FinalizePaperModal
        open={finalizePaperModalOpen}
        setOpen={setFinalizePaperModalOpen}
        recruit={recruit}
        callback={() => setRecruit((prev) => (prev ? { ...prev, step: Step.PAPER_END } : null))}
      />

      <FinalizeInterviewModal
        open={finalizeInterviewModalOpen}
        setOpen={setFinalizeInterviewModalOpen}
        recruit={recruit}
        callback={() => setRecruit((prev) => (prev ? { ...prev, step: Step.INTERVIEW_END } : null))}
      />
    </>
  );
}
