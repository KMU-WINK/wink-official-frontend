import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import Api from '@/api';
import { CreateRecruitRequest, CreateRecruitRequestSchema } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';

import { cn, formatDate, formatDateApi } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CreateRecruitModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (recruit: Recruit) => void;
}

export default function CreateRecruitModal({ open, setOpen, callback }: CreateRecruitModalProps) {
  const [recruitDate, setRecruitDate] = useState<DateRange | undefined>();
  const [interviewDate, setInterviewDate] = useState<DateRange | undefined>();

  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CreateRecruitRequest>({
    resolver: zodResolver(CreateRecruitRequestSchema),
    mode: 'onChange',
    defaultValues: {
      year: new Date().getFullYear(),
      semester: 1,
      recruitStartDate: '',
      recruitEndDate: '',
      interviewStartDate: '',
      interviewEndDate: '',
    },
  });

  const onSubmit = useCallback(async (values: CreateRecruitRequest) => {
    setIsProcessing(true);

    const { recruit } = await Api.Domain.AdminRecruit.createRecruit(values);

    setOpen(false);
    setIsProcessing(false);
    form.reset();

    toast.success('모집을 생성했습니다.');

    callback(recruit);
  }, []);

  useEffect(() => {
    if (!recruitDate) return;

    form.setValue('recruitStartDate', formatDateApi(recruitDate.from!));
    form.setValue('recruitEndDate', formatDateApi(recruitDate.to!));
  }, [recruitDate]);

  useEffect(() => {
    if (!interviewDate) return;

    form.setValue('interviewStartDate', formatDateApi(interviewDate.from!));
    form.setValue('interviewEndDate', formatDateApi(interviewDate.to!));
  }, [interviewDate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>모집 생성</DialogTitle>
          <DialogDescription>모집을 생성합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>년도</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="년도를 입력해주세요."
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>학기</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="학기를 입력해주세요."
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="recruitStartDate"
              render={() => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>모집 기간</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            'justify-start text-left font-normal',
                            !recruitDate ? 'text-neutral-500' : '',
                          )}
                        >
                          <CalendarIcon />
                          {recruitDate?.from ? (
                            recruitDate.to ? (
                              <>
                                {formatDate(recruitDate.from, true)} -{' '}
                                {formatDate(recruitDate.to, true)}
                              </>
                            ) : (
                              formatDate(recruitDate.from, true)
                            )
                          ) : (
                            <span>모집 기간을 선택해주세요.</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="range" selected={recruitDate} onSelect={setRecruitDate} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interviewStartDate"
              render={() => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>모집 기간</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            'justify-start text-left font-normal',
                            !interviewDate ? 'text-neutral-500' : '',
                          )}
                        >
                          <CalendarIcon />
                          {interviewDate?.from ? (
                            interviewDate.to ? (
                              <>
                                {formatDate(interviewDate.from, true)} -{' '}
                                {formatDate(interviewDate.to, true)}
                              </>
                            ) : (
                              formatDate(interviewDate.from, true)
                            )
                          ) : (
                            <span>면접 기간을 선택해주세요.</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="range"
                          selected={interviewDate}
                          onSelect={setInterviewDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" disabled={isProcessing} className="w-full">
              모집 생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
