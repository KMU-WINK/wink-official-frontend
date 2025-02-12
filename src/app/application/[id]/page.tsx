'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import GeneralSetting from '@/app/application/[id]/_component/layout/GeneralSetting';
import LoginSetting from '@/app/application/[id]/_component/layout/LoginSetting';
import DeleteApplicationModal from '@/app/application/[id]/_component/modal/delete-application';
import UpdateApplicationModal from '@/app/application/[id]/_component/modal/update-application';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

import Api from '@/api';
import Application from '@/api/type/schema/application';
import { useApi } from '@/api/useApi';

import { Pen, Trash2 } from 'lucide-react';

interface ApplicationDetailPageProps {
  params: { id: string };
}

export default function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const router = useRouter();

  const [isApi, startApi] = useApi();

  const [application, setApplication] = useState<Application>();

  const [updateApplicationModalOpen, setUpdateApplicationModalOpen] = useState(false);
  const [deleteApplicationModalOpen, setDeleteApplicationModalOpen] = useState(false);

  useEffect(() => {
    startApi(async () => {
      const { application } = await Api.Domain.Application.getApplication(params.id);

      if (!application.secret) {
        router.back();
        return;
      }

      setApplication(application);
    });
  }, []);

  if (isApi || !application) return null;

  return (
    <>
      <div className="flex flex-col space-y-8 p-12">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Avatar className="w-20 h-20 rounded">
              <AvatarImage src={application.img} alt="avatar" />
              <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-2xl sm:text-3xl font-bold">{application.name}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="wink" onClick={() => setUpdateApplicationModalOpen(true)}>
              <Pen />
              수정
            </Button>
            <Button variant="destructive" onClick={() => setDeleteApplicationModalOpen(true)}>
              <Trash2 />
              삭제
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col space-y-12 sm:px-8">
          <GeneralSetting application={application} setApplication={setApplication} />
          <LoginSetting application={application} setApplication={setApplication} />
        </div>
      </div>

      <UpdateApplicationModal
        open={updateApplicationModalOpen}
        setOpen={setUpdateApplicationModalOpen}
        application={application}
        callback={(application) => setApplication(application)}
      />

      <DeleteApplicationModal
        open={deleteApplicationModalOpen}
        setOpen={setDeleteApplicationModalOpen}
        application={application}
        callback={() => router.replace('/application')}
      />
    </>
  );
}
