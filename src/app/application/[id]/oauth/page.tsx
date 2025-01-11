'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

import Api from '@/api';
import Application from '@/api/type/schema/application';

import { useUserStore } from '@/store/user';

import { SCOPE_MAP } from '@/app/application/[id]/constant/scope-map';

import { toast } from 'sonner';

interface OauthLoginPageProps {
  params: { id: string };
}

export default function OauthLoginPage({ params }: OauthLoginPageProps) {
  const router = useRouter();
  const queryParams = useSearchParams();

  const { user } = useUserStore();

  const callback: string | null = queryParams.has('callback')
    ? decodeURIComponent(queryParams.get('callback')!)
    : null;

  const [loading, setLoading] = useState<boolean>(true);
  const [application, setApplication] = useState<Application>();

  const onLogin = useCallback(async () => {
    if (!application) return;

    const { token } = await Api.Domain.Application.oauthLogin(application.id);

    window.location.href = `${callback}?token=${token}`;
  }, [application]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { application } = await Api.Domain.Application.getApplication(params.id);

      if (!application.login.enable) {
        toast.error('이 애플리케이션은 로그인 기능을 지원하지 않습니다.');
        router.replace('/');
        return;
      }

      if (!callback || !application.login.urls.includes(callback)) {
        toast.error('잘못된 콜백 URL입니다.');
        router.replace('/');
        return;
      }

      setApplication(application);
      setLoading(false);
    })();
  }, []);

  if (loading || !application) return null;

  return (
    <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 space-y-10">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32 sm:w-40 sm:h-40 rounded">
          <AvatarImage src={application.img} alt="avatar" />
          <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <p className="text-2xl sm:text-3xl font-bold">{application.name}</p>
      </div>

      <Separator className="sm:max-w-[500px]" />

      <div className="flex flex-col items-center space-y-2">
        <p className="sm:text-lg font-semibold">현재 로그인된 계정</p>
        <p className="flex gap-0.5 items-center">
          {user!.name} <p className="text-sm text-neutral-500 italic">({user!.studentId})</p>
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <p className="sm:text-lg font-semibold">제공하는 정보</p>

        <div className="flex flex-col items-center space-y-2">
          {application.login.scopes
            .map((scope) => SCOPE_MAP.find((x) => x.value === scope))
            .map((scope) => {
              const Icon = scope!.icon;

              return (
                <div key={scope!.name} className="flex space-x-2">
                  <Icon size={20} />
                  <p>{scope!.name}</p>
                </div>
              );
            })}
        </div>
      </div>

      <Separator className="sm:max-w-[500px]" />

      <Button variant="wink" onClick={onLogin}>
        계속하기
      </Button>
    </div>
  );
}
