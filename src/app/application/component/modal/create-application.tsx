import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import {
  CreateApplicationRequest,
  CreateApplicationRequestSchema,
} from '@/api/type/domain/application';
import Application from '@/api/type/schema/application';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface CreateApplicationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (application: Application) => void;
}

export default function CreateApplicationModal({
  open,
  setOpen,
  callback,
}: CreateApplicationModalProps) {
  const form = useForm<CreateApplicationRequest>({
    resolver: zodResolver(CreateApplicationRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = useCallback(async (values: CreateApplicationRequest) => {
    const { application } = await Api.Domain.Application.createApplication(values);

    setOpen(false);

    toast.success('애플리케이션을 추가하였습니다.');

    callback(application);
  }, []);

  useEffect(form.reset, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>애플리케이션 추가</DialogTitle>
          <DialogDescription>애플리케이션을 추가합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>애플리케이션 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="애플리케이션 이름을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" className="w-full">
              애플리케이션 추가
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
