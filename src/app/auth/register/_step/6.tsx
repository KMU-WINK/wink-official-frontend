import { useState } from 'react';
import { FiInstagram } from 'react-icons/fi';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step6({ go, form }: RegisterStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <FiInstagram size={64} />

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
        <p className="font-medium text-lg">Instagram 아이디를 입력해주세요</p>
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
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Instagram 아이디를 입력해주세요." {...field} />
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
            form.setValue('instagram', '');
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          onClick={() => {
            if (!form.formState.errors.instagram) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.instagram.message);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
