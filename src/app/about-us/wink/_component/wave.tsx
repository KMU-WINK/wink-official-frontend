import { ReactNode } from 'react';

import { cn } from '@/lib/util';

import { motion } from 'framer-motion';

interface WaveProps {
  children: ReactNode;
  className?: string;
}

export default function Wave({ children, className }: WaveProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[150px] sm:h-[250px] overflow-hidden">
        <motion.div
          className="absolute -left-[100vw] top-[10vh] w-[300vw] h-[300vw] bg-wink-100/50 rounded-[47%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -left-[100vw] top-[10vh] w-[300vw] h-[300vw] bg-wink-100 rounded-[48%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 55,
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
