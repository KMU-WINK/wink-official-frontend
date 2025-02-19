'use client';

import Activity from '@/app/about-us/wink/_component/activity';
import Recruitment from '@/app/about-us/wink/_component/recruitment';
import TechStack from '@/app/about-us/wink/_component/tech-stack';
import Title from '@/app/about-us/wink/_component/title';
import Wave from '@/app/about-us/wink/_component/wave';
import WaveImage from '@/app/about-us/wink/_component/wave_image';
import WeAreWink from '@/app/about-us/wink/_component/we-are-wink';

import WaveImage1 from '@/public/about-us/wink/wave-1.webp';
import WaveImage2 from '@/public/about-us/wink/wave-2.webp';
import WeAreWinkImage from '@/public/about-us/wink/we-are-wink.webp';

import { motion } from 'framer-motion';

export default function WinkPage() {
  return (
    <div className="flex flex-col items-center pt-44 sm:pt-52 space-y-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title title="나만의 서비스. 기획. 개발." subTitle="내 안의 새로운 물결 WINK" />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <Recruitment />
      </motion.div>

      <Wave className="flex-col sm:flex-row gap-4 sm:gap-8">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <WaveImage
            text={'자꾸만 눈이 가는\n멋진 모습'}
            textStyle="text-2xl sm:text-4xl font-semibold whitespace-pre-line"
            direction="top"
            image={WaveImage1}
          />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <WaveImage
            text={
              '국민대학교 소프트웨어융합대학의\n유일무이 웹 학술 동아리.\n친목부터 활동까지 한 번에 챙겨요!'
            }
            textStyle="sm:text-lg"
            direction="bottom"
            image={WaveImage2}
          />
        </motion.div>
      </Wave>

      <div className="flex flex-col items-center w-full px-6 space-y-16 sm:space-y-24">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.5 }}
        >
          <WeAreWink image={WeAreWinkImage} />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.25 }}
        >
          <Activity />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.75 }}
          transition={{ duration: 0.5 }}
        >
          <TechStack />
        </motion.div>
      </div>
    </div>
  );
}
