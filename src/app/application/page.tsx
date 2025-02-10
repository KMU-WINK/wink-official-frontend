'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CreateApplicationModal from '@/app/application/_component/modal/create-application';

import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import Application from '@/api/type/schema/application';

import { BookText, Plus } from 'lucide-react';

export default function ApplicationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  const [createApplicationModalOpen, setCreateApplicationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { applications } = await Api.Domain.Application.getApplications();

      setApplications(applications);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8 p-12">
        <div className="flex justify-between items-end">
          <p className="text-2xl sm:text-3xl font-medium">내 애플리케이션</p>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => router.push('/application/manual')}>
              <BookText />
              가이드
            </Button>
            <Button variant="wink" onClick={() => setCreateApplicationModalOpen(true)}>
              <Plus />
              추가
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-4">
          {loading ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <Skeleton key={idx} className="w-52 h-52 rounded-xl" />
            ))
          ) : applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application.id}
                className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-xl cursor-pointer"
                onClick={() => router.push(`/application/${application.id}`)}
              >
                <Image
                  src={application.img}
                  alt={application.name}
                  width={208}
                  height={208}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 hover:bg-opacity-50 transition-all rounded-xl"></div>
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-white font-semibold max-w-48 truncate">
                  {application.name}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full mt-10 sm:mt-20">
              <p className="text-neutral-500">애플리케이션이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <CreateApplicationModal
        open={createApplicationModalOpen}
        setOpen={setCreateApplicationModalOpen}
        callback={(application) => setApplications((prev) => [...prev, application])}
      />
    </>
  );
}
