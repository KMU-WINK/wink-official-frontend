import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import {
  UpdateApplicationRequest,
  UpdateApplicationRequestSchema,
} from '@/api/type/domain/application';
import Application from '@/api/type/schema/application';

import { uploadS3 } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface UpdateApplicationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  application: Application;
  callback: (application: Application) => void;
}

export default function UpdateApplicationModal({
  open,
  setOpen,
  application,
  callback,
}: UpdateApplicationModalProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<UpdateApplicationRequest>({
    resolver: zodResolver(UpdateApplicationRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      img: '',
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateApplicationRequest) => {
      const { application: application2 } = await Api.Domain.Application.updateApplication(
        application.id,
        values,
      );

      setOpen(false);

      toast.success('애플리케이션을 수정했습니다.');

      callback(application2);
    },
    [application],
  );

  useEffect(() => {
    form.reset({
      name: application.name,
      img: application.img,
    });
  }, [application]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>애플리케이션 수정</DialogTitle>
          <DialogDescription>애플리케이션을 수정합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>사진</FormLabel>
                  <FormControl>
                    <>
                      <div className="flex w-full justify-center">
                        <div className="relative w-32 h-32">
                          <Avatar className="w-full h-full rounded">
                            <AvatarImage src={field.value} alt={application.name} />
                          </Avatar>

                          <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload color="white" size={32} />
                          </div>
                        </div>
                      </div>

                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          setIsUploading(true);

                          try {
                            const imgs = await uploadS3(e.target.files!, () =>
                              Api.Domain.Application.uploadImg(),
                            );

                            field.onChange(imgs[0]);
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        disabled={isUploading}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              애플리케이션 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
