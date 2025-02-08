import { useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { BadgeHelp } from 'lucide-react';
import { toast } from 'sonner';

export default function Step5({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <BadgeHelp size={64} />

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
        <p className="font-medium text-lg">WINK에 왜 지원하시나요?</p>
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
        className="w-[300px] sm:w-[600px]"
      >
        <FormField
          control={form.control}
          name="jiwonDonggi"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-[300px] sm:h-[200px] resize-none"
                  placeholder="지원 동기를 입력해주세요."
                  {...field}
                />
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
          onClick={() => {
            setClicked(true);

            if (!form.formState.errors.jiwonDonggi && form.getValues('jiwonDonggi')) {
              go((prev) => prev + 1);
            } else {
              toast.error(
                form.formState.errors.jiwonDonggi?.message || '지원 동기를 입력해주세요.',
              );
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
