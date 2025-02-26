'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Path, UseFormReturn, useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';
import { Textarea } from '@/ui/textarea';

import Api from '@/api';
import { UpdateRecruitSmsRequest, UpdateRecruitSmsRequestSchema } from '@/api/type/domain/recruit';
import { useApi, useApiWithToast } from '@/api/useApi';

import { useUserStore } from '@/store/user';

import { zodResolver } from '@hookform/resolvers/zod';

interface AdminRecruitSmsPageProps {
  params: { id: string };
}

export default function AdminRecruitSmsPage({ params }: AdminRecruitSmsPageProps) {
  const [isApi, startApi] = useApiWithToast();
  const [isApi2, startApi2] = useApi();

  const form = useForm<UpdateRecruitSmsRequest>({
    resolver: zodResolver(UpdateRecruitSmsRequestSchema),
    defaultValues: {
      paperFail: '',
      paperPass: '',
      finalFail: '',
      finalPass: '',
    },
  });

  const onSubmit = useCallback(
    (values: UpdateRecruitSmsRequest) => {
      startApi(() => Api.Domain.AdminRecruitSms.updateRecruitSms(params.id, values), {
        loading: '안내 문자를 수정하고 있습니다.',
        success: '안내 문자를 수정했습니다.',
      });
    },
    [params.id],
  );

  useEffect(() => {
    startApi2(async () => {
      const { recruitSms } = await Api.Domain.AdminRecruitSms.getForms(params.id);
      form.reset(recruitSms);
    });
  }, [params.id]);

  if (isApi2) return null;

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">안내 문자 수정</h1>

      <Table className="w-fit">
        <TableBody>
          <TableRow>
            <TableHead className="w-[110px]">이름</TableHead>
            <TableCell className="w-[110px]">{'{NAME}'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[110px]">학번</TableHead>
            <TableCell className="w-[110px]">{'{STUDENT_ID}'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[110px]">학부(과)</TableHead>
            <TableCell className="w-[110px]">{'{DEPARTMENT}'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[110px]">이메일</TableHead>
            <TableCell className="w-[110px]">{'{EMAIL}'}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="w-[110px]">전화번호</TableHead>
            <TableCell className="w-[110px]">{'{PHONE_NUMBER}'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <AutoResizeTextarea
            recruitId={params.id}
            form={form}
            name="서류 탈락"
            raw="paperFail"
            field="PAPER_FAIL"
          />

          <AutoResizeTextarea
            recruitId={params.id}
            form={form}
            name="서류 합격"
            raw="paperPass"
            field="PAPER_PASS"
          />

          <AutoResizeTextarea
            recruitId={params.id}
            form={form}
            name="최종 탈락"
            raw="finalFail"
            field="FINAL_FAIL"
          />

          <AutoResizeTextarea
            recruitId={params.id}
            form={form}
            name="최종 학격"
            raw="finalPass"
            field="FINAL_PASS"
            label="예시: https://wink.kookmin.ac.kr/auth/register?token={TOKEN}"
          />

          <Button variant="wink" type="submit" disabled={isApi} className="w-fit px-10 self-center">
            안내 문자 수정
          </Button>
        </form>
      </Form>
    </div>
  );
}

interface AutoResizeTextareaProps {
  recruitId: string;
  form: UseFormReturn<UpdateRecruitSmsRequest>;
  name: string;
  raw: Path<UpdateRecruitSmsRequest>;
  label?: string;
  field: 'PAPER_FAIL' | 'PAPER_PASS' | 'FINAL_FAIL' | 'FINAL_PASS';
}

function AutoResizeTextarea({ recruitId, form, name, raw, label, field }: AutoResizeTextareaProps) {
  const [isApi, startApi] = useApiWithToast();

  const { user } = useUserStore();

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const toByteLength = useCallback((str: string) => {
    const encoder = new TextEncoder();
    const encodedStr = encoder.encode(str);
    return encodedStr.length;
  }, []);

  const value = form.watch(raw);

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = '100px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col space-y-1">
      <FormField
        control={form.control}
        name={raw}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {name} ({toByteLength(form.getValues(raw)).toLocaleString()}/2,000 바이트)
            </FormLabel>
            <FormControl>
              <Textarea
                className="overflow-hidden resize-none min-h-[100px]"
                placeholder={`${name} 문구를 입력해주세요.`}
                {...field}
                ref={(e) => {
                  field.ref(e);
                  ref.current = e;
                }}
              />
            </FormControl>
            <FormMessage />
            {label && <FormLabel>{label}</FormLabel>}
          </FormItem>
        )}
      />
      <Button
        variant="outline"
        className="w-fit"
        disabled={isApi}
        onClick={(e) => {
          e.preventDefault();

          startApi(
            async () => {
              await Api.Domain.AdminRecruitSms.sendTestSms(recruitId, {
                field,
                phoneNumber: user!.phoneNumber,
              });
            },
            {
              loading: '테스트 문자를 전송하고 있습니다.',
              success: '테스트 문자를 전송했습니다.',
            },
          );
        }}
      >
        테스트 문자 전송
      </Button>
    </div>
  );
}
