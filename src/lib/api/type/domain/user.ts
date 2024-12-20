import Page from '@/api/type/schema/page';
import PreUser from '@/api/type/schema/pre-user';
import User, { Role } from '@/api/type/schema/user';
import {
  GITHUB_USERNAME_EXPRESSION,
  GITHUB_USERNAME_MESSAGE,
  INSTAGRAM_EXPRESSION,
  INSTAGRAM_MESSAGE,
  KOOKMIN_EMAIL_EXPRESSION,
  KOOKMIN_EMAIL_MESSAGE,
  PASSWORD_EXPRESSION,
  PASSWORD_MESSAGE,
  PHONE_NUMBER_EXPRESSION,
  PHONE_NUMBER_MESSAGE,
  STUDENT_ID_MESSAGE,
  URL_EXPRESSION,
  URL_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

export const InviteRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
  studentId: z.string().length(8, STUDENT_ID_MESSAGE),
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
  phoneNumber: z.string().regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
});

export const RemovePreUserRequestSchema = z.object({
  id: z.string().min(1, 'ID는 비어있을 수 없습니다.'),
});

export const UpdateMyInfoRequestSchema = z.object({
  description: z.string().max(40, '소개는 40자를 초과할 수 없습니다.').optional(),
  github: z
    .string()
    .regex(GITHUB_USERNAME_EXPRESSION, GITHUB_USERNAME_MESSAGE)
    .optional()
    .or(z.literal('')),
  instagram: z.string().regex(INSTAGRAM_EXPRESSION, INSTAGRAM_MESSAGE).optional().or(z.literal('')),
  blog: z.string().regex(URL_EXPRESSION, URL_MESSAGE).optional().or(z.literal('')),
});

export const UpdateMyPasswordRequestSchema = z.object({
  password: z.string().min(1, '비밀번호는 비어있을 수 없습니다.'),
  newPassword: z.string().regex(PASSWORD_EXPRESSION, PASSWORD_MESSAGE),
});

export const UpdateRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
  studentId: z.string().length(8, STUDENT_ID_MESSAGE),
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
  phoneNumber: z.string().regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
  role: z.nativeEnum(Role),
  fee: z.boolean(),
});

export const AdminPreUserResponseSchema = z.object({
  user: z.custom<PreUser>(),
});

export const AdminPreUsersResponseSchema = z.object({
  users: z.custom<Page<PreUser>>(),
});

export const AdminUsersResponseSchema = z.object({
  users: z.custom<Page<User>>(),
});

export const UpdateMyAvatarResponseSchema = z.object({
  url: z.string(),
});

export const UserResponseSchema = z.object({
  user: z.custom<User>(),
});

export const UsersResponseSchema = z.object({
  users: z.array(z.custom<User>()),
});

export type InviteRequest = z.infer<typeof InviteRequestSchema>;
export type RemovePreUserRequest = z.infer<typeof RemovePreUserRequestSchema>;
export type UpdateMyInfoRequest = z.infer<typeof UpdateMyInfoRequestSchema>;
export type UpdateMyPasswordRequest = z.infer<typeof UpdateMyPasswordRequestSchema>;
export type UpdateRequest = z.infer<typeof UpdateRequestSchema>;
export type AdminPreUserResponse = z.infer<typeof AdminPreUserResponseSchema>;
export type AdminPreUsersResponse = z.infer<typeof AdminPreUsersResponseSchema>;
export type AdminUsersResponse = z.infer<typeof AdminUsersResponseSchema>;
export type UpdateMyAvatarResponse = z.infer<typeof UpdateMyAvatarResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;
