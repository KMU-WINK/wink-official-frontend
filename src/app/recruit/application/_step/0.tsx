import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

export default function Step0({ go }: RecruitStepProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <motion.div
        initial={{
          scale: 1.1,
          rotate: 10,
        }}
        animate={{
          scale: 1,
          rotate: [10, 30],
          transition: {
            delay: 0.5,
            duration: 0.4,
            repeat: 3,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
      >
        <Hand size={64} />
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: 'easeInOut',
            },
          }}
        >
          <p className="font-medium text-lg">안녕하세요!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 3.1,
              duration: 0.4,
              ease: 'easeInOut',
            },
          }}
        >
          <p>WINK 신입 부원 모집에 지원하시겠어요?</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 4,
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

            router.back();
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
