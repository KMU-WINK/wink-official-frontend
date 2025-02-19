import { ReactNode } from 'react';

import Image from 'next/image';

import cloud from '@/public/about-us/member/cloud.webp';

import { motion } from 'framer-motion';

interface CloudProps {
  children: ReactNode;
  className: string;
}

export default function Cloud({ children, className }: CloudProps) {
  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-10">
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-4"
      >
        <Image
          src={cloud}
          alt={cloud.src}
          width={216}
          height={108}
          quality={100}
          placeholder="blur"
          priority
          className="w-[143px] h-[72px] sm:w-[216px] sm:h-[108px]"
        />
      </motion.div>

      <div className={className}>{children}</div>

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.3, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-[114.4px] h-[14.4px] sm:w-[194.4px] sm:h-[21.6px] bg-black/40 rounded-full blur-md"
      />
    </div>
  );
}
