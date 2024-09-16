import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <FaTimes
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};
