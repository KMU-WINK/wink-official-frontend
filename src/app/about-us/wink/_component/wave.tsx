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
      <div className="relative w-full h-[150px] sm:h-[250px] 2xl:[350px] bg-wink-100 overflow-hidden">
        <motion.div
          className="absolute -left-[50vw] sm:-left-[100vw] 2xl:-left-[175vw] bottom-[10vh] sm:bottom-[15vh] 2xl:bottom-[10vh] w-[200vw] h-[200vw] sm:w-[300vw] sm:h-[300vw] 2xl:w-[450vw] 2xl:h-[450vw] bg-white rounded-[47%] 2xl:rounded-[48%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -left-[50vw] sm:-left-[100vw] 2xl:-left-[175vw] bottom-[10vh] sm:bottom-[15vh] 2xl:bottom-[10vh] w-[200vw] h-[200vw] sm:w-[300vw] sm:h-[300vw] 2xl:w-[450vw] 2xl:h-[450vw] bg-white/50 rounded-[45%] 2xl:rounded-[47%]"
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
          'flex items-center justify-center w-full bg-wink-100 py-12 sm:py-24',
          className,
        )}
      >
        {children}
      </div>

      <div className="w-full h-24 bg-gradient-to-b from-wink-100 to-white" />
    </div>
  );
}
