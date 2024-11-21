import { useCallback, useEffect, useState } from 'react';
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

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface UpdateActivityModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activity: Activity | null;
  callback: (activity: Activity) => void;
}

export default function UpdateActivityModal({
  open,
  setOpen,
  activity,
  callback,
}: UpdateActivityModalProps) {
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

  const onSubmit = useCallback(
    async (values: CreateActivityRequest) => {
      const { activity: _activity } = await Api.Domain.Program.AdminActivity.updateActivity(
        activity!.id,
        values,
      );

      setOpen(false);
      form.reset();

      toast.success('활동을 수정했습니다.');

      callback(_activity);
    },
    [activity],
  );

  useEffect(() => {
    form.reset(activity || undefined);
  }, [activity]);

  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>활동 수정</DialogTitle>
          <DialogDescription>활동을 수정합니다.</DialogDescription>
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

                          const files = e.target.files ? Array.from(e.target.files) : [];
                          if (files.length === 0) return;

                          try {
                            const uploadPromises = files.map(async (file) => {
                              const { url } = await Api.Domain.Program.Upload.uploadImage();

                              await fetch(url, {
                                method: 'PUT',
                                body: file,
                                headers: {
                                  'Content-Type': file.type,
                                },
                              });

                              const imageUrl = url.replace(/\?.+$/, '');

                              return new Promise<string>((resolve, reject) => {
                                let attempts = 0;
                                const checkInterval = setInterval(async () => {
                                  try {
                                    const response = await fetch(imageUrl);

                                    if (response.ok) {
                                      clearInterval(checkInterval);
                                      resolve(imageUrl);
                                    }

                                    attempts++;
                                    if (attempts >= 60) {
                                      clearInterval(checkInterval);
                                      reject(new Error('사진 업로드 시간 초과'));
                                    }
                                  } catch (error) {
                                    /* empty */
                                  }
                                }, 500);
                              });
                            });

                            const uploadedImages = await Promise.allSettled(uploadPromises);

                            const successfulImages = uploadedImages
                              .filter((result) => result.status === 'fulfilled')
                              .map((result) => (result as PromiseFulfilledResult<string>).value);

                            const failedImages = uploadedImages.filter(
                              (result) => result.status === 'rejected',
                            );

                            if (successfulImages.length > 0) {
                              field.onChange([...field.value, ...successfulImages]);
                            }

                            if (failedImages.length > 0) {
                              toast.error(`${failedImages.length}개의 사진 업로드에 실패했습니다.`);
                            }
                          } catch (error) {
                            toast.error(`사진 업로드에 실패했습니다. ${error}`);
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
              활동 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
