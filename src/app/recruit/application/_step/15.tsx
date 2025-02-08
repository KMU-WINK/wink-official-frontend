import { useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Textarea } from '@/ui/textarea';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { MessageCircleMore } from 'lucide-react';
import { toast } from 'sonner';

export default function Step15({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <MessageCircleMore size={64} />

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
        <p className="font-medium text-lg">마지막 한마디를 입력해주세요</p>
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
          name="lastComment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="min-h-[200px] sm:min-h-[300px]"
                  placeholder="마지막 한마디를 입력해주세요."
                  {...field}
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
        <Button
          variant="outline"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            form.setValue('lastComment', '');
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            if (!form.formState.errors.lastComment) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.lastComment.message);
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
