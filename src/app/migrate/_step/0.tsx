import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';

import Hand from '@/public/recruit/icon/hand.avif';

import { MigrateStepProps } from '@/app/migrate/page';

import { motion } from 'framer-motion';

export default function Step0({ go }: MigrateStepProps) {
  const router = useRouter();

  const [clicked, setClicked] = useState<boolean>(false);

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
        <Image
          src={Hand}
          width={72}
          height={72}
          className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]"
          alt="icon"
        />
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
