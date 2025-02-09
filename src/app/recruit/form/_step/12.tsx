import { useEffect, useState } from 'react';
import { SiHtml5 } from 'react-icons/si';

import StackButton, { Stack } from '@/app/recruit/form/_component/StackButton';

import { Button } from '@/ui/button';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';

export default function Step12({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const [stacks, setStacks] = useState<Stack[]>([]);

  useEffect(() => {
    const _stacks = localStorage.getItem('recruit:stacks');

    if (!_stacks) return;

    setStacks(JSON.parse(_stacks));
  }, []);

  useEffect(() => localStorage.setItem('recruit:stacks', JSON.stringify(stacks)), [stacks]);

  return (
    <>
      <SiHtml5 size={64} />

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
        <p className="font-medium text-lg">분야 선택</p>
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
        className="flex flex-col space-y-2 w-full max-w-[300px]"
      >
        <StackButton name="프론트엔드" raw="frontend" stacks={stacks} setStacks={setStacks} />
        <StackButton name="백엔드" raw="backend" stacks={stacks} setStacks={setStacks} />
        <StackButton name="데브옵스" raw="devops" stacks={stacks} setStacks={setStacks} />
        <StackButton name="디자인" raw="design" stacks={stacks} setStacks={setStacks} />
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

            setStacks([]);
            form.setValue('frontendTechStacks', []);
            form.setValue('backendTechStacks', []);
            form.setValue('devOpsTechStacks', []);
            form.setValue('designTechStacks', []);

            go(17);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            go((prev) => prev + 1);
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
