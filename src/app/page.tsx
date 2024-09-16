'use client';

import Link from 'next/link';

const Home = () => {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-[calc(100vh-65px)] bg-wink-100 overflow-hidden gap-8">
        <div className="absolute bottom-[15vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[45%] animate-rotate"></div>
        <div className="absolute bottom-[12vh] left-1/2 w-[300vw] h-[300vw] bg-white rounded-[47%] opacity-50 animate-rotate"></div>

        <h1 className="z-10 text-center font-bold text-3xl md:text-5xl md:leading-[64px]">
          <span className="font-medium text-2xl md:text-5xl mb-8">나만의 서비스. 기획. 개발</span>
          <br />
          우리 안의 새로운 물결 WINK
        </h1>

        <p className="font-bold text-base md:text-xl text-wink-500 z-10">
          <Link href={'/apply'}>지원하기 {'>'}</Link>
        </p>
      </div>

      <div className="bg-gradient-to-b from-wink-100 to-white h-32 md:h-64" />
    </>
  );
};

export default Home;
