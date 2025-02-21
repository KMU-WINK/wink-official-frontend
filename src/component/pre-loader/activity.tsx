'use client';

import { Fragment } from 'react';

import Image from 'next/image';

import Activity from '@/api/type/schema/activity';

interface ActivityPreLoaderProps {
  activities: Activity[];
}

export default function ActivityPreLoader({ activities }: ActivityPreLoaderProps) {
  return (
    <div className="hidden">
      {activities.map((activity) => (
        <Fragment key={activity.id}>
          <Image
            src={activity.images[0]}
            alt={activity.images[0]}
            width={250}
            height={250}
            quality={100}
            loading="eager"
            priority={false}
          />
          {activity.images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={500}
              height={300}
              quality={100}
              loading="eager"
              priority={false}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
