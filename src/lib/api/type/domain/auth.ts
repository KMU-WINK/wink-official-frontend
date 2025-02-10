import PreUser from '@/api/type/schema/pre-user';
import {
  KOOKMIN_EMAIL_EXPRESSION,
  KOOKMIN_EMAIL_MESSAGE,
  PASSWORD_EXPRESSION,
  PASSWORD_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

export const CheckRegisterRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export const CheckResetPasswordRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export const LoginRequestSchema = z.object({
  email: z.string().min(1, '이메일은 비어있을 수 없습니다.'),
  password: z.string().min(1, '비밀번호는 비어있을 수 없습니다.'),
});

export const RefreshRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export const RegisterRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
  password: z.string().regex(PASSWORD_EXPRESSION, PASSWORD_MESSAGE),
});

export const RequestResetPasswordRequestSchema = z.object({
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
});

export const ResetPasswordRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
  newPassword: z.string().regex(PASSWORD_EXPRESSION, PASSWORD_MESSAGE),
});

export const CheckRegisterResponseSchema = z.object({
  isValid: z.boolean(),
  user: z.custom<PreUser>(),
});

export const CheckResetPasswordResponseSchema = z.object({
  isValid: z.boolean(),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type CheckRegisterRequest = z.infer<typeof CheckRegisterRequestSchema>;
export type CheckResetPasswordRequest = z.infer<typeof CheckResetPasswordRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RequestResetPasswordRequest = z.infer<typeof RequestResetPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type CheckRegisterResponse = z.infer<typeof CheckRegisterResponseSchema>;
export type CheckResetPasswordResponse = z.infer<typeof CheckResetPasswordResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
