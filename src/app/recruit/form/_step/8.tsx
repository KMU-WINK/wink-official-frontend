import { useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Step8({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <CalendarCheck size={64} />
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
        <p className="font-medium text-lg">대외활동</p>
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
        className="flex flex-col items-center justify-center w-full max-w-[300px]"
      >
        <FormField
          control={form.control}
          name="outings"
          render={({ field }) => {
            const values = [...(field.value || [])];

            // 마지막 셀이 비어있지 않은 경우에만 빈 셀 추가
            if (values.length === 0 || values[values.length - 1] !== '') {
              values.push('');
            }

            return (
              <>
                {values.map((outing, index) => (
                  <FormItem key={index} className="mb-2 w-full">
                    <FormControl>
                      <Input
                        placeholder="대외활동을 입력해주세요."
                        value={outing}
                        onChange={(e) => {
                          let newValue = [...field.value!];

                          index === newValue.length
                            ? newValue.push(e.target.value)
                            : (newValue[index] = e.target.value);

                          newValue = newValue.filter(
                            (v, i) => i === newValue.length - 1 || v !== '',
                          );

                          if (newValue[newValue.length - 1] !== '') {
                            newValue.push('');
                          }

                          field.onChange(newValue.slice(0, newValue.length - 1));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ))}
              </>
            );
          }}
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
        className="flex items-center space-x-4"
      >
        <Button
          variant="outline"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            form.setValue('outings', []);
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('outings')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.outings!.message);
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
