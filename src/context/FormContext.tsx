import React, { createContext } from 'react';

interface FormContextType {
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export const FormContext = createContext<FormContextType>({
  values: {},
  errors: {},
  onChange: () => {},
});
