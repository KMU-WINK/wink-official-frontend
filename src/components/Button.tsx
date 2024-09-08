import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ className, label, ...rest }) => {
  return (
    <button
      className={`text-white bg-[#9DB8FF] hover:bg-[#8aa7ff] rounded focus:outline-none focus:ring-2 focus:ring-[#9DB8FF] ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};
