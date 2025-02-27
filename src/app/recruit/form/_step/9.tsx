import { useEffect, useMemo, useState } from 'react';
import { IconMSpiralCalendar } from 'react-fluentui-emoji/lib/modern';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Separator } from '@/ui/separator';

import { useRecruitStore } from '@/store/recruit';

import { formatDate, formatDateApi, toDate } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step9({ go, recruit, form }: RecruitStepProps) {
  const { step, modify, setModify } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  const dateOptions = useMemo(() => {
    const dates = [];

    let date = toDate(recruit.interviewStartDate);
    while (true) {
      dates.push(new Date(date));
      date = new Date(date.setDate(date.getDate() + 1));
      if (date > toDate(recruit.interviewEndDate)) break;
    }

    return dates;
  }, [recruit]);

  const interviewDates = form.watch('interviewDates');

  useEffect(() => {
    if (!interviewDates.some((date) => date === '0001-01-01')) {
      form.resetField('whyCannotInterview');
    }
  }, [interviewDates]);

  return (
    <>
      <div className="size-[48px] sm:size-[72px]">
        <IconMSpiralCalendar size="auto" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.2,
            duration: 0.4,
          },
        }}
      >
        <p className="font-medium text-lg">면접을 볼 수 있는 날짜를 선택해주세요!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 2.2,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="flex flex-col items-center justify-center w-full max-w-[300px]"
      >
        <FormItem className="space-y-4">
          {dateOptions.map((date, index) => (
            <FormField
              key={index}
              control={form.control}
              name="interviewDates"
              render={({ field }) => (
                <FormItem key={index} className="space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(formatDateApi(date))}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([
                              ...field.value.filter((value) => value !== '0001-01-01'),
                              formatDateApi(date),
                            ])
                          : field.onChange(
                              field.value?.filter((value) => value !== formatDateApi(date)),
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-base text-black">{formatDate(date, true)}</FormLabel>
                </FormItem>
              )}
            />
          ))}

          <Separator />

          <FormField
            control={form.control}
            name="interviewDates"
            render={({ field }) => (
              <FormItem className="space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes('0001-01-01')}
                    onCheckedChange={(checked) => {
                      return checked ? field.onChange(['0001-01-01']) : field.onChange([]);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-base text-black">
                  기타
                  {form.watch('interviewDates').includes('0001-01-01') && (
                    <FormField
                      control={form.control}
                      name="whyCannotInterview"
                      render={({ field }) => (
                        <FormItem className="w-full mt-2">
                          <FormControl>
                            <Input placeholder="사유를 입력해주세요." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormLabel>
              </FormItem>
            )}
          />
          <FormMessage />
        </FormItem>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 3.1,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
      >
        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger(['interviewDates', 'whyCannotInterview'])) {
              go(modify || step + 1);
              modify && setTimeout(() => setModify(undefined), 400);
            } else {
              toast.error(
                form.formState.errors.interviewDates?.message ||
                  form.formState.errors.whyCannotInterview!.message,
              );
              setClicked(false);
            }
          }}
        >
          {modify ? '수정 완료' : '다음으로'}
        </Button>
      </motion.div>
    </>
  );
}
