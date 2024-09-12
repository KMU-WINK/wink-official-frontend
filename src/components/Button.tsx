import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ className, label, ...rest }) => {
  return (
    <button
      className={`text-white bg-wink-200 hover:bg-wink-500 rounded focus:outline-none focus:ring-2 focus:ring-wink-500 ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};
