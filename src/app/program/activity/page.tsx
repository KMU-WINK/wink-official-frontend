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

import Api from '@/api';
import Activity from '@/api/type/schema/activity';

import { cn } from '@/util';

export default function ProgramActivityPage() {
  const [api, setApi] = useState<CarouselApi>();

  const [activities, setActivities] = useState<Activity[]>([]);
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
        {activities.map((activity) => (
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
        ))}
      </div>

      <p className="text-xl sm:text-2xl font-bold">{selectedActivity?.title}</p>

      <Wave>
        {selectedActivity && (
          <div className="flex flex-col items-center space-y-6">
            <Carousel
              opts={{
                align: 'start',
              }}
              setApi={setApi}
              className="max-w-[calc(100vw-10rem)]"
            >
              <CarouselContent>
                {selectedActivity.images.map((image, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <Image
                      src={image}
                      alt={image}
                      width={500}
                      height={300}
                      className="h-[150px] sm:h-[200px] rounded-xl object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <p className="text-sm sm:text-lg font-medium">{selectedActivity?.description}</p>
          </div>
        )}
      </Wave>
    </>
  );
}
