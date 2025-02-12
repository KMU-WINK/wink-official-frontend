import Image from 'next/image';

import RocketImage from '@/public/recruit/rocket.png';

import { motion } from 'framer-motion';

export default function Rocker() {
  return (
    <motion.div
      animate={{
        x: [0, 30],
        y: [0, -30],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className="absolute top-1/2 left-1/2"
    >
      <Image
        src={RocketImage}
        alt="rocket"
        width={80}
        height={100}
        quality={100}
        priority
        className="-translate-y-28 sm:-translate-y-52 w-[40px] sm:w-[80px] h-[50px] sm:h-[100px]"
      />
    </motion.div>
  );
}
