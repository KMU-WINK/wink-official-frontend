'use client';

import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

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
        <FaAngleDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        className={`absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg overflow-y-auto transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
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
      </div>
    </div>
  );
};
