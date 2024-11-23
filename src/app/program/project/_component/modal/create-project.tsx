import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { DialogHeader } from '@/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import {
  CreateProjectRequest,
  CreateProjectRequestSchema,
} from '@/api/type/domain/program/project';
import Project from '@/api/type/schema/project';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CreateProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (project: Project) => void;
}

export default function CreateProjectModal({ open, setOpen, callback }: CreateProjectModalProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<CreateProjectRequest>({
    resolver: zodResolver(CreateProjectRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      image: '',
      link: '',
    },
  });

  const onSubmit = useCallback(async (values: CreateProjectRequest) => {
    const { project } = await Api.Domain.Program.Project.createProject(values);

    setOpen(false);
    form.reset();

    toast.success('프로젝트를 생성했습니다.');

    callback(project);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>프로젝트 추가</DialogTitle>
          <DialogDescription>프로젝트를 추가합니다.</DialogDescription>
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
              name="link"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Github 주소</FormLabel>
                  <FormControl>
                    <Input placeholder="Github 주소를 입력해주세요." {...field} />
                  </FormControl>
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
                      <div className="relative sm:min-w-[375px] h-[150px] cursor-pointer">
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
                          <div
                            className="flex items-center justify-center w-full h-full rounded-md border text-neutral-500 hover:text-black"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
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
              프로젝트 추가
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
