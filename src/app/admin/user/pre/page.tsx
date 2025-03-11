'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DeletePreUserModal from '@/app/admin/user/pre/_component/delete-pre-user';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Input } from '@/ui/input';
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
import Page from '@/api/type/schema/page';
import PreUser from '@/api/type/schema/pre-user';
import { useApi } from '@/api/useApi';

import _ from 'lodash';
import { MoreHorizontal } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { toast } from 'sonner';

export default function AdminUserPrePage() {
  const [isApi, startApi, setApi] = useApi();

  const [query, setQuery] = useQueryState('query', parseAsString.withDefault(''));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));

  const [users, setUsers] = useState<Page<PreUser>>();
  const [selected, setSelected] = useState<PreUser>();

  const [deletePreUserOpen, setDeletePreUserOpen] = useState(false);

  const pageIndex = useMemo(() => {
    if (!users) return [];

    if (users.page.totalPages <= 5) {
      return Array.from({ length: users.page.totalPages }, (_, index) => index);
    }

    const start =
      page === 0 || page === 1
        ? 0
        : page === users.page.totalPages - 1 || page === users.page.totalPages - 2
          ? users.page.totalPages - 5
          : page - 2;

    return Array.from({ length: 5 }, (_, index) => start + index);
  }, [page, users]);

  const onDeletePreUser = useCallback((id: string) => {
    setUsers((prev) => ({
      ...prev!,
      content: prev!.content.filter((user) => user.id !== id),
    }));
  }, []);

  useEffect(() => {
    const debounce = _.debounce(() => {
      startApi(async () => {
        const { users } = await Api.Domain.AdminUser.getPreUsers(page, query);
        setUsers(users);
      });
    }, 500);

    setApi(true);
    setUsers(undefined);
    debounce();

    return () => debounce.cancel();
  }, [page, query]);

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
                <BreadcrumbLink>유저</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>대기 유저 목록</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Input
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[75px]">테스터</TableHead>
              <TableHead className="min-w-[120px]">이름</TableHead>
              <TableHead className="min-w-[100px]">학번</TableHead>
              <TableHead className="min-w-[250px]">학과</TableHead>
              <TableHead className="min-w-[250px]">이메일</TableHead>
              <TableHead className="min-w-[150px]">전화번호</TableHead>
              <TableHead className="w-[75px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isApi ? (
              Array.from({ length: 10 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="size-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[40px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[60px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[130px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[130px] h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[100px] h-4" />
                  </TableCell>
                </TableRow>
              ))
            ) : users && users.content.length > 0 ? (
              users!.content.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox checked={user.test} disabled />{' '}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.studentId}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-8 h-8">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={async () => {
                            if (!('clipboard' in navigator)) return;

                            await navigator.clipboard.writeText(
                              `${window.location.origin}/auth/register?token=${user.token}`,
                            );

                            toast.info('회원가입 링크가 클립보드에 저장되었습니다.');
                          }}
                        >
                          회원가입 링크 복사
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelected(user);
                            setDeletePreUserOpen(true);
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
                <TableCell colSpan={8} className="text-center text-neutral-500">
                  대기 유저가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {!isApi && users && users.page.totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={users.page.number > 0 ? 'cursor-pointer' : 'cursor-default'}
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                />
              </PaginationItem>

              {pageIndex.map((index) => {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={index === users.page.number ? 'cursor-default' : 'cursor-pointer'}
                      onClick={() => setPage(index)}
                      isActive={index === users.page.number}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  className={
                    users.page.number < users.page.totalPages - 1
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }
                  onClick={() => setPage((prev) => Math.min(users.page.totalPages - 1, prev + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <DeletePreUserModal
        open={deletePreUserOpen}
        setOpen={setDeletePreUserOpen}
        user={selected}
        callback={onDeletePreUser}
      />
    </>
  );
}
