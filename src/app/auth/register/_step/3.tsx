import { RegisterStepProps } from '@/app/auth/register/page';

import { motion } from 'framer-motion';
import { UserRoundPen } from 'lucide-react';

export default function Step3({ go }: RegisterStepProps) {
  return (
    <>
      <UserRoundPen size={64} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.25,
            duration: 0.5,
          },
        }}
        onAnimationComplete={() => setTimeout(() => go((prev) => prev + 1), 3000)}
      >
        <p className="font-medium text-lg">이제 프로필을 꾸며봐요</p>
      </motion.div>
    </>
  );
}
