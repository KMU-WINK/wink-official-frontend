import React, { useState } from 'react';

// import { FaAngleDown } from 'react-icons/fa';
import DropDown from '@/public/assets/arrow-down.svg';

import { AnimatePresence, motion } from 'framer-motion';

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm bg-white"
      >
        {value}
        <DropDown className={`w-4 h-4 ml-2`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '10rem' }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
