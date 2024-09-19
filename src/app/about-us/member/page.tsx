'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { ProfileCard } from '@/component';

import { EachGetMembersResponseDto, RoleKoreanMap, WinkApi } from '@/api';

import cloudImage from '@/public/about-us/member/cloud.png';

const MEMBERS = [
  {
    title: '총무부',
    description: '비품 및 회비 관리, 도서 신청 및 대출 관리',
    filter: (member: EachGetMembersResponseDto) =>
      member.role === 'TREASURY_HEAD' || member.role === 'TREASURY_ASSISTANT',
    sort: (a: EachGetMembersResponseDto) => (a.role === 'TREASURY_HEAD' ? -1 : 1),
  },
  {
    title: '홍보부',
    description: '동아리 홍보 및 홍보물 제작, SNS 관리',
    filter: (member: EachGetMembersResponseDto) =>
      member.role === 'PUBLIC_RELATIONS_HEAD' || member.role === 'PUBLIC_RELATIONS_ASSISTANT',
    sort: (a: EachGetMembersResponseDto) => (a.role === 'PUBLIC_RELATIONS_HEAD' ? -1 : 1),
  },
  {
    title: '기획부',
    description: '동아리 행사 기획 및 진행, 회의록 작성',
    filter: (member: EachGetMembersResponseDto) =>
      member.role === 'PLANNING_HEAD' || member.role === 'PLANNING_ASSISTANT',
    sort: (a: EachGetMembersResponseDto) => (a.role === 'PLANNING_HEAD' ? -1 : 1),
  },
];

const AboutUsMemberPage = () => {
  const [members, setMembers] = useState<EachGetMembersResponseDto[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { members } = await WinkApi.Member.getMembers();
      setMembers(members);
    };

    (async () => {
      await fetchMembers();
    })();
  }, []);

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={cloudImage} alt="cloud" width={224} className="w-56 animate-updown" />
        <h1 className="font-roboto font-extrabold text-5xl lg:text-7xl text-wink-200 tracking-wider">
          NEW WAVE IN US
        </h1>
        <h2 className="font-roboto font-light italic text-lg lg:text-3xl text-wink-400">
          Introduction of WINK team members
        </h2>
        <div className="mt-8 mb-12 animate-updown-shadow h-2 bg-gray-400 blur rounded-full" />
      </div>

      <div className="flex flex-col items-center gap-12 mt-16">
        <div>
          <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="font-bold text-3xl text-center">&lt;회장단&gt;</h1>
            <p className="font-normal text-lg text-center text-zinc-700]">
              전체 동아리 운영 기획 및 각 부서 업무 참여
            </p>

            <div className="flex flex-wrap justify-center gap-4 px-12">
              {members
                .filter((member) => member.role === 'PRESIDENT' || member.role === 'VICE_PRESIDENT')
                .sort((a) => (a.role === 'PRESIDENT' ? -1 : 1))
                .map(({ _id, name, avatar, description, link, role }) => (
                  <ProfileCard
                    key={_id}
                    name={name}
                    avatar={avatar}
                    description={description}
                    github={link.github}
                    instagram={link.instagram}
                    blog={link.blog}
                    role={RoleKoreanMap[role]}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-start gap-8">
          {MEMBERS.map(({ title, description, filter, sort }) => (
            <div className="flex flex-col items-center justify-center gap-6">
              <h1 className="font-bold text-3xl text-center">&lt;{title}&gt;</h1>
              <p className="font-normal text-lg text-center text-zinc-700]">{description}</p>

              <div className="flex flex-col gap-6">
                {members
                  .filter(filter)
                  .sort(sort)
                  .map(({ _id, name, avatar, description, link, role }) => (
                    <ProfileCard
                      key={_id}
                      name={name}
                      avatar={avatar}
                      description={description}
                      github={link.github}
                      instagram={link.instagram}
                      blog={link.blog}
                      role={role.endsWith('HEAD') ? '부장' : '차장'}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap justify-center gap-4 px-12">
            {members
              .filter((member) => member.role === 'MEMBER')
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ _id, name, avatar, description, link }) => (
                <ProfileCard
                  key={_id}
                  name={name}
                  avatar={avatar}
                  description={description}
                  github={link.github}
                  instagram={link.instagram}
                  blog={link.blog}
                  role={null}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsMemberPage;
