import React, { useState } from 'react';

import * as yup from 'yup';
import { AnyObject } from 'yup';

export interface FormHookResponse<K extends string, V> {
  values: Record<K, V>;
  errors: Record<K, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<K, V>>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<K, string>>>;
  validate: () => Promise<boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useForm = <K extends string, V>(
  schema: yup.ObjectSchema<AnyObject>,
): FormHookResponse<K, V> => {
  const keys = Object.keys(schema.fields);

  const initialValues = keys.reduce(
    (acc, key) => {
      acc[key as K] = '' as V;
      return acc;
    },
    {} as Record<K, V>,
  );

  const initialErrors = keys.reduce(
    (acc, key) => {
      acc[key as K] = '';
      return acc;
    },
    {} as Record<K, string>,
  );

  const [values, setValues] = useState<Record<K, V>>(initialValues);
  const [errors, setErrors] = useState<Record<K, string>>(initialErrors);

  const validate = async (): Promise<boolean> => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          setErrors(prev => ({
            ...prev,
            [err.path as K]: err.message,
          }));
        });

        return false;
      }
    }

    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    schema
      .validateAt(id as K, { [id]: value })
      .then(() => setErrors(prev => ({ ...prev, [id as K]: '' })))
      .catch(error =>
        setErrors(prev => ({ ...prev, [id as K]: error.message })),
      );

    setValues(prev => ({ ...prev, [id as K]: value }));
  };

  return {
    values,
    errors,
    setValues,
    setErrors,
    validate,
    onChange,
  };
};
