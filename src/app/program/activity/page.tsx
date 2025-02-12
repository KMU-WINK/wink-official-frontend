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
  const [api, setApi] = useState<CarouselApi>();

  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [selectedActivity]);

  useEffect(() => {
    (async () => {
      const { activities } = await Api.Domain.Program.Activity.getActivities();
      setActivities(activities);
      setSelectedActivity(activities[0]);
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
                  onClick={() => setSelectedActivity(activity)}
                  className={cn(
                    'w-[250px] sm:w-full sm:h-[250px] rounded-3xl object-cover cursor-pointer transition-all duration-300',
                    selectedActivity === activity
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

      {selectedActivity ? (
        <p className="text-xl sm:text-3xl font-bold">{selectedActivity?.title}</p>
      ) : (
        <Skeleton className="w-72 h-8" />
      )}

      <Wave>
        <div className="flex flex-col items-center space-y-6">
          <Carousel
            opts={{
              align: 'start',
            }}
            setApi={setApi}
            className="max-w-[calc(100vw-10rem)] min-[1500px]:max-w-[1500px]"
          >
            <CarouselContent>
              {selectedActivity ? (
                selectedActivity.images.map((image, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <Image
                      src={image}
                      alt={image}
                      width={500}
                      height={300}
                      className="h-[180px] sm:h-[240px] rounded-xl object-cover"
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <Skeleton className="w-[300px] sm:w-[500px] h-[180px] sm:h-[240px] rounded-xl" />
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {selectedActivity ? (
            <p className="text-sm sm:text-lg">{selectedActivity.description}</p>
          ) : (
            <Skeleton className="w-60 h-5" />
          )}
        </div>
      </Wave>
    </>
  );
}
