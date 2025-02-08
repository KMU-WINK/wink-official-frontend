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

  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <IdCard size={64} />

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
        <p className="font-medium text-lg">
          좋아요, {form.getValues('name').substring(1)}님! 학번을 알려주세요
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.2,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
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
        animate={{
          opacity: 1,
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

            if (!form.formState.errors.studentId && form.getValues('studentId')) {
              const { duplicated } = await Api.Domain.Recruit.checkStudentId(recruit.id, {
                studentId: form.getValues('studentId'),
              });

              if (duplicated) {
                localStorage.removeItem('recruit-data');
                localStorage.removeItem('recruit-step');

                toast.error('이미 윙크 부원이거나, 이번 모집에 지원하셨습니다.');
                router.replace('/recruit');
                return;
              }

              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.studentId?.message || '학번을 입력해주세요.');
              setClicked(false);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
