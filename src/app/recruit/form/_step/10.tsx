import { useState } from 'react';
import { IconMGear } from 'react-fluentui-emoji/lib/modern';

import { Button } from '@/ui/button';

import { useRecruitStore } from '@/store/recruit';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';

export default function Step10({ go, form }: RecruitStepProps) {
  const { step, modify, setModify, setDeveloper } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="size-[48px] sm:size-[72px]">
        <IconMGear size="auto" />
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
        <p className="font-medium text-lg">개발 경험이 있으신가요?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 2.5,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="flex items-center space-x-4"
      >
        <Button
          variant="destructive"
          disabled={clicked}
          onClick={() => {
            setClicked(true);
            setDeveloper(false);

            form.resetField('github');
            form.resetField('frontendTechStacks');
            form.resetField('backendTechStacks');
            form.resetField('devOpsTechStacks');
            form.resetField('designTechStacks');
            form.resetField('favoriteProject');

            go(18);
          }}
        >
          아니요
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={() => {
            setClicked(true);
            setDeveloper(true);
            go(modify || step + 1);
            modify && setTimeout(() => setModify(undefined), 400);
          }}
        >
          네
        </Button>
      </motion.div>
    </>
  );
}
