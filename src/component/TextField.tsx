'use client';

import React, { InputHTMLAttributes, useContext } from 'react';

import { FormContext } from '@/context';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const TextField: React.FC<TextFieldProps> = ({ id, ...rest }) => {
  const { values, errors, onChange, onEnter } = useContext(FormContext);

  return (
    <div className="flex flex-col gap-1 w-full" key={id}>
      <input
        className="px-3 py-4 border border-border rounded focus:outline-none focus:ring-1 focus:ring-wink-300 placeholder-gray-600"
        id={id}
        value={values[id]}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === 'Enter' && onEnter) {
            onEnter();
          }
        }}
        {...rest}
      />
      {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
    </div>
  );
};
