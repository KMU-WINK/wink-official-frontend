import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import PreUser from '@/api/type/schema/pre-user';
import { useApiWithToast } from '@/api/useApi';

interface DeletePreUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: PreUser;
  callback: (id: string) => void;
}

export default function DeletePreUserModal({
  open,
  setOpen,
  user,
  callback,
}: DeletePreUserModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const onSubmit = useCallback((user: PreUser) => {
    startApi(
      async () => {
        await Api.Domain.AdminUser.removePreUser(user!.id);
        callback(user!.id);
      },
      {
        loading: '대기 유저를 삭제하고 있습니다.',
        success: '대기 유저를 삭제했습니다',
        finally: () => setOpen(false),
      },
    );
  }, []);

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

        <Button
          variant="wink"
          type="submit"
          disabled={isApi}
          className="w-full"
          onClick={() => onSubmit(user)}
        >
          대기 유저 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
