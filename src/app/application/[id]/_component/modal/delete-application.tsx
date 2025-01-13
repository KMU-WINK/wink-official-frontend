import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Application from '@/api/type/schema/application';

import { toast } from 'sonner';

interface DeleteApplicationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: Application;
  callback: () => void;
}

export default function DeleteApplicationModal({
  open,
  setOpen,
  application,
  callback,
}: DeleteApplicationModalProps) {
  const onSubmit = useCallback(async () => {
    await Api.Domain.Application.deleteApplication(application.id);

    setOpen(false);

    toast.success('애플리케이션을 삭제했습니다.');

    callback();
  }, [application]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>애플리케이션 삭제</DialogTitle>
          <DialogDescription>애플리케이션을 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableCell>{application.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" className="w-full" onClick={onSubmit}>
          애플리케이션 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
