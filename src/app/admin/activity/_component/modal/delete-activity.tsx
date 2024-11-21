import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Activity from '@/api/type/schema/activity';

import { toast } from 'sonner';

interface DeleteActivityModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activity: Activity | null;
  callback: (id: string) => void;
}

export default function DeleteActivityModal({
  open,
  setOpen,
  activity,
  callback,
}: DeleteActivityModalProps) {
  const onSubmit = useCallback(async () => {
    await Api.Domain.Program.AdminActivity.deleteActivity(activity!.id);

    setOpen(false);

    toast.success('활동을 삭제했습니다.');

    callback(activity!.id);
  }, [activity]);

  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>활동 삭제</DialogTitle>
          <DialogDescription>활동를 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableCell>{activity.title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" type="submit" className="w-full" onClick={onSubmit}>
          활동 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
