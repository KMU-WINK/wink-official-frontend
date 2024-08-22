'use client';

import Link from 'next/link';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.wave}>
        <h1 className="font-pretendard z-10 text-center font-bold text-3xl md:text-[53px] md:leading-[63.25px]">
          <span className="font-medium text-2xl md:text-[47px] mb- md:mb-8">
            나만의 서비스. 기획. 개발
          </span>
          <br />
          우리 안의 새로운 물결 WINK
        </h1>

        <p className="font-pretendard font-bold text-base md:text-xl text-[#3a70ff] z-10 ">
          <Link href={'/apply'}>지원하기 {`>`}</Link>
        </p>
      </div>

      <div className="bg-gradient-to-b from-[#c8d7ff] to-[#ffffff] h-[128px] md:h-[260px]" />
    </>
  );
}
