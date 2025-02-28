'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import CreateConferenceModal from '@/app/admin/conference/_component/modal/create-conference';
import DeleteConferenceModal from '@/app/admin/conference/_component/modal/delete-conference';
import UpdateConferenceModal from '@/app/admin/conference/_component/modal/update-conference';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/pagination';
import { Separator } from '@/ui/separator';
import { SidebarTrigger } from '@/ui/sidebar';
import { Skeleton } from '@/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';

import Api from '@/api';
import Conference from '@/api/type/schema/conference';
import Page from '@/api/type/schema/page';
import { useApi } from '@/api/useApi';

import { formatDate, formatDateWithTime, formatTime } from '@/util';

import { MoreHorizontal } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function AdminConferencePage() {
  const router = useRouter();

  const [isApi, startApi] = useApi();

  const [conference, setConference] = useState<Page<Conference>>();
  const [selected, setSelected] = useState<Conference>();

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const onKakaotalkShare = useCallback((conference: Conference) => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }

    window.Kakao.Share.sendCustom({
      templateId: Number(process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID),
      templateArgs: {
        CONFERENCE_ID: conference.id,
        DATE: formatDate(new Date(conference.date), true),
        TIME: formatTime(new Date(conference.date)),
        LOCATION: conference.location,
      },
    });
  }, []);

  const onCreateConference = useCallback((conference: Conference) => {
    setConference((prev) => ({
      page: prev!.page,
      content: [conference, ...prev!.content],
    }));
  }, []);

  const onUpdateConference = useCallback((conference: Conference) => {
    setConference((prev) => ({
      page: prev!.page,
      content: prev!.content.map((p) => (p.id === conference.id ? conference : p)),
    }));
  }, []);

  const onDeleteConference = useCallback((id: string) => {
    setConference((prev) => ({
      page: prev!.page,
      content: prev!.content.filter((p) => p.id !== id),
    }));
  }, []);

  const pageIndex = useMemo(() => {
    if (!conference) return [];

    if (conference.page.totalPages <= 5) {
      return Array.from({ length: conference.page.totalPages }, (_, index) => index);
    }

    const start =
      page === 0 || page === 1
        ? 0
        : page === conference.page.totalPages - 1 || page === conference.page.totalPages - 2
          ? conference.page.totalPages - 5
          : page - 2;

    return Array.from({ length: 5 }, (_, index) => start + index);
  }, [page, conference]);

  useEffect(() => {
    startApi(async () => {
      const { conferences } = await Api.Domain.AdminConference.getConferences(page);
      setConference(conferences);
    });
  }, [page]);

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
                <BreadcrumbLink>정기 회의</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>정기 회의 목록</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button variant="wink" className="w-fit self-end" onClick={() => setCreateModalOpen(true)}>
          정기 회의 생성
        </Button>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[240px]">날짜</TableHead>
              <TableHead className="min-w-[100px]">장소</TableHead>
              <TableHead className="w-[75px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isApi ? (
              Array.from({ length: 10 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[240px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : conference && conference.content.length > 0 ? (
              conference!.content.map((conference) => (
                <TableRow
                  key={conference.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/admin/conference/${conference.id}`)}
                >
                  <TableCell>{formatDateWithTime(new Date(conference.date), true)}</TableCell>
                  <TableCell>{conference.location}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-8 h-8">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onKakaotalkShare(conference);
                          }}
                        >
                          카카오톡 공유
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(conference);
                            setUpdateModalOpen(true);
                          }}
                        >
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(conference);
                            setDeleteModalOpen(true);
                          }}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-neutral-500">
                  정기 회의가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {!isApi && conference && conference.page.totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={conference.page.number > 0 ? 'cursor-pointer' : 'cursor-default'}
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                />
              </PaginationItem>

              {pageIndex.map((index) => {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={
                        index === conference.page.number ? 'cursor-default' : 'cursor-pointer'
                      }
                      onClick={() => setPage(index)}
                      isActive={index === conference.page.number}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  className={
                    conference.page.number < conference.page.totalPages - 1
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }
                  onClick={() =>
                    setPage((prev) => Math.min(conference.page.totalPages - 1, prev + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <CreateConferenceModal
        open={createModalOpen}
        setOpen={setCreateModalOpen}
        callback={onCreateConference}
      />

      <UpdateConferenceModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        conference={selected}
        callback={onUpdateConference}
      />

      <DeleteConferenceModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        conference={selected}
        callback={onDeleteConference}
      />
    </>
  );
}
