'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Dropdown, SearchBar, TablePaging, Title } from '@/component';

import {
  EachGetMembersForAdminResponseDto,
  RoleKorean,
  RoleKoreanMap,
  RoleKoreanToRole,
  WinkApi,
} from '@/api';

const AdminMemberListPage = () => {
  const [members, setMembers] = useState<EachGetMembersForAdminResponseDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { page } = await WinkApi.MemberAdmin.getMembersPage();
      setMaxPage(page);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchMembers();
    })();
  }, [page, query]);

  async function fetchMembers() {
    if (query) {
      const { members } = await WinkApi.MemberAdmin.searchMembers({ query });
      setMembers(members);
    } else {
      const { members } = await WinkApi.MemberAdmin.getMembers({ page });
      setMembers(members);
    }
  }

  const handleRoleChange = async (member: EachGetMembersForAdminResponseDto, rawRole: string) => {
    await WinkApi.MemberAdmin.updateMemberRole({
      memberId: member._id,
      role: RoleKoreanToRole(rawRole),
    });
    await fetchMembers();

    toast.success(`${member.name}님의 역할을 "${rawRole}"로 변경하였습니다.`);
  };

  const handleFeeChange = async (member: EachGetMembersForAdminResponseDto, fee: boolean) => {
    await WinkApi.MemberAdmin.updateMemberFee({ memberId: member._id, fee });
    await fetchMembers();

    toast.success(`${member.name}님의 회비 정보를 "${fee ? '납부' : '미납부'}"로 변경하였습니다.`);
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Member" subtitle="회원 정보 수정" />

      <div className="flex justify-end mb-4">
        <SearchBar value={query} placeholder="이름을 검색해주세요." onChange={setQuery} />
      </div>

      <div className="min-w-full grid grid-cols-6 gap-2 border-b">
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          이름
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          학번
        </div>
        <div className="pt-4 py-2 px-4 col-span-2 text-left text-sm font-semibold text-gray-600">
          이메일
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          역할
        </div>
        <div className="pt-4 py-2 px-4 col-span-1 text-left text-sm font-semibold text-gray-600">
          회비
        </div>
      </div>

      {members.map((member) => (
        <div key={member._id} className="grid grid-cols-6 gap-2 border-b border-gray-200">
          <div className="py-4 px-4 col-span-1 text-sm">{member.name}</div>
          <div className="py-4 px-4 col-span-1 text-sm">{member.studentId}</div>
          <div className="py-4 px-4 col-span-2 text-sm">{member.email}</div>
          <div className="py-4 px-4 col-span-1 text-sm">
            <Dropdown
              value={RoleKoreanMap[member.role]}
              options={RoleKorean}
              onChange={(value) => handleRoleChange(member, value)}
            />
          </div>
          <div className="py-4 px-4 col-span-1 text-sm">
            <Dropdown
              value={member.fee ? '납부' : '미납부'}
              options={['납부', '미납부']}
              onChange={(value) => handleFeeChange(member, value === '납부')}
            />
          </div>
        </div>
      ))}

      {!query && maxPage > 0 && <TablePaging page={page} setPage={setPage} maxPage={maxPage} />}
    </div>
  );
};

export default AdminMemberListPage;
