import Image from 'next/image';

import background from '@/public/recruit/background.png';
import rocketImage from '@/public/recruit/rocket.png';
import titleImage from '@/public/recruit/title.png';

const RecruitPage = () => {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="relative w-full h-screen">
        <Image
          src={background}
          alt={'recruit-background'}
          width={2000}
          height={500}
          className="w-full h-screen object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={titleImage}
            alt={'recruit-title'}
            width={1300}
            height={200}
            className="object-contain"
          />
        </div>

        <div className="absolute w-28 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-rocket">
          <Image
            src={rocketImage}
            alt={'recruit-rocket'}
            width={150}
            height={170}
          />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center mb-2">모집 개요</h1>
        <p className="text-center mb-8">2024 년도 1 학기 WINK 신입부원 모집</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">지원 기간</h2>
            <p>2024년 03월 01일(금) ~</p>
            <p>2024년 03월 09일(토) 14시 까지</p>
            <p className="mt-2 font-semibold text-wink-500">합격 발표</p>
            <p>03월 14일 (목)</p>
          </div>
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">지원 방법</h2>
            <p className="font-semibold">구글 폼 작성</p>
            <p className="mt-2">wink.kookmin.ac.kr 접속 후 지원</p>
          </div>
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">면접 일자</h2>
            <p>03월 11일(월) ~</p>
            <p>03월 13일(수)</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center mb-2">모집 대상</h1>
        <p className="text-center mb-8">
          함께 활동을 적극적으로 진행할 준비가 되어 있는 웹에 진심인 국민대학교
          학생을 모두 환영합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">Frontend</h2>
            <p className="mb-2 font-semibold">프론트엔드 개발자</p>
            <p>
              React.js, Vue.js, Next.js, JavaScript 사용에 능한 프론트엔드
              개발자를 환영합니다.
            </p>
          </div>
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">Backend</h2>
            <p className="mb-2 font-semibold">백엔드 개발자</p>
            <p>
              Spring Boot, ExpressJS, NestJS 사용에 능한 백엔드 개발자를
              환영합니다.
            </p>
          </div>
          <div className="bg-white w-64 border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold text-wink-500">Design/PM</h2>
            <p className="mb-2 font-semibold">디자이너/PM</p>
            <p>??? 여기 뭐 써야해요 ???</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-wink-50/50">
        <h2 className="text-3xl font-bold text-center mt-12 mb-6">
          자주 묻는 질문
        </h2>
        <div className="flex flex-col space-y-4 items-center pb-24">
          <div className="bg-white w-carousel border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold">
              Q. 타과생도 지원할 수 있나요?
            </h2>
            <p>A. ㅐㅐㅐㅐㅐㅐㅐㅐ.</p>
          </div>
          <div className="bg-white w-carousel border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold">
              Q. 프로젝트 경험이 없어도 괜찮나요?
            </h2>
            <p>A. ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ.</p>
          </div>
          <div className="bg-white w-carousel border border-zinc-500 rounded-2xl p-4">
            <h2 className="mb-2 font-semibold">
              Q. 면접 때 기술 많이 물어보나요?
            </h2>
            <p>A. 지원자 님의 지원서와 학년을 모두 고려하여 질문 드립니다.</p>
          </div>
        </div>

        <iframe
          className="w-full h-recruit"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdWLGyNmKexha3Z8LLS7Brx_1fvtTQxqr-Ced3WoIoCm0fAOw/viewform?embedded=true"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default RecruitPage;
