import { useMemo, useState } from 'react';
import { SiGithub } from 'react-icons/si';

import { Button } from '@/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Step11({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const isFinalEdit = useMemo(() => sessionStorage.getItem('recruit:final_edit') === 'true', []);

  return (
    <>
      <SiGithub size={64} />

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
        <p className="font-medium text-lg">GitHub 아이디를 입력해주세요!</p>
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
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Github 아이디를 입력해주세요." {...field} />
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
        {!isFinalEdit && (
          <Button
            variant="outline"
            disabled={clicked}
            onClick={() => {
              setClicked(true);

              form.setValue('github', '');
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

            if (await form.trigger('github')) {
              if (isFinalEdit) {
                sessionStorage.removeItem('recruit:final_edit');
              }

              go((prev) => (isFinalEdit ? 18 : prev + 1));
            } else {
              toast.error(form.formState.errors.github!.message);
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
