'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';

import Api from '@/api';
import Conference from '@/api/type/schema/conference';
import User from '@/api/type/schema/user';
import { useApi, useApiWithToast } from '@/api/useApi';

import { formatDate } from '@/util';

import Loading from '@/app/loading';

import { UserIcon } from 'lucide-react';

interface AdminConferenceDetailPageProps {
  params: { id: string };
}

export default function AdminConferenceDetailPage({ params }: AdminConferenceDetailPageProps) {
  const [isApi, startApi] = useApiWithToast();
  const [, startApi2] = useApi();

  const [conference, setConference] = useState<Conference>();
  const [users, setUsers] = useState<User[]>();

  const survey = useCallback(
    (user: User) => {
      if (!conference) return;

      const join = conference.surveyPresent.some((u) => u.id === user.id);
      const leave = conference.surveyAbsent.some((u) => u.id === user.id);

      return !join && !leave ? undefined : join;
    },
    [conference],
  );

  const real = useCallback(
    (user: User) => {
      if (!conference) return;

      const join = conference.present.some((u) => u.id === user.id);
      const leave = conference.absent.some((u) => u.id === user.id);

      return !join && !leave ? undefined : join;
    },
    [conference],
  );

  const onPresent = useCallback(
    async (user: User) => {
      if (!conference) return;

      startApi(
        async () => {
          await Api.Domain.AdminConference.present(conference.id, user.id);
          setConference((prev) => {
            return {
              ...prev!,
              present: [...prev!.present, user],
              absent: prev!.absent.filter((u) => u.id !== user.id),
            };
          });
        },
        {
          loading: `${user.name}님을 참석처리하고 있습니다.`,
          success: `${user.name}님을 참석처리했습니다.`,
        },
      );
    },
    [conference],
  );

  const onAbsent = useCallback(
    async (user: User) => {
      if (!conference) return;

      startApi(
        async () => {
          await Api.Domain.AdminConference.absent(conference.id, user.id);
          setConference((prev) => {
            return {
              ...prev!,
              present: prev!.present.filter((u) => u.id !== user.id),
              absent: [...prev!.absent, user],
            };
          });
        },
        {
          loading: `${user.name}님을 불참석처리하고 있습니다.`,
          success: `${user.name}님을 불참석처리했습니다.`,
        },
      );
    },
    [conference],
  );

  useEffect(() => {
    startApi2(async () => {
      const { conference } = await Api.Domain.AdminConference.getConference(params.id);
      setConference(conference);
    });
  }, [params.id]);

  useEffect(() => {
    startApi2(async () => {
      const { users } = await Api.Domain.User.getUsers();
      setUsers(users);
    });
  }, []);

  if (!conference || !users) return <Loading />;

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">
        {formatDate(new Date(conference.date))} 정기 회의
      </h1>

      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">이름</TableHead>
            <TableHead className="min-w-[100px]">학번</TableHead>
            <TableHead className="min-w-[100px]">참석 투표</TableHead>
            <TableHead className="min-w-[100px]">실제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user) => {
              const _survey = survey(user);
              const _real = real(user);

              return (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt="avatar" />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.studentId}</TableCell>
                  <TableCell>
                    <Button
                      className="pointer-events-none"
                      variant={_survey === undefined ? 'outline' : _survey ? 'wink' : 'destructive'}
                    >
                      {_survey === undefined ? '-' : _survey ? '참석' : '불참석'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={isApi}
                      variant={_real === undefined ? 'outline' : _real ? 'wink' : 'destructive'}
                      onClick={async () => {
                        const func = _real ? onAbsent : onPresent;
                        await func(user);
                      }}
                    >
                      {_real === undefined ? '-' : _real ? '참석' : '불참석'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
