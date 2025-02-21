import { useCallback } from 'react';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Project from '@/api/type/schema/project';
import { useApiWithToast } from '@/api/useApi';

interface DeleteProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  project?: Project;
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
  const [isApi, startApi] = useApiWithToast();

  const onSubmit = useCallback((project: Project) => {
    startApi(
      async () => {
        await (isAdmin
          ? Api.Domain.Program.AdminProject.deleteProject(project!.id)
          : Api.Domain.Program.Project.deleteProject(project!.id));
        callback(project!.id);
      },
      {
        loading: '프로젝트를 삭제하고 있습니다.',
        success: '프로젝트를 삭제했습니다.',
        finally: () => setOpen(false),
      },
    );
  }, []);

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
              <TableHead>설명</TableHead>
              <TableCell>{project.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="w-[105px]">프로젝트 주소</TableHead>
              <TableCell>{project.link}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button
          variant="wink"
          type="submit"
          disabled={isApi}
          className="w-full"
          onClick={() => onSubmit(project)}
        >
          프로젝트 삭제
        </Button>
      </DialogContent>
    </Dialog>
  );
}
