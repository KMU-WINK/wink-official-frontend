'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import ActivityCard from '@/app/about-us/_components/ActivicyCard';

import AboutUsImage1 from '@/public/about-us/we/image 25.png';
import AboutUsImage2 from '@/public/about-us/we/image 24.png';
import AboutUsImage3 from '@/public/about-us/we/aboutus_1.jpeg';
import AboutUsImage4 from '@/public/about-us/we/aboutus_0.jpeg';

const AboutUsWePage = () => {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-65px)] bg-wink-100 overflow-hidden gap-8">
        <div className="absolute bottom-[15vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[45%] animate-rotate"></div>
        <div className="absolute bottom-[12vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[47%] opacity-50 animate-rotate"></div>

        <h1 className="z-10 text-center font-semibold text-3xl md:text-5xl md:leading-[64px]">
          <span className="font-regular text-2xl md:text-5xl mb-8">
            나만의 서비스. 기획. 개발
          </span>
          <br />
          우리 안의 새로운 물결 WINK
        </h1>

        <p className="font-bold text-base md:text-xl text-wink-500 z-10">
          <Link href="/recruit">지원하기 {'>'}</Link>
        </p>
      </div>
      <div className="bg-wink-100 min-h-96 flex gap-8 justify-center">
        <div>
          <h1 className="font-medium text-xl md:text-2xl">
            자꾸만 눈이 가는
            <br />
            멋진 모습
          </h1>
          <div className="flex justify-center pt-4">
            <Image src={AboutUsImage1} alt="thumbnail" width={300} />
          </div>
        </div>
        <div>
          <div className="flex justify-center pb-4">
            <Image src={AboutUsImage2} alt="thumbnail" width={300} />
          </div>
          <h1>
            국민대학교 소프트웨어융합대학의
            <br />
            유일무이 웹 학술 동아리
            <br />
            친목부터 대외활동까지 한 번에 챙겨요
          </h1>
        </div>
      </div>
      <div className="bg-gradient-to-b from-wink-100 to-white h-32 md:h-64"></div>
      <div className="flex justify-center">
        <div className="max-w-2xl flex flex-col">
          <h1 className="font-medium text-2xl md:text-4xl">
            안녕하세요. 우리는 WINK 입니다.
          </h1>
          <div className="flex justify-center pt-4">
            <Image src={AboutUsImage3} alt="thumbnail" width={672} />
          </div>

          <h1 className="font-medium text-2xl md:text-4xl pt-14">
            우리는 어떤 길을 <br /> 걸어왔을까요?{' '}
          </h1>
          <div>
            <ActivityCard
              imageSrc={AboutUsImage4}
              title="윙커톤"
              description="서로의 우정이 두터워지는 무박 2 일 해커톤 여정"
              description2="부원들과 함께 밤을 새며 새로운 서비스를 만들었어요. 지난 대회에서는 1 등을 차지했습니다."
              isImageRight={false}
            />
          </div>
          <div>
            <ActivityCard
              imageSrc={AboutUsImage4}
              title="윙커톤"
              description="서로의 우정이 두터워지는 무박 2 일 해커톤 여정"
              description2="부원들과 함께 밤을 새며 새로운 서비스를 만들었어요. 지난 대회에서는 1 등을 차지했습니다."
              isImageRight
            />
          </div>
          <div>
            <ActivityCard
              imageSrc={AboutUsImage4}
              title="윙커톤"
              description="서로의 우정이 두터워지는 무박 2 일 해커톤 여정"
              description2="부원들과 함께 밤을 새며 새로운 서비스를 만들었어요. 지난 대회에서는 1 등을 차지했습니다."
              isImageRight={false}
            />
          </div>
          <div>
            <ActivityCard
              imageSrc={AboutUsImage4}
              title="윙커톤"
              description="서로의 우정이 두터워지는 무박 2 일 해커톤 여정"
              description2="부원들과 함께 밤을 새며 새로운 서비스를 만들었어요. 지난 대회에서는 1 등을 차지했습니다."
              isImageRight
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsWePage;
