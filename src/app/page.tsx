'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-65px)] bg-[#c8d7ff] overflow-hidden gap-8">
        <div className="absolute bottom-[15vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[45%] animate-rotate"></div>
        <div className="absolute bottom-[12vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[47%] opacity-50 animate-rotate"></div>

        <h1 className=" z-10 text-center font-bold text-3xl md:text-[53px] md:leading-[63.25px]">
          <span className="font-medium text-2xl md:text-[47px] mb-8">
            나만의 서비스. 기획. 개발
          </span>
          <br />
          우리 안의 새로운 물결 WINK
        </h1>

        <p className=" font-bold text-base md:text-xl text-[#3a70ff] z-10">
          <Link href={'/apply'}>지원하기 {'>'}</Link>
        </p>
      </div>

      <div className="bg-gradient-to-b from-[#c8d7ff] to-[#ffffff] h-[128px] md:h-[260px]" />
    </>
  );
}
