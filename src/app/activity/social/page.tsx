'use client';

import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import Image from 'next/image';

import { SocialType, WinkApi } from '@/api';

import AOS from 'aos';
import { motion } from 'framer-motion';

type ChangeIndex = 'next' | 'prev';

const ActivitySocialPage = () => {
  const [socials, setSocials] = useState<SocialType[]>([]);
  const [expanded, setExpanded] = useState<SocialType | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [changeIndex, setChangeIndex] = useState<ChangeIndex>('next');

  useEffect(() => {
    AOS.init({
      once: true,
    });

    (async () => {
      await fetchSocials();
    })();
  }, []);

  async function fetchSocials() {
    const cache: SocialType[] = [];

    const { page } = await WinkApi.Activity.Social.getSocialsPage();
    const { socials } = await WinkApi.Activity.Social.getSocials({ page });
    cache.push(...socials);

    if (cache.length < 6 && page > 1) {
      const { socials } = await WinkApi.Activity.Social.getSocials({ page: page - 1 });
      cache.push(...socials);
    }

    setSocials(cache.reverse().slice(0, 6));
  }

  return (
    <>
      <div className="relative flex flex-col items-center bg-wink-100 mt-32 overflow-hidden">
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
                onClick={() => {
                  setExpanded(expanded === social ? null : social);
                  setIndex(0);
                  setChangeIndex('next');
                }}
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
      <div className="flex flex-col bg-wink-100 justify-center">
        {expanded && (
          <>
            <div className="relative flex justify-center w-full mt-24">
              {index > 0 && (
                <div className="absolute left-2 flex items-center justify-center w-1/5 h-full opacity-75">
                  <motion.div
                    key={`prev-${index}`}
                    initial={{ x: changeIndex === 'next' ? 200 : -200 }}
                    animate={{ x: 0 }}
                    exit={{ x: changeIndex === 'next' ? -200 : 200 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={expanded.contents[index - 1].image}
                      alt="previous"
                      width={800}
                      height={450}
                      className="object-cover rounded-3xl"
                    />
                  </motion.div>
                </div>
              )}
              {index + 1 < expanded.contents.length && (
                <div className="absolute right-2 flex items-center justify-center w-1/5 h-full opacity-75">
                  <motion.div
                    key={`next-${index}`}
                    initial={{ x: changeIndex === 'next' ? 200 : -200 }}
                    animate={{ x: 0 }}
                    exit={{ x: changeIndex === 'next' ? -200 : 200 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={expanded.contents[index + 1].image}
                      alt="next"
                      width={800}
                      height={450}
                      className="object-cover rounded-3xl"
                    />
                  </motion.div>
                </div>
              )}
              <div className="flex w-full gap-2 justify-center items-center">
                {index > 0 ? (
                  <FaAngleLeft
                    size={32}
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => {
                      setIndex(index - 1);
                      setChangeIndex('prev');
                    }}
                  />
                ) : (
                  <div className="w-8 h-8" />
                )}
                <motion.div
                  key={`current-${index}`}
                  initial={{ x: changeIndex === 'next' ? 20 : -20 }}
                  animate={{ x: 0 }}
                  exit={{ x: changeIndex === 'next' ? -200 : 200 }}
                  transition={{ duration: 0.5 }}
                  className="w-1/2"
                >
                  <Image
                    src={expanded.contents[index].image}
                    alt="current"
                    width={800}
                    height={450}
                    className="w-full object-cover rounded-3xl"
                  />
                </motion.div>
                {index + 1 < expanded.contents.length ? (
                  <FaAngleRight
                    size={32}
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => {
                      setIndex(index + 1);
                      setChangeIndex('next');
                    }}
                  />
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            </div>
            <p
              className="self-center mt-4 text-xl"
              dangerouslySetInnerHTML={{ __html: expanded.contents[0].content }}
            />
          </>
        )}
      </div>
      <div className="bg-gradient-to-b from-wink-100 to-white h-32 md:h-64" />
    </>
  );
};

export default ActivitySocialPage;
