import { useState } from 'react';

import { domains } from '@/app/recruit/_constant/domain';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';

import { Domain } from '@/api/type/schema/application';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { LayoutList } from 'lucide-react';
import { toast } from 'sonner';

export default function Step8({ go, form }: RecruitStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <LayoutList size={64} />

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
        <p className="font-medium text-lg">관심 분야를 선택해주세요</p>
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
          {domains.map(({ domain, raw }) => (
            <FormField
              key={raw}
              control={form.control}
              name="domains"
              render={({ field }) => {
                return (
                  <FormItem key={raw} className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(raw as Domain)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, raw])
                            : field.onChange(field.value?.filter((value) => value !== raw));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-base">{domain}</FormLabel>
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
            if (!form.formState.errors.domains && form.getValues('domains').length) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.domains?.message || '관심 분야를 선택해주세요.');
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
