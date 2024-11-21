import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import History from '@/api/type/schema/history';

import { formatDate } from '@/util';

import { toast } from 'sonner';

interface DeleteHistoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  history: History | null;
  callback: (id: string) => void;
}

export default function DeleteHistoryModal({
  open,
  setOpen,
  history,
  callback,
}: DeleteHistoryModalProps) {
  const onSubmit = useCallback(async () => {
    await Api.Domain.Program.AdminHistory.deleteHistory(history!.id);

    setOpen(false);

    toast.success('연혁을 삭제했습니다.');

    callback(history!.id);
  }, [history]);

  if (!history) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>연혁 삭제</DialogTitle>
          <DialogDescription>연혁을 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableCell>{history.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>날짜</TableHead>
              <TableCell>{formatDate(history.date)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" type="submit" className="w-full" onClick={onSubmit}>
          연혁 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
