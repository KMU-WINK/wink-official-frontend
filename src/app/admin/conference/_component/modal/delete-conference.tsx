import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { DialogHeader } from '@/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Conference from '@/api/type/schema/conference';
import { useApiWithToast } from '@/api/useApi';

import { formatDateWithTime } from '@/util';

interface DeleteConferenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  conference?: Conference;
  callback: (conferenceId: string) => void;
}

export default function DeleteConferenceModal({
  open,
  setOpen,
  conference,
  callback,
}: DeleteConferenceModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const onSubmit = useCallback(() => {
    if (!conference) return;

    startApi(
      async () => {
        await Api.Domain.AdminConference.deleteConference(conference.id);
        callback(conference.id);
      },
      {
        loading: '정기 회의를 삭제하고 있습니다',
        success: '정기 회의를 삭제했습니다.',
        finally: () => setOpen(false),
      },
    );
  }, [conference]);

  if (!conference) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>정기 회의 삭제</DialogTitle>
          <DialogDescription>정기 회의를 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>날짜</TableHead>
              <TableCell>{formatDateWithTime(new Date(conference.date), true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>장소</TableHead>
              <TableCell>{conference.location}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" type="submit" disabled={isApi} onClick={onSubmit} className="w-full">
          정기 회의 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
