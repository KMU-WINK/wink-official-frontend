import { useMemo, useState } from 'react';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';

import { RecruitStepProps } from '@/app/recruit/application/page';
import { formatDate, formatDateApi, toDate } from '@/lib/util';

import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Step7({ go, recruit, form }: RecruitStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  const interviewDates = useMemo(() => {
    const dates = [];

    let date = toDate(recruit.interviewStartDate);
    while (true) {
      dates.push(new Date(date));
      date = new Date(date.setDate(date.getDate() + 1));
      if (date > toDate(recruit.interviewEndDate)) break;
    }

    return dates;
  }, [recruit]);

  return (
    <>
      <CalendarCheck size={64} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.25,
            duration: 0.5,
          },
        }}
        onAnimationComplete={() => setTitleAnimationComplete(true)}
      >
        <p className="font-medium text-lg">면접 가능한 날짜를 선택해주세요</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          titleAnimationComplete
            ? {
                opacity: 1,
                transition: {
                  delay: 0.75,
                  duration: 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        className="flex flex-col items-center justify-center w-full max-w-[300px]"
      >
        <FormItem className="space-y-4">
          {interviewDates.map((date, index) => (
            <FormField
              key={index}
              control={form.control}
              name="canInterviewDates"
              render={({ field }) => {
                return (
                  <FormItem key={index} className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(formatDateApi(date))}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, formatDateApi(date)])
                            : field.onChange(
                                field.value?.filter((value) => value !== formatDateApi(date)),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-base">{formatDate(date, true)}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          titleAnimationComplete
            ? {
                opacity: 1,
                transition: {
                  delay: 0.75,
                  duration: 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
      >
        <Button
          variant="wink"
          onClick={() => {
            if (
              !form.formState.errors.canInterviewDates &&
              form.getValues('canInterviewDates').length
            ) {
              go((prev) => prev + 1);
            } else {
              toast.error(
                form.formState.errors.canInterviewDates?.message ||
                  '면접 가능한 날짜를 선택해주세요.',
              );
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
