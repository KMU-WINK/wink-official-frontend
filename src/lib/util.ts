import { ComponentType, Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ############################################################################################

export type Step<T> = ComponentType<T>[];

export interface StepProps<T extends FieldValues> {
  go: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<T>;
}

// ############################################################################################

export function now() {
  return new Date();
}

export function toDate(date: Date | string): Date {
  if (date instanceof Date) return date;
  return new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
}

export function formatDateApi(date: Date | string) {
  const d = toDate(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate(date: Date | string, showDayOfWeek = false) {
  const d = toDate(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];

  return `${year}년 ${month}월 ${day}일${showDayOfWeek ? ` (${dayOfWeek})` : ''}`;
}

// ############################################################################################
