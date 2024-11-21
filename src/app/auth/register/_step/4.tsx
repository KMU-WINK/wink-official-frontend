import { useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { toast } from 'sonner';

export default function Step4({ go, form }: RegisterStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <Info size={64} />

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
        <p className="font-medium text-lg">한 줄 소개를 작성해주세요</p>
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
        className="w-full max-w-[500px]"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="한 줄 소개를 입력해주세요."
                  className="resize-none"
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
        className="flex space-x-4"
      >
        <Button
          variant="outline"
          onClick={() => {
            form.setValue('description', '');
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          onClick={() => {
            if (!form.formState.errors.description) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.description.message);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
