import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Envelope from '@/public/recruit/icon/envelope.png';

import { MigrateStepProps } from '@/app/migrate/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step4({ go, form }: MigrateStepProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Image
        src={Envelope}
        width={72}
        height={72}
        className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]"
        alt="icon"
      />

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
        <p className="font-medium text-lg">이메일을 입력해주세요!</p>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="이메일을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>국민대학교 메일만 사용 가능합니다.</FormDescription>
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

            if (await form.trigger('email')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.email!.message);
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
