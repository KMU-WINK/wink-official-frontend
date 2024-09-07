'use client';

import React, { InputHTMLAttributes, ReactElement } from 'react';

import * as yup from 'yup';

export interface InputFieldProps<ID> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: ID;
  validation?: yup.Schema<unknown>;
  button?: ReactElement;
}

export const InputField: React.FC<InputFieldProps<string>> = (props) => {
  const [error, setError] = React.useState<string | null>(null);

  const proxyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.validation
      ?.validate(e.target.value)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });

    props.onChange?.(e);
  };

  return (
    <div className="flex flex-col w-full">
      <input
        {...props}
        className="w-full px-3 py-4 border border-[#C4C4C4] rounded focus:outline-none focus:ring-1 focus:ring-[#9DB8FF] placeholder-gray-600"
        onChange={proxyOnChange}
        required
      />
      {error && <p className="text-[12px] text-red-500 mt-1.5">{error}</p>}
    </div>
  );
};
