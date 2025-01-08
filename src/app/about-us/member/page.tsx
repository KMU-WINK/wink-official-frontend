'use client';

import { useEffect, useMemo, useState } from 'react';

import Cloud from '@/app/about-us/member/_component/cloud';
import UserList from '@/app/about-us/member/_component/user-list';

import { Separator } from '@/ui/separator';

import Api from '@/api';
import User, { Role } from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

export default function AboutUsMemberPage() {
  const { user } = useUserStore();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { users } = await Api.Domain.User.getUsers();

      setUsers(users);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setUsers((prev) => prev.map((u) => (u.id === user?.id ? { ...u, ...user } : u)));
  }, [user]);

  const leaders: User[] = useMemo(
    () => users.filter((user) => [Role.PRESIDENT, Role.VICE_PRESIDENT].includes(user.role)),
    [users],
  );

  const treasuries: User[] = useMemo(
    () => users.filter((user) => [Role.TREASURY_HEAD, Role.TREASURY_ASSISTANT].includes(user.role)),
    [users],
  );

  const publicRelations: User[] = useMemo(
    () =>
      users.filter((user) =>
        [Role.PUBLIC_RELATIONS_HEAD, Role.PUBLIC_RELATIONS_ASSISTANT].includes(user.role),
      ),
    [users],
  );

  const plannings: User[] = useMemo(
    () => users.filter((user) => [Role.PLANNING_HEAD, Role.PLANNING_ASSISTANT].includes(user.role)),
    [users],
  );

  const techs: User[] = useMemo(
    () => users.filter((user) => [Role.TECH_HEAD, Role.TECH_ASSISTANT].includes(user.role)),
    [users],
  );

  const members: User[] = useMemo(() => users.filter((user) => user.role === Role.MEMBER), [users]);

  return (
    <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 space-y-10">
      <Cloud className="flex flex-col items-center">
        <p className="text-4xl sm:text-7xl font-bold font-roboto text-center text-wink-200">
          NEW WAVE IN US
        </p>

        <p className="sm:text-3xl italic font-thin font-roboto text-center text-wink-500">
          Introduction of WINK team members
        </p>
      </Cloud>

      <UserList
        role="회장단"
        description="전체 동아리 운영 기획 및 각 부서 업무 참여"
        users={leaders}
        skeleton={2}
        loading={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        <UserList
          role="총무부"
          description="비품 및 회의 관리, 도서 신청 및 대출 관리"
          users={treasuries}
          direction="col"
          skeleton={2}
          loading={loading}
        />

        <UserList
          role="학술부"
          description="동아리 학술 담당"
          users={techs}
          direction="col"
          skeleton={2}
          loading={loading}
        />

        <UserList
          role="홍보부"
          description="동아리 홍보 및 홍보물 제작, SNS 관리"
          users={publicRelations}
          direction="col"
          skeleton={2}
          loading={loading}
        />

        <UserList
          role="기획부"
          description="동아리 활동 기획 및 활동 정리"
          users={plannings}
          direction="col"
          skeleton={2}
          loading={loading}
        />
      </div>

      <Separator />

      <UserList users={members} skeleton={8} loading={loading} />
    </div>
  );
}
