import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';

import Api from '@/api';
import Recruit from '@/api/type/schema/recruit';
import { useApiWithToast } from '@/api/useApi';

interface FinalizePaperModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  recruit: Recruit;
  callback: () => void;
}

export default function FinalizePaperModal({
  open,
  setOpen,
  recruit,
  callback,
}: FinalizePaperModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const onSubmit = useCallback((recruit: Recruit) => {
    startApi(
      async () => {
        await Api.Domain.AdminRecruitForm.finalizePaper(recruit.id);
        callback();
      },
      {
        loading: '서류 결과를 확정하고 있습니다.',
        success: '서류 결과를 확정했습니다.',
        finally: () => setOpen(false),
      },
    );
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>서류 결과 확정</DialogTitle>
          <DialogDescription>
            {recruit.year}학년도 {recruit.semester}학기 신규 부원 모집 서류 결과를 확정합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full space-y-4">
          <p className="text-red-600 text-sm">
            확정 후 안내 문자가 전송됩니다.
            <br />
            이후에 서류 결과를 수정할 수 없습니다.
          </p>

          <Button
            variant="wink"
            disabled={isApi}
            className="w-full"
            onClick={() => onSubmit(recruit)}
          >
            서류 결과 확정
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
