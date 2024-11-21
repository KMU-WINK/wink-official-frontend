'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import CreateRecruitModal from '@/app/admin/recruit/_component/modal/create-recruit';
import DeleteRecruitModal from '@/app/admin/recruit/_component/modal/delete-recruit';
import UpdateRecruitModal from '@/app/admin/recruit/_component/modal/update-recruit';

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
import { Skeleton } from '@/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';

import Api from '@/api';
import Recruit from '@/api/type/schema/recruit';

import { formatDate } from '@/util';

import { MoreHorizontal } from 'lucide-react';

export default function AdminRecruitPage() {
  const router = useRouter();

  const [recruits, setRecruits] = useState<Recruit[] | null>(null);

  const [loading, setLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState<Recruit | null>(null);

  const onCreateRecruit = useCallback((recruit: Recruit) => {
    setRecruits((prev) => [recruit, ...prev!]);
  }, []);

  const onUpdateRecruit = useCallback((recruit: Recruit) => {
    setRecruits((prev) => prev!.map((r) => (r.id === recruit.id ? recruit : r)));
  }, []);

  const onDeleteRecruit = useCallback((id: string) => {
    setRecruits((prev) => prev!.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { recruits } = await Api.Domain.AdminRecruit.getRecruits();

      setRecruits(recruits);
      setLoading(false);
    })();
  }, []);

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
            <BreadcrumbPage>모집 목록</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-2 w-full">
        <Button variant="wink" className="w-fit self-end" onClick={() => setCreateModalOpen(true)}>
          모집 생성
        </Button>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]">년도</TableHead>
              <TableHead className="min-w-[60px]">학기</TableHead>
              <TableHead className="min-w-[350px]">모집 기간</TableHead>
              <TableHead className="min-w-[350px]">면접 기간</TableHead>
              <TableHead className="w-[75px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[60px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[60px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[350px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[350px] h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : recruits && recruits.length > 0 ? (
              recruits!.map((recruit) => (
                <TableRow
                  key={recruit.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/admin/recruit/${recruit.id}`)}
                >
                  <TableCell>{recruit.year}</TableCell>
                  <TableCell>{recruit.semester}</TableCell>
                  <TableCell>
                    {formatDate(recruit.recruitStartDate, true)} ~{' '}
                    {formatDate(recruit.recruitEndDate, true)}
                  </TableCell>
                  <TableCell>
                    {formatDate(recruit.interviewStartDate, true)} ~{' '}
                    {formatDate(recruit.interviewEndDate, true)}
                  </TableCell>
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

                            window.open(
                              `https://docs.google.com/forms/d/${recruit.googleFormId}/edit`,
                              '_blank',
                            );
                          }}
                        >
                          구글 폼
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();

                            setSelectedRecruit(recruit);
                            setUpdateModalOpen(true);
                          }}
                        >
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();

                            setSelectedRecruit(recruit);
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
                <TableCell colSpan={5} className="text-center text-neutral-500">
                  모집이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateRecruitModal
        open={createModalOpen}
        setOpen={setCreateModalOpen}
        callback={onCreateRecruit}
      />

      <UpdateRecruitModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        recruit={selectedRecruit}
        callback={onUpdateRecruit}
      />

      <DeleteRecruitModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        recruit={selectedRecruit}
        callback={onDeleteRecruit}
      />
    </>
  );
}
