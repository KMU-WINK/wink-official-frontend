import { useMemo, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Camping from '@/public/recruit/icon/camping.png';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step8({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const isFinalEdit = useMemo(() => sessionStorage.getItem('recruit:final_edit') === 'true', []);

  return (
    <>
      <Image
        src={Camping}
        width={72}
        height={72}
        quality={100}
        className="w-[48px] h-[48px] sm:w-[80px] sm:h-[80px]"
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
        <p className="font-medium text-lg">현재 하고 있는 대외활동이 있나요?</p>
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
        {!isFinalEdit && (
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
        )}

        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('outings')) {
              if (isFinalEdit) {
                sessionStorage.removeItem('recruit:final_edit');
              }

              go((prev) => (isFinalEdit ? 18 : prev + 1));
            } else {
              toast.error(form.formState.errors.outings!.message);
              setClicked(false);
            }
          }}
        >
          {isFinalEdit ? '수정 완료' : '다음으로'}
        </Button>
      </motion.div>
    </>
  );
}
