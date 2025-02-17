import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';

import { useRecruitStore } from '@/store/recruit';

import Envelope from '@/public/recruit/icon/envelope.png';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step4({ go, recruit, form }: RecruitStepProps) {
  const router = useRouter();

  const { step, modify, setModify, clear } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Image
        src={Envelope}
        width={72}
        height={72}
        quality={100}
        placeholder="blur"
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
              const { duplicated } = await Api.Domain.Recruit.checkEmail(recruit.id, {
                email: form.getValues('email'),
              });

              if (duplicated) {
                clear();
                toast.error('이미 윙크 부원이거나, 이번 모집에 지원하셨습니다.');
                router.replace('/recruit');
                return;
              }

              go(modify || step + 1);
              modify && setTimeout(() => setModify(undefined), 400);
            } else {
              toast.error(form.formState.errors.email!.message);
              setClicked(false);
            }
          }}
        >
          {modify ? '수정 완료' : '다음으로'}
        </Button>
      </motion.div>
    </>
  );
}
