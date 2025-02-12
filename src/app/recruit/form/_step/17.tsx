import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { useRecruitStore } from '@/store/recruit';

import { cn } from '@/util';

import Bulb from '@/public/recruit/icon/bulb.png';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step17({ go, form }: RecruitStepProps) {
  const { step, modify, setModify } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const favoriteProject = form.watch('favoriteProject');

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '200px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [favoriteProject]);

  return (
    <>
      <Image
        src={Bulb}
        width={72}
        height={72}
        quality={100}
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
        <p className="font-medium text-lg">가장 기억에 남는 프로젝트는 무엇인가요?</p>
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
        className="w-full max-w-[300px] sm:max-w-[600px]"
      >
        <p
          className={cn(
            'text-sm justify-self-end',
            (favoriteProject?.length ?? 0) <= 700 ? 'text-neutral-500' : 'text-red-500',
          )}
        >
          {favoriteProject?.length ?? 0} / 700
        </p>
        <FormField
          control={form.control}
          name="favoriteProject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="overflow-hidden resize-none"
                  placeholder="가장 기억에 남는 프로젝트를 입력해주세요."
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    textareaRef.current = e;
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
        {!modify && (
          <Button
            variant="outline"
            disabled={clicked}
            onClick={() => {
              setClicked(true);

              form.setValue('favoriteProject', '');
              go(step + 1);
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

            if (await form.trigger('favoriteProject')) {
              go(modify || step + 1);
              modify && setTimeout(() => setModify(undefined), 400);
            } else {
              toast.error(form.formState.errors.favoriteProject!.message);
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
