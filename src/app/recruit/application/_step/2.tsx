import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { IdCard } from 'lucide-react';
import { toast } from 'sonner';

export default function Step2({ go, recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <IdCard size={64} />

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
        <p className="font-medium text-lg">
          좋아요, {form.getValues('name').substring(1)}님! 학번이 어떻게 되나요?
        </p>
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
        className="w-full max-w-[300px]"
      >
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="학번을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          onClick={async () => {
            if (!form.formState.errors.studentId && form.getValues('studentId')) {
              const { duplicated } = await Api.Domain.Recruit.checkStudentId(recruit.id, {
                studentId: form.getValues('studentId'),
              });

              if (duplicated) {
                toast.error('이미 해당 학번으로 지원한 적이 있습니다.');
                router.replace('/recruit');
                return;
              }

              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.studentId?.message || '학번을 입력해주세요.');
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
