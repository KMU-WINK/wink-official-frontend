import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';

import { RecruitStepProps } from '@/app/recruit/application/page';

import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

export default function Step0({ go, recruit }: RecruitStepProps) {
  const router = useRouter();

  const [iconAnimationComplete, setIconAnimationComplete] = useState(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

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
            duration: 0.35,
            repeat: 3,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
        onAnimationComplete={() => setIconAnimationComplete(true)}
      >
        <Hand size={64} />
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            iconAnimationComplete
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                    duration: 0.5,
                    ease: 'easeInOut',
                  },
                }
              : {}
          }
          onAnimationComplete={() => setTitleAnimationComplete(true)}
        >
          <p className="font-medium text-lg">안녕하세요!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            titleAnimationComplete
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                    duration: 0.5,
                    ease: 'easeInOut',
                  },
                }
              : {}
          }
        >
          <p>
            {recruit.year}년도 {recruit.semester}학기 WINK 신입 부원 모집에 지원하실래요?
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          titleAnimationComplete
            ? {
                opacity: 1,
                transition: {
                  delay: 1.5,
                  duration: 0.5,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        className="flex items-center space-x-4"
      >
        <Button variant="destructive" onClick={router.back}>
          아니요
        </Button>
        <Button variant="wink" onClick={() => go((prev) => prev + 1)}>
          네!
        </Button>
      </motion.div>
    </>
  );
}
