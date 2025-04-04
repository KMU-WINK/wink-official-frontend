import { useEffect, useRef, useState } from 'react';
import { IconMLightBulb } from 'react-fluentui-emoji/lib/modern';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { useRecruitStore } from '@/store/recruit';

import { cn } from '@/util';

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
      <div className="size-[48px] sm:size-[72px]">
        <IconMLightBulb size="auto" />
      </div>

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
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 2.2,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="w-full max-w-[300px] sm:max-w-[600px]"
      >
        <div className="flex justify-end">
          <p
            className={cn(
              'text-sm',
              (favoriteProject?.length ?? 0) <= 1000 ? 'text-neutral-500' : 'text-red-500',
            )}
          >
            {favoriteProject?.length ?? 0} / 1000
          </p>
        </div>
        <FormField
          control={form.control}
          name="favoriteProject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="overflow-hidden resize-none"
                  placeholder="스스로 공부하거나 기억에 남는 프로젝트를 알려주세요."
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
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 3.1,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="flex items-center space-x-4"
      >
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
