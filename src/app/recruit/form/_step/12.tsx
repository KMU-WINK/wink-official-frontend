import { useState } from 'react';
import { IconMLaptop } from 'react-fluentui-emoji/lib/modern';

import StackButton from '@/app/recruit/form/_component/StackButton';

import { Button } from '@/ui/button';

import { useRecruitStore } from '@/store/recruit';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';

export default function Step12({ go, form }: RecruitStepProps) {
  const { step, modify, setModify, setStack } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="size-[48px] sm:size-[72px]">
        <IconMLaptop size="auto" />
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
        <p className="font-medium text-lg">어떤 분야에 관심이 있으신가요?</p>
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
        className="flex flex-col space-y-2 w-full max-w-[300px]"
      >
        <StackButton name="프론트엔드" raw="frontend" />
        <StackButton name="백엔드" raw="backend" />
        <StackButton name="데브옵스" raw="devops" />
        <StackButton name="디자인" raw="design" />
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
        {!modify && (
          <Button
            variant="outline"
            disabled={clicked}
            onClick={() => {
              setClicked(true);
              setStack([]);

              form.setValue('frontendTechStacks', []);
              form.setValue('backendTechStacks', []);
              form.setValue('devOpsTechStacks', []);
              form.setValue('designTechStacks', []);

              go(17);
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
            go(modify || step + 1);
            modify && setTimeout(() => setModify(undefined), 400);
          }}
        >
          {modify ? '수정 완료' : '다음으로'}
        </Button>
      </motion.div>
    </>
  );
}
