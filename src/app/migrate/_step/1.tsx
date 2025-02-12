import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Smile from '@/public/recruit/icon/smile.png';

import { MigrateStepProps } from '@/app/migrate/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step1({ go, form }: MigrateStepProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Image
        src={Smile}
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
        <p className="font-medium text-lg">어떻게 불러드리면 될까요?</p>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
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

            if (await form.trigger('name')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.name!.message);
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
