import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { FinalizePaperRequest, FinalizePaperRequestSchema } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FinalizePaperRequest>({
    resolver: zodResolver(FinalizePaperRequestSchema),
    mode: 'onChange',
    defaultValues: {
      interviewUrl: '',
    },
  });

  const onSubmit = useCallback(
    async (values: FinalizePaperRequest) => {
      setIsProcessing(true);

      await Api.Domain.AdminRecruit.finalizePaper(recruit.id, values);

      setOpen(false);
      setIsProcessing(false);
      form.reset();

      toast.success('서류 결과를 확정했습니다.');

      callback();
    },
    [recruit],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>서류 결과 확정</DialogTitle>
          <DialogDescription>
            {recruit.year}학년도 {recruit.semester}학기 신규 부원 모집 서류 결과를 확정합니다.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="interviewUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>면접 안내 URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="면접 안내 URL을 입력해주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-red-600 text-sm">
              확정 후 안내 문자가 전송됩니다.
              <br />
              이후에 서류 결과를 수정할 수 없습니다.
            </p>

            <Button variant="wink" type="submit" disabled={isProcessing} className="w-full">
              서류 결과 확정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
