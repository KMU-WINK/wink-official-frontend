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

export function toDate(date: Date | string) {
  if (date instanceof Date) return date;
  return new Date(date);
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

export function formatTimeApi(date: Date | string) {
  const d = toDate(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${formatDateApi(d)} ${hours}:${minutes}`;
}

export function formatDateTime(date: Date | string, showDayOfWeek = false) {
  const d = toDate(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${formatDate(d, showDayOfWeek)} ${hours}시 ${minutes}분`;
}

// ############################################################################################
