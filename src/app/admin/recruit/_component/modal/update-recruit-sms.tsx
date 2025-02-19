import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import Api from '@/api';
import { UpdateRecruitSmsRequest, UpdateRecruitSmsRequestSchema } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';
import { useApi, useApiWithToast } from '@/api/useApi';

import { zodResolver } from '@hookform/resolvers/zod';

interface UpdateRecruitSmsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  recruit?: Recruit;
}

export default function UpdateRecruitSmsModal({
  open,
  setOpen,
  recruit,
}: UpdateRecruitSmsModalProps) {
  const [isApi, startApi] = useApiWithToast();
  const [isApi2, startApi2] = useApi();

  const paperFailRef = useRef<HTMLTextAreaElement | null>(null);
  const paperPassRef = useRef<HTMLTextAreaElement | null>(null);
  const finalFailRef = useRef<HTMLTextAreaElement | null>(null);
  const finalPassRef = useRef<HTMLTextAreaElement | null>(null);

  const form = useForm<UpdateRecruitSmsRequest>({
    resolver: zodResolver(UpdateRecruitSmsRequestSchema),
    defaultValues: {
      paperFail: '',
      paperPass: '',
      finalFail: '',
      finalPass: '',
    },
  });

  const paperFail = form.watch('paperFail');
  const paperPass = form.watch('paperPass');
  const finalFail = form.watch('finalFail');
  const finalPass = form.watch('finalPass');

  const onSubmit = useCallback(
    (values: UpdateRecruitSmsRequest) => {
      if (!recruit) return;

      startApi(() => Api.Domain.AdminRecruitSms.updateRecruitSms(recruit.id, values), {
        loading: '안내 문자를 수정하고 있습니다.',
        success: '안내 문자를 수정했습니다.',
        finally: () => setOpen(false),
      });
    },
    [recruit],
  );

  useEffect(() => {
    if (!recruit) return;

    startApi2(async () => {
      const { recruitSms } = await Api.Domain.AdminRecruitSms.getForms(recruit.id);
      form.reset(recruitSms);
    });
  }, [recruit]);

  useEffect(() => {
    const textarea = paperFailRef.current;
    if (textarea) {
      textarea.style.height = '100px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [paperFail]);

  useEffect(() => {
    const textarea = paperPassRef.current;
    if (textarea) {
      textarea.style.height = '100px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [paperPass]);

  useEffect(() => {
    const textarea = finalFailRef.current;
    if (textarea) {
      textarea.style.height = '100px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [finalFail]);

  useEffect(() => {
    const textarea = finalPassRef.current;
    if (textarea) {
      textarea.style.height = '100px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [finalPass]);

  if (isApi2 || !recruit) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>안내 문자 수정</DialogTitle>
          <DialogDescription className="grid lg:grid-cols-3 xl:grid-cols-4">
            <p>{'{NAME}'}: 이름</p>
            <p>{'{STUDENT_ID}'}: 학번</p>
            <p>{'{DEPARTMENT}'}: 학부(과)</p>
            <p>{'{EMAIL}'}: 이메일</p>
            <p>{'{PHONE_NUMBER}'}: 전화번호</p>
            <p className="col-span-3">
              {'{TOKEN}'}: 회원가입 토큰
              <span className="font-bold mx-1">(최종 합격만 가능)</span>
              <span className="italic">
                https://wink.kookmin.ac.kr/auth/register?token={'{TOKEN}'}
              </span>
            </p>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paperFail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>서류 탈락</FormLabel>
                    <FormControl>
                      <Textarea
                        className="overflow-hidden resize-none min-h-[100px]"
                        placeholder="서류 탈락 문구를 입력해주세요."
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          paperFailRef.current = e;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paperPass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>서류 합격</FormLabel>
                    <FormControl>
                      <Textarea
                        className="overflow-hidden resize-none min-h-[100px]"
                        placeholder="서류 합격 문구를 입력해주세요."
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          paperPassRef.current = e;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="finalFail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>최종 탈락</FormLabel>
                    <FormControl>
                      <Textarea
                        className="overflow-hidden resize-none min-h-[100px]"
                        placeholder="최종 탈락 문구를 입력해주세요."
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          finalFailRef.current = e;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="finalPass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>최종 합격</FormLabel>
                    <FormControl>
                      <Textarea
                        className="overflow-hidden resize-none min-h-[100px]"
                        placeholder="최종 합격 문구를 입력해주세요."
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          finalPassRef.current = e;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="wink"
              type="submit"
              disabled={isApi}
              className="w-fit px-10 self-center"
            >
              안내 문자 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
