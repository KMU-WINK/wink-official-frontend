import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { DialogHeader } from '@/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import Api from '@/api';
import {
  CreateHistoryRequest,
  CreateHistoryRequestSchema,
} from '@/api/type/domain/program/history';
import History from '@/api/type/schema/history';

import { formatDate, formatDateApi, toDate } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CreateHistoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (history: History) => void;
}

export default function CreateHistoryModal({ open, setOpen, callback }: CreateHistoryModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CreateHistoryRequest>({
    resolver: zodResolver(CreateHistoryRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      image: '',
      date: '',
    },
  });

  const onSubmit = useCallback(async (values: CreateHistoryRequest) => {
    const { history } = await Api.Domain.Program.AdminHistory.createHistory(values);

    setOpen(false);
    form.reset();

    toast.success('연혁을 생성했습니다.');

    callback(history);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>연혁 추가</DialogTitle>
          <DialogDescription>연혁을 추가합니다.</DialogDescription>
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
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>날짜</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="font-normal">
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span className="text-neutral-500">날짜를 선택해주세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={toDate(field.value)}
                        onSelect={(date) => date && field.onChange(formatDateApi(date))}
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>사진</FormLabel>
                  <FormControl>
                    <>
                      <div
                        className="relative w-[375px] h-[150px] cursor-pointer"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                      >
                        {field.value ? (
                          <>
                            <Image
                              src={field.value}
                              alt={field.value}
                              width={375}
                              height={200}
                              className="w-full h-full rounded-md object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex rounded-md items-center justify-center"
                              onClick={() => document.getElementById('image-upload')?.click()}
                            >
                              <Upload className="w-8 h-8 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full rounded-md border text-neutral-500 hover:text-black">
                            <Upload className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          setIsUploading(true);

                          const file = e.target.files?.[0];
                          if (!file) return;

                          const { url } = await Api.Domain.Program.Upload.uploadImage();

                          try {
                            await fetch(url, {
                              method: 'PUT',
                              body: file,
                              headers: {
                                'Content-Type': file.type,
                              },
                            });

                            const imageUrl = url.replace(/\?.+$/, '');

                            let isUploaded = false;
                            const checkInterval = setInterval(async () => {
                              const response = await fetch(imageUrl);

                              if (response.ok) {
                                clearInterval(checkInterval);
                                isUploaded = true;
                                field.onChange(imageUrl);
                              }
                            }, 500);

                            setTimeout(() => {
                              if (isUploaded) return;
                              clearInterval(checkInterval);
                              toast.error('사진 업로드에 실패했습니다.');
                            }, 1000 * 30);
                          } catch (error) {
                            toast.error(`사진 업로드에 실패했습니다. ${error}`);
                            throw new Error(error as string);
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
              연혁 추가
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
