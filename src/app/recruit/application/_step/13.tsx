import { useState } from 'react';
import { SiDocker } from 'react-icons/si';

import { devOpsTechStacks } from '@/app/recruit/application/_constant/tech_stack';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/ui/form';

import { DevOpsTechStack } from '@/api/type/schema/application';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step13({ go, form }: RecruitStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <SiDocker size={64} />

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
        <p className="font-medium text-lg">다룰 수 있는 DevOps 기술을 선택해주세요</p>
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
        className="flex flex-col w-full max-w-[300px]"
      >
        <FormItem className="space-y-4">
          {devOpsTechStacks.map(({ name, raw }) => (
            <FormField
              key={raw}
              control={form.control}
              name="devOpsTechStacks"
              render={({ field }) => {
                return (
                  <FormItem key={raw} className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value!.includes(raw as DevOpsTechStack)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value!, raw])
                            : field.onChange(field.value!.filter((value) => value !== raw));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-base">{name}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
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
        className="flex items-center space-x-4"
      >
        <Button
          variant="outline"
          onClick={() => {
            form.setValue('devOpsTechStacks', []);
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          onClick={() => {
            if (!form.formState.errors.devOpsTechStacks) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.devOpsTechStacks.message);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}