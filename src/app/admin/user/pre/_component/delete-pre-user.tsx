import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import PreUser from '@/api/type/schema/pre-user';

import { toast } from 'sonner';

interface DeletePreUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: PreUser | null;
  callback: (id: string) => void;
}

export default function DeletePreUserModal({
  open,
  setOpen,
  user,
  callback,
}: DeletePreUserModalProps) {
  const onSubmit = useCallback(async () => {
    await Api.Domain.AdminUser.removePreUser(user!.id);

    setOpen(false);

    toast.success('대기 유저를 삭제했습니다.');

    callback(user!.id);
  }, [user]);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>대기 유저 삭제</DialogTitle>
          <DialogDescription>대기 유저를 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableCell>{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>학번</TableHead>
              <TableCell>{user.studentId}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>이메일</TableHead>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>전화번호</TableHead>
              <TableCell>{user.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" type="submit" className="w-full" onClick={onSubmit}>
          대기 유저 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
