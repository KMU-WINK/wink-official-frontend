'use client';

import React, { InputHTMLAttributes, ReactElement } from 'react';

import * as yup from 'yup';

export interface InputFieldProps<ID> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: ID;
  validation?: yup.Schema<unknown>;
  button?: ReactElement;
}

export const InputField: React.FC<InputFieldProps<string>> = (props) => {
  return (
    <input
      {...props}
      className="w-full px-3 py-4 border border-[#C4C4C4] rounded focus:outline-none focus:ring-1 focus:ring-[#9DB8FF] placeholder-gray-600"
    />
  );
};
