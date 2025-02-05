import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function Step4({ go, recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <Phone size={64} />

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
        <p className="font-medium text-lg">연락 가능한 전화번호를 입력해주세요</p>
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder="전화번호를 입력해주세요."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                      .replace(/(-{1,2})$/g, '');

                    field.onChange(value);
                  }}
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
      >
        <Button
          variant="wink"
          onClick={async () => {
            if (!form.formState.errors.phoneNumber && form.getValues('phoneNumber')) {
              const { duplicated } = await Api.Domain.Recruit.checkPhoneNumber(recruit.id, {
                phoneNumber: form.getValues('phoneNumber'),
              });

              if (duplicated) {
                toast.error('이미 윙크 부원이거나, 이번 모집에 지원하셨습니다.');
                router.replace('/recruit');
                return;
              }

              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.phoneNumber?.message || '전화번호를 입력해주세요.');
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
