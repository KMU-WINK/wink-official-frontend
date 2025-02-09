import { useEffect, useRef, useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { cn } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { BookA } from 'lucide-react';
import { toast } from 'sonner';

export default function Step7({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selfIntroduce = form.watch('selfIntroduce');

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '200px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [selfIntroduce]);

  return (
    <>
      <BookA size={64} />

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
        <p className="font-medium text-lg">자기소개</p>
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
            selfIntroduce.length <= 500 ? 'text-neutral-500' : 'text-red-500',
          )}
        >
          {selfIntroduce.length} / 500
        </p>
        <FormField
          control={form.control}
          name="selfIntroduce"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="overflow-hidden resize-none"
                  placeholder="배우고 싶은 점을 입력해주세요."
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
      >
        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('selfIntroduce')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.selfIntroduce!.message);
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
