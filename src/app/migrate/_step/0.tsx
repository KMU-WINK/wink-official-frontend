import { useState } from 'react';
import { IconMHandWithFingersSplayedDefault } from 'react-fluentui-emoji/lib/modern';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';

import { MigrateStepProps } from '@/app/migrate/page';

import { motion } from 'framer-motion';

export default function Step0({ go }: MigrateStepProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);

  return (
    <>
      <motion.div
        initial={{
          scale: 1.1,
          rotate: -10,
        }}
        animate={{
          scale: [1.1, 1],
          rotate: [-20, 0],
          transition: {
            delay: 0.5,
            duration: 0.4,
            repeat: 3,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
      >
        <div className="size-[48px] sm:size-[72px]">
          <IconMHandWithFingersSplayedDefault size="auto" />
        </div>
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
          <p>WINK 부원 가입을 진행하시겠어요?</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 4.7,
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
          className="transition-opacity"
          variant="wink"
          disabled={clicked}
          onClick={() => go((prev) => prev + 1)}
        >
          네
        </Button>
      </motion.div>
    </>
  );
}
