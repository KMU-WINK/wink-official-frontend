import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Recruit from '@/api/type/schema/recruit';
import { useApiWithToast } from '@/api/useApi';

interface DeleteRecruitModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  recruit?: Recruit;
  callback: (id: string) => void;
}

export default function DeleteRecruitModal({
  open,
  setOpen,
  recruit,
  callback,
}: DeleteRecruitModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const onSubmit = useCallback((recruit: Recruit) => {
    startApi(
      async () => {
        await Api.Domain.AdminRecruit.deleteRecruit(recruit!.id);
        callback(recruit!.id);
      },
      {
        loading: '모집을 삭제하고 있습니다.',
        success: '모집을 삭제했습니다.',
        finally: () => setOpen(false),
      },
    );
  }, []);

  if (!recruit) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>모집 삭제</DialogTitle>
          <DialogDescription>모집을 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>년도</TableHead>
              <TableCell>{recruit.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>학기</TableHead>
              <TableCell>{recruit.semester}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button
          variant="wink"
          type="submit"
          disabled={isApi}
          className="w-full"
          onClick={() => onSubmit(recruit)}
        >
          모집 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
