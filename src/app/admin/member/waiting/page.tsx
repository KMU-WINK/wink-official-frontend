'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { SearchBar, Title } from '@/component';

import { EachGetWaitingMembersResponseDto, WinkApi } from '@/api';

const AdminMemberWaitingPage = () => {
  const [members, setMembers] = useState<EachGetWaitingMembersResponseDto[]>(
    [],
  );
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      await fetchWaitingMembers();
    })();
  }, []);

  async function fetchWaitingMembers() {
    const { members } = await WinkApi.MemberAdmin.getWaitingMembers();
    setMembers(members);
  }

  const handleApprove = async (member: EachGetWaitingMembersResponseDto) => {
    await WinkApi.MemberAdmin.approveWaitingMember({ memberId: member._id });
    await fetchWaitingMembers();

    toast.success(`${member.name}님의 회원가입을 승인했습니다.`);
  };

  const handleReject = async (member: EachGetWaitingMembersResponseDto) => {
    await WinkApi.MemberAdmin.rejectWaitingMember({ memberId: member._id });
    await fetchWaitingMembers();

    toast.warn(`${member.name}님의 회원가입을 거부했습니다.`);
  };

  return (
    <div className="container mx-auto mt-4">
      <Title title="Member" subtitle="회원가입 승인" />

      <div className="flex justify-end mb-4">
        <SearchBar
          value={query}
          placeholder="이름을 검색해주세요."
          onChange={setQuery}
        />
      </div>

      <div className="min-w-full grid grid-cols-5 gap-2 border-b">
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
          액션
        </div>
      </div>

      {members.map(member => (
        <div
          key={member._id}
          className="grid grid-cols-5 gap-2 border-b border-gray-200"
        >
          <div className="py-4 px-4 col-span-1 text-sm">{member.name}</div>
          <div className="py-4 px-4 col-span-1 text-sm">{member.studentId}</div>
          <div className="py-4 px-4 col-span-2 text-sm">{member.email}</div>
          <div className="col-span-1 flex items-center justify-center space-x-2">
            <button
              className="bg-green-500 text-white text-sm px-6 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => handleApprove(member)}
            >
              승인
            </button>
            <button
              className="bg-red-500 text-white text-sm px-6 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => handleReject(member)}
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMemberWaitingPage;
