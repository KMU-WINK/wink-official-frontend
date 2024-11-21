import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollDown() {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute bottom-10 left-1/2 cursor-pointer"
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight - 56,
          behavior: 'smooth',
        });
      }}
    >
      <ChevronDown color="white" size={48} className="-translate-x-1/2" />
    </motion.div>
  );
}
