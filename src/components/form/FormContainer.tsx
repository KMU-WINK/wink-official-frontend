import React from 'react';

import { FormContext } from '@/context';

interface FormContainerProps {
  children: React.ReactNode;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  values,
  errors,
  onChange,
  onEnter,
}) => {
  return (
    <FormContext.Provider value={{ values, errors, onChange, onEnter }}>
      {children}
    </FormContext.Provider>
  );
};

export type Fields<T extends string> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: T;
  button?: React.ReactNode;
};
