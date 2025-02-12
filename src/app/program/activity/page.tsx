'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import Wave from '@/app/about-us/wink/_component/wave';
import Title from '@/app/program/_component/title';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import Activity from '@/api/type/schema/activity';

import { cn } from '@/util';

export default function ProgramActivityPage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selected, setselected] = useState<Activity>();

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(0);
  }, [selected]);

  useEffect(() => {
    (async () => {
      const { activities } = await Api.Domain.Program.Activity.getActivities();
      setActivities(activities);
      setselected(activities[0]);
    })();
  }, []);

  return (
    <>
      <Title title="WINK, 우리들의 파도" subtitle="다양한 친목 활동" />

      <div className="flex flex-col sm:flex-row gap-3">
        {activities
          ? activities.map((activity) => (
              <div key={activity.id} className="relative">
                <Image
                  src={activity.images[0]}
                  alt={activity.images[0]}
                  width={250}
                  height={250}
                  onClick={() => setselected(activity)}
                  className={cn(
                    'w-[250px] sm:w-full sm:h-[250px] rounded-3xl object-cover cursor-pointer transition-all duration-300',
                    selected === activity
                      ? 'h-[150px] sm:w-[250px]'
                      : 'h-[50px] sm:w-[75px] grayscale',
                  )}
                />
              </div>
            ))
          : Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="relative">
                <Skeleton
                  className={cn(
                    'w-[250px] sm:w-full sm:h-[250px] rounded-3xl',
                    idx === 0 ? 'h-[150px] sm:w-[250px]' : 'h-[50px] sm:w-[75px]',
                  )}
                />
              </div>
            ))}
      </div>

      {selected ? (
        <p className="text-xl sm:text-3xl font-bold">{selected?.title}</p>
      ) : (
        <Skeleton className="w-72 h-8" />
      )}

      <Wave>
        <div className="flex flex-col items-center space-y-6">
          <Carousel
            opts={{
              align: 'start',
            }}
            setApi={setCarouselApi}
            className="max-w-[300px] sm:max-w-[400px] min-[930px]:max-w-[800px] min-[1300px]:max-w-[1200px]"
          >
            <CarouselContent>
              {selected ? (
                selected.images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="min-[900px]:basis-1/2 min-[1300px]:basis-1/3"
                  >
                    <Image
                      src={image}
                      alt={image}
                      width={500}
                      height={300}
                      loading="eager"
                      className="w-[300px] h-[200px] sm:w-[400px] sm:h-[250px] rounded-xl object-cover"
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <Skeleton className="w-[300px] h-[200px] sm:w-[400px] sm:h-[250px] rounded-xl" />
                </CarouselItem>
              )}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
          {selected ? (
            <p className="text-sm sm:text-lg">{selected.description}</p>
          ) : (
            <Skeleton className="w-60 h-5" />
          )}
        </div>
      </Wave>
    </>
  );
}
