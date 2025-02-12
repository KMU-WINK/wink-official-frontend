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

  const leaders: User[] = useMemo(() => {
    const roleOrder = [Role.PRESIDENT, Role.VICE_PRESIDENT];
    return users
      .filter((user) => roleOrder.includes(user.role))
      .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [users]);

  const treasuries: User[] = useMemo(() => {
    const roleOrder = [Role.TREASURY_HEAD, Role.TREASURY_ASSISTANT];
    return users
      .filter((user) => roleOrder.includes(user.role))
      .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [users]);

  const publicRelations: User[] = useMemo(() => {
    const roleOrder = [Role.PUBLIC_RELATIONS_HEAD, Role.PUBLIC_RELATIONS_ASSISTANT];
    return users
      .filter((user) => roleOrder.includes(user.role))
      .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [users]);

  const plannings: User[] = useMemo(() => {
    const roleOrder = [Role.PLANNING_HEAD, Role.PLANNING_ASSISTANT];
    return users
      .filter((user) => roleOrder.includes(user.role))
      .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [users]);

  const techs: User[] = useMemo(() => {
    const roleOrder = [Role.TECH_HEAD, Role.TECH_ASSISTANT];
    return users
      .filter((user) => roleOrder.includes(user.role))
      .sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [users]);

  const members: User[] = useMemo(
    () =>
      users
        .filter((user) => user.role === Role.MEMBER)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

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

      <div className="hidden md:block">
        <UserList
          role="회장단"
          description="전체 동아리 운영 기획 및 각 부서 업무 참여"
          users={leaders}
          direction="row"
          skeleton={2}
          loading={loading}
        />
      </div>

      <div className="block md:hidden">
        <UserList
          role="회장단"
          description="전체 동아리 운영 기획 및 각 부서 업무 참여"
          users={leaders}
          direction="col"
          skeleton={2}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-10 items-start">
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

      <UserList users={members} direction="row" skeleton={8} loading={loading} />
    </div>
  );
}
