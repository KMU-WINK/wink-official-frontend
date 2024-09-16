'use client';

import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

import { AnimatePresence, motion } from 'framer-motion';

interface AdminDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const AdminDropdown = ({ value, options, onChange }: AdminDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm bg-white transition-colors duration-200 ease-in-out"
      >
        {value}
        <FaAngleDown className={`w-4 h-4 ml-2 transition-transform duration-200 ease-in-out`} />
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
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out"
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
