import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { Button } from '@/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import {
  CreateActivityRequest,
  CreateActivityRequestSchema,
} from '@/api/type/domain/program/activity';
import Activity from '@/api/type/schema/activity';

import { uploadS3 } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CreateActivityModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (activity: Activity) => void;
}

export default function CreateActivityModal({ open, setOpen, callback }: CreateActivityModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CreateActivityRequest>({
    resolver: zodResolver(CreateActivityRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      images: [],
    },
  });

  const onSubmit = useCallback(async (values: CreateActivityRequest) => {
    const { activity } = await Api.Domain.Program.AdminActivity.createActivity(values);

    setOpen(false);
    form.reset();

    toast.success('활동을 생성했습니다.');

    callback(activity);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>활동 생성</DialogTitle>
          <DialogDescription>활동을 생성합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="제목을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input placeholder="설명을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex flex-row gap-4">
                    사진
                    {field.value.length > 0 && (
                      <Trash2
                        className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer"
                        onClick={() => field.onChange([])}
                      />
                    )}
                  </FormLabel>
                  <FormControl>
                    <>
                      {field.value.length === 0 ? (
                        <div
                          className="flex items-center justify-center rounded-md border text-neutral-500 hover:text-black w-[375px] h-[150px] cursor-pointer"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="w-8 h-8" />
                        </div>
                      ) : (
                        <Carousel className="w-[calc(100%-5rem)] mx-auto">
                          <CarouselContent>
                            {field.value.map((url, index) => (
                              <CarouselItem key={index}>
                                <Image
                                  src={url}
                                  alt={url}
                                  width={375}
                                  height={150}
                                  className="h-[150px] rounded-md object-cover"
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      )}

                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          setIsUploading(true);

                          try {
                            const imgs = await uploadS3(e.target.files!, () =>
                              Api.Domain.Program.Upload.uploadImage(),
                            );

                            field.onChange([...field.value, ...imgs]);
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

            <Button variant="wink" type="submit" className="w-full">
              활동 생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
