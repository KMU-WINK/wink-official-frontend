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
      <div className="relative w-full h-[150px] sm:h-[250px] overflow-hidden">
        <motion.div
          className="absolute -left-[100vw] top-[10vh] w-[300vw] h-[300vw] bg-wink-100/50 rounded-[47%] xl:w-[400vw] xl:h-[400vw] xl:-left-[150vw] xl:rounded-[48.5%] 2xl:w-[550vw] 2xl:h-[550vw] 2xl:-left-[225vw] 2xl:rounded-[49.5%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -left-[100vw] top-[10vh] w-[300vw] h-[300vw] bg-wink-100 rounded-[48%] xl:w-[400vw] xl:h-[400vw] xl:-left-[150vw] xl:rounded-[48%] 2xl:w-[550vw] 2xl:h-[550vw] 2xl:-left-[225vw] 2xl:rounded-[49%]"
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
