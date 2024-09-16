import React from 'react';

interface AdminPostButtonProps {
  icon: React.ReactNode;
  text?: string;
  className?: string;
  onClick: () => void;
}

export const AdminIconButton: React.FC<AdminPostButtonProps> = ({
  icon,
  text,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 h-10 text-sm border border-zinc-700 rounded-xl shadow-sm ${className}`}
    >
      {icon}
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
};
