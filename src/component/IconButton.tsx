import React from 'react';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
  className?: string;
  onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  className,
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 h-10 text-sm border border-zinc-700 rounded-xl shadow-sm ${className}`}
      {...rest}
    >
      {icon}
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
};
