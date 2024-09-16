'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AdminDropdown, AdminSearchBar, AdminTablePage, AdminTitle } from '@/component';

import {
  EachGetMembersForAdminResponseDto,
  Member,
  Role,
  RoleKorean,
  RoleKoreanMap,
  RoleKoreanToRole,
  WinkApi,
} from '@/api';

const AdminMemberListPage = () => {
  const [members, setMembers] = useState<EachGetMembersForAdminResponseDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
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

  const handleRoleChange = async (memberId: string, rawRole: string) => {
    const { name } = members.find((m) => m._id === memberId)!;
    const role: Role = RoleKoreanToRole(rawRole);

    await WinkApi.MemberAdmin.updateMemberRole({ memberId, role });
    await fetchMembers();

    toast.success(`${name}님의 역할을 "${rawRole}"로 변경하였습니다.`);
  };

  const handleFeeChange = async (memberId: string, fee: boolean) => {
    const { name } = members.find((m) => m._id === memberId)!;

    await WinkApi.MemberAdmin.updateMemberFee({ memberId, fee });
    await fetchMembers();

    toast.success(`${name}님의 회비 정보를 "${fee ? '납부' : '미납부'}"로 변경하였습니다.`);
  };

  return (
    <div className="container mx-auto p-4">
      <AdminTitle title="Member" subtitle="회원 정보 수정" />

      <div className="flex justify-end mb-4">
        <AdminSearchBar value={query} placeholder="이름을 검색해주세요." onChange={setQuery} />
      </div>

      <div className="min-w-full grid grid-cols-4 gap-4 border-b">
        <div className="pt-4 py-2 px-4 text-left text-sm font-semibold text-gray-600">이름</div>
        <div className="pt-4 py-2 px-4 text-left text-sm font-semibold text-gray-600">학번</div>
        <div className="pt-4 py-2 px-4 text-left text-sm font-semibold text-gray-600">역할</div>
        <div className="pt-4 py-2 px-4 text-left text-sm font-semibold text-gray-600">회비</div>
      </div>

      {members.map((member) => (
        <div key={member._id} className="grid grid-cols-4 gap-4 border-b border-gray-200">
          <div className="py-4 px-4 text-sm">{member.name}</div>
          <div className="py-4 px-4 text-sm">{member.studentId}</div>
          <div className="py-4 px-4 text-sm">
            <AdminDropdown
              value={RoleKoreanMap[member.role]}
              options={RoleKorean}
              onChange={(value) => handleRoleChange(member._id, value)}
            />
          </div>
          <div className="py-4 px-4 text-sm">
            <AdminDropdown
              value={member.fee ? '납부' : '미납부'}
              options={['납부', '미납부']}
              onChange={(value) => handleFeeChange(member._id, value === '납부')}
            />
          </div>
        </div>
      ))}

      {!query && <AdminTablePage page={page} setPage={setPage} maxPage={maxPage} />}
    </div>
  );
};

export default AdminMemberListPage;
