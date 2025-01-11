import React, { useCallback, useState } from 'react';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

import Api from '@/api';
import Application from '@/api/type/schema/application';

import { toast } from 'sonner';

interface GeneralSettingProps {
  application: Application;
  setApplication: (application: Application) => void;
}

export default function GeneralSetting({ application, setApplication }: GeneralSettingProps) {
  const [clientSecretVisible, setClientSecretVisible] = useState<boolean>(false);

  const resetSecret = useCallback(async () => {
    if (!application) return;

    const { application: application2 } = await Api.Domain.Application.resetSecret(application.id);

    toast.success('애플리케이션 시크릿을 재발급했습니다.');

    setApplication(application2);
  }, [application]);

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-lg sm:text-2xl font-medium">일반</p>

      <div className="w-full max-w-[450px]">
        <Label htmlFor="client-id">클라이언트 아이디</Label>
        <Input
          id="client-id"
          value={application.id}
          readOnly
          onFocus={() => {
            if ('clipboard' in navigator) {
              navigator.clipboard.writeText(application.id);
              toast.info('클라이언트 아이디를 복사했습니다.');
            }
          }}
        />
      </div>

      <div className="flex space-x-2 items-end">
        <div className="w-full max-w-[450px]">
          <Label htmlFor="client-secret">클라이언트 시크릿</Label>
          <Input
            id="client-secret"
            value={application.secret}
            readOnly
            type={clientSecretVisible ? 'text' : 'password'}
            onFocus={() => {
              setClientSecretVisible(true);

              if ('clipboard' in navigator) {
                navigator.clipboard.writeText(application.secret);
                toast.info('클라이언트 시크릿을 복사했습니다.');
              }
            }}
            onBlur={() => setClientSecretVisible(false)}
          />
        </div>

        <Button onClick={resetSecret}>재발급</Button>
      </div>
    </div>
  );
}
