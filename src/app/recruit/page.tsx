'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { domains } from '@/app/recruit/_constant/domain';
import { qnas } from '@/app/recruit/_constant/qna';

import DomainCard from '@/app/recruit/_component/domain-card';
import InfoCard, { Info } from '@/app/recruit/_component/info-card';
import Items from '@/app/recruit/_component/items';
import RecruitTitle from '@/app/recruit/_component/recruit-title';
import Rocket from '@/app/recruit/_component/rocket';
import ScrollDown from '@/app/recruit/_component/scroll-down';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';

import Api from '@/api';
import Recruit from '@/api/type/schema/recruit';

import { useUserStore } from '@/store/user';

import { formatDate, now, toDate } from '@/util';

import BackgroundImage from '@/public/recruit/background.avif';

import { endOfDay, startOfDay } from 'date-fns';
import { TicketsPlane } from 'lucide-react';

export default function RecruitPage() {
  const router = useRouter();

  const { user } = useUserStore();

  const [recruit, setRecruit] = useState<Recruit | null>(null);
  const [loading, setLoading] = useState(true);

  const infos = useMemo<Info[]>(() => {
    if (!recruit) return [];

    return [
      {
        title: '지원 기간',
        content: `${formatDate(recruit.recruitStartDate, true)} ~\n${formatDate(recruit.recruitEndDate, true)}`,
      },
      {
        title: '면접 일정',
        content: `${formatDate(recruit.interviewStartDate, true)} ~\n${formatDate(recruit.interviewEndDate, true)}`,
      },
    ];
  }, [recruit]);

  useEffect(() => {
    (async () => {
      const { recruit } = await Api.Domain.Recruit.getLatestRecruit();

      setRecruit(recruit);
      setLoading(false);
    })();
  }, []);

  if (loading || !recruit) return null;

  return (
    <>
      <div className="relative w-[100vw] h-[calc(100dvh-56px)] bg-black">
        <Image
          src={BackgroundImage}
          alt="background"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />

        <Rocket />
        <RecruitTitle year={recruit.year} />
        <ScrollDown />
      </div>

      <div className="flex flex-col space-y-10 sm:space-y-24 py-20 sm:py-28">
        <Items
          title="모집 개요"
          description={`${recruit.year}년도 ${recruit.semester}학기 WINK 신입 부원 모집 개요`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infos.map((info) => (
              <InfoCard key={info.title} {...info} />
            ))}
          </div>
        </Items>

        <Items title="모집 분야" description="함께 활동을 적극적으로 할 수 있는 누구나 환영합니다">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((domain) => (
              <DomainCard key={domain.tag} {...domain} />
            ))}
          </div>
        </Items>
      </div>

      <div className="flex flex-col items-center py-20 sm:py-28 bg-wink-50">
        <Items title="자주 묻는 질문">
          <Accordion
            type="single"
            collapsible
            className="w-[300px] sm:w-[608px] bg-white rounded-3xl px-6"
          >
            {qnas.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger className="text-sm sm:text-base">{question}</AccordionTrigger>
                <AccordionContent className="text-xs sm:text-base">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Items>
      </div>

      {startOfDay(toDate(recruit.recruitStartDate)) <= now() &&
        now() <= endOfDay(toDate(recruit.recruitEndDate)) && (
          <div className="flex flex-col items-center justify-center pt-20 sm:pt-28 space-y-10 sm:space-y-14">
            <div className="flex flex-col items-center justify-center space-y-4">
              <TicketsPlane size={72} className="hidden sm:block" />
              <TicketsPlane size={48} className="block sm:hidden" />
              <p className="text-lg sm:text-2xl font-bold">
                {recruit.year}년도 {recruit.semester}학기 WINK 신규 부원
              </p>
            </div>
            <Button
              variant="wink"
              onClick={() => router.push(`/recruit/application`)}
              disabled={!!user}
            >
              지원하기
            </Button>
          </div>
        )}
    </>
  );
}
