import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Project from '@/api/type/schema/project';

import { toast } from 'sonner';

interface DeleteProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project | null;
  callback: (id: string) => void;
  isAdmin: boolean;
}

export default function DeleteProjectModal({
  open,
  setOpen,
  project,
  callback,
  isAdmin,
}: DeleteProjectModalProps) {
  const onSubmit = useCallback(async () => {
    await (isAdmin
      ? Api.Domain.Program.AdminProject.deleteProject(project!.id)
      : Api.Domain.Program.Project.deleteProject(project!.id));

    setOpen(false);

    toast.success('프로젝트를 삭제했습니다.');

    callback(project!.id);
  }, [project]);

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 삭제</DialogTitle>
          <DialogDescription>프로젝트를 삭제합니다.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableBody>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableCell>{project.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[105px]">Github 주소</TableHead>
              <TableCell>{project.link}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button variant="wink" type="submit" className="w-full" onClick={onSubmit}>
          프로젝트 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
