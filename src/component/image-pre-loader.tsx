'use client';

import { Fragment, useEffect, useState } from 'react';

import Image from 'next/image';

import { Avatar, AvatarImage } from '@/ui/avatar';

import Api from '@/api';
import Activity from '@/api/type/schema/activity';
import History from '@/api/type/schema/history';
import Study from '@/api/type/schema/study';
import User from '@/api/type/schema/user';

export default function ImagePreLoader() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [histories, setHistories] = useState<History[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  useEffect(() => {
    (async () => {
      const { studies } = await Api.Domain.Program.Study.getStudies();
      setStudies(studies.content);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { users } = await Api.Domain.User.getUsers();
      setUsers(users);
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
            priority
          />
          {activity.images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={500}
              height={300}
              quality={100}
              priority
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
          priority
        />
      ))}

      {studies
        .filter((study) => study.image)
        .map((study) => (
          <Image
            key={study.id}
            src={study.image!}
            alt={study.image!}
            width={200}
            height={125}
            quality={100}
          />
        ))}

      {users
        .filter((user) => user.avatar)
        .map((user) => (
          <Avatar key={user.id} className="w-12 sm:w-16 h-12 sm:h-16">
            <AvatarImage src={user.avatar} alt={user.avatar} />
          </Avatar>
        ))}
    </div>
  );
}
