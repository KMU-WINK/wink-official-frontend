import { useState } from 'react';

import { Button } from '@/ui/button';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { Laptop } from 'lucide-react';

export default function Step8({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <Laptop size={64} />

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
        <p className="font-medium text-lg">혹시 개발 경험이 있으신가요?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
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

            sessionStorage.setItem('recruit-prev-develop', 'false');

            form.resetField('github');
            form.resetField('frontendTechStacks');
            form.resetField('backendTechStacks');
            form.resetField('devOpsTechStacks');
            form.resetField('designTechStacks');
            form.resetField('favoriteProject');

            go(15);
          }}
        >
          아니요
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            go((prev) => prev + 1);
          }}
        >
          네!
        </Button>
      </motion.div>
    </>
  );
}
