import { ReactNode } from 'react';

import { cn } from '@/util';

import { motion } from 'framer-motion';

interface WaveProps {
  children: ReactNode;
  className?: string;
}

export default function Wave({ children, className }: WaveProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[150px] sm:h-[250px] bg-wink-100 overflow-hidden">
        <motion.div
          className="absolute -left-[100vw] bottom-[15vh] w-[300vw] h-[300vw] bg-white rounded-[47%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -left-[100vw] bottom-[15vh] w-[300vw] h-[300vw] bg-white/50 rounded-[45%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
        />
      </div>

      <div
        className={cn(
          'flex items-center justify-center w-full bg-wink-100 pb-12 sm:pb-18',
          className,
        )}
      >
        {children}
      </div>

      <div className="w-full h-24 bg-gradient-to-b from-wink-100 to-white" />
    </div>
  );
}
