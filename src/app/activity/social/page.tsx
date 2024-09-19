'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { SocialType, WinkApi } from '@/api';

const ActivitySocialPage = () => {
  const [socials, setSocials] = useState<SocialType[]>([]);
  const [expanded, setExpanded] = useState<SocialType | null>(null);

  useEffect(() => {
    (async () => {
      await fetchSocials();
    })();
  }, []);

  async function fetchSocials() {
    const { socials } = await WinkApi.Activity.Social.getSocials({ page: 1 });
    setSocials(socials.slice(0, 6));
  }

  console.log(socials);

  return (
    <>
      <div className="relative flex flex-col items-center bg-wink-100 mt-32">
        <div className="absolute bottom-[15vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[45%] animate-rotate"></div>
        <div className="absolute bottom-[12vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[47%] opacity-50 animate-rotate"></div>

        <div className="z-10">
          <h1 className="font-bold text-4xl text-center mb-6">WINK, 우리들의 파도</h1>
          <p className="font-normal text-xl text-center text-zinc-700">
            행사 / 세미나 / 대회 활동 기록을 년도 별로 볼 수 있습니다.
          </p>

          <div className="flex space-x-3 mt-10">
            {socials.map((social) => (
              <div
                key={social._id}
                className={`relative cursor-pointer transition-all duration-300 ease-in-out h-72 ${
                  expanded === social ? 'w-72' : 'w-20'
                }`}
                onClick={() => setExpanded(expanded === social ? null : social)}
              >
                <Image
                  src={social.contents[0].image}
                  alt={'Image'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-300 rounded-3xl ${
                    expanded !== social ? 'bg-black/50' : 'bg-transparent'
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {expanded && <p className="mt-10 text-3xl font-semibold text-center">{expanded.title}</p>}
        </div>
      </div>
      <div className="flex bg-wink-100 justify-center">
        {expanded && <p dangerouslySetInnerHTML={{ __html: expanded.contents[0].content }} />}
      </div>
      <div className="bg-gradient-to-b from-wink-100 to-white h-32 md:h-64" />
    </>
  );
};

export default ActivitySocialPage;
