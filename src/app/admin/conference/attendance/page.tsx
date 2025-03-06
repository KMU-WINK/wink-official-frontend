'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { SidebarTrigger } from '@/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';

import Api from '@/api';
import Conference from '@/api/type/schema/conference';
import User from '@/api/type/schema/user';
import { useApi } from '@/api/useApi';

import { cn } from '@/util';

import Loading from '@/app/loading';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, UserIcon } from 'lucide-react';

export default function AdminConferenceAttendancePage() {
  const [, startApi] = useApi();

  const [year, setYear] = useState(new Date().getFullYear());

  const [conferences, setConferences] = useState<Conference[]>();
  const [users, setUsers] = useState<User[]>();

  const totalPresent = useCallback(
    (user: User) => {
      if (!conferences) return 0;

      return conferences.filter((conference) => conference.present.find((u) => u.id === user.id))
        .length;
    },
    [conferences],
  );

  const totalAbsent = useCallback(
    (user: User) => {
      if (!conferences) return 0;

      return conferences.filter((conference) => conference.absent.find((u) => u.id === user.id))
        .length;
    },
    [conferences],
  );

  const real = useCallback((conference: Conference, user: User) => {
    if (!conference) return;

    const join = conference.present.some((u) => u.id === user.id);
    const leave = conference.absent.some((u) => u.id === user.id);

    return !join && !leave ? undefined : join;
  }, []);

  useEffect(() => {
    startApi(async () => {
      setConferences([]);
      const { conferences } = await Api.Domain.AdminConference.getAttendance(year);
      setConferences(conferences);
    });
  }, [year]);

  useEffect(() => {
    startApi(async () => {
      const { users } = await Api.Domain.User.getUsers();
      setUsers(users);
    });
  }, []);

  if (!conferences || !users) return <Loading />;

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
                <BreadcrumbPage>정기 회의 출석부</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2 items-center self-center">
          <Button variant="ghost" onClick={() => setYear((prev) => prev - 1)}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl md:text-3xl font-semibold">{year}년</h1>
          <Button variant="ghost" onClick={() => setYear((prev) => prev + 1)}>
            <ChevronRight />
          </Button>
        </div>

        <Table className="w-fit">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">이름</TableHead>
              <TableHead className="min-w-[100px]">학번</TableHead>
              <TableHead className="min-w-[75px]">참석</TableHead>
              <TableHead className="min-w-[75px]">불참석</TableHead>
              {conferences.map((conference) => (
                <TableHead key={conference.id} className="min-w-[120px]">
                  {format(new Date(conference.date), 'MM월 dd일 (EEE)', { locale: ko })}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2 w-[120px]">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt="avatar" />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  <TableCell className="w-[100px]">{user.studentId}</TableCell>
                  <TableCell className="w-[75px]">{totalPresent(user)}</TableCell>
                  <TableCell className="w-[75px]">{totalAbsent(user)}</TableCell>
                  {conferences.map((conference) => {
                    const _real = real(conference, user);

                    return (
                      <TableCell
                        key={conference.id + ':' + user.id}
                        className={cn(
                          'font-medium text-center w-[120px]',
                          _real === undefined ? '' : _real ? 'text-wink-500' : 'text-red-500',
                        )}
                      >
                        {_real === undefined ? '' : _real ? '참석' : '불참석'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
