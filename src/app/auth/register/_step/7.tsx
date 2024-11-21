import { useState } from 'react';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { NotebookPen } from 'lucide-react';
import { toast } from 'sonner';

export default function Step7({ go, form }: RegisterStepProps) {
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  return (
    <>
      <NotebookPen size={64} />

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
        <p className="font-medium text-lg">마지막으로, 블로그 주소를 입력해주세요</p>
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
        className="w-full max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="blog"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="url" placeholder="블로그 주소를 입력해주세요." {...field} />
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
        className="flex space-x-4"
      >
        <Button
          variant="outline"
          onClick={() => {
            form.setValue('blog', '');
            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          onClick={() => {
            if (!form.formState.errors.blog) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.blog.message);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
