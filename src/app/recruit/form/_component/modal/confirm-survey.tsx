import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';

import Api from '@/api';
import { RecruitFormRequest } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';

import { useRecruitStore } from '@/store/recruit';

import { toast } from 'sonner';

interface ConfirmSurveyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  recruit: Recruit;
  form: UseFormReturn<RecruitFormRequest>;
}

export default function ConfirmSurveyModal({
  open,
  setOpen,
  recruit,
  form,
}: ConfirmSurveyModalProps) {
  const router = useRouter();

  const { clear } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>지원서 제출</DialogTitle>
          <DialogDescription>지원서를 제출하면 이후 수정이 불가능합니다.</DialogDescription>
        </DialogHeader>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={() => {
            toast.promise(
              async () => {
                await Api.Domain.Recruit.recruitForm(recruit.id, {
                  ...form.getValues(),
                  whyCannotInterview: form.getValues('whyCannotInterview') || undefined,
                  github: form.getValues('github') || undefined,
                  favoriteProject: form.getValues('favoriteProject') || undefined,
                });

                clear();
                router.push('/recruit');
              },
              {
                loading: '지원서를 제출하고 있습니다.',
                success: (
                  <div className="flex flex-col space-y-2">
                    <p className="font-medium">지원서를 제출했습니다.</p>
                    <p className="text-neutral-500">면접 대상자는 추후 문자로 안내될 예정입니다.</p>
                  </div>
                ),
                duration: 1000 * 60 * 3,
                finally: () => setClicked(false),
              },
            );
          }}
        >
          제출하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
