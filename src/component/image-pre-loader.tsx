'use client';

import { Fragment, useEffect, useState } from 'react';

import Image from 'next/image';

import Api from '@/api';
import Activity from '@/api/type/schema/activity';
import History from '@/api/type/schema/history';

export default function ImagePreLoader() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    (async () => {
      const { activities } = await Api.Domain.Program.Activity.getActivities();
      setActivities(activities);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { histories } = await Api.Domain.Program.History.getHistories();
      setHistories(histories);
    })();
  }, []);

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

      {histories.map((history) => (
        <Image
          key={history.id}
          src={history.image}
          alt={history.image}
          width={600}
          height={338}
          quality={100}
          loading="eager"
          priority={false}
        />
      ))}
    </div>
  );
}
