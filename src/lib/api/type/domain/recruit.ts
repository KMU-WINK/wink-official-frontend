import { departments } from '@/app/recruit/form/_constant/departments';

import Recruit from '@/api/type/schema/recruit';
import RecruitForm, {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';
import {
  GITHUB_USERNAME_EXPRESSION,
  GITHUB_USERNAME_MESSAGE,
  KOOKMIN_EMAIL_EXPRESSION,
  KOOKMIN_EMAIL_MESSAGE,
  NAME_EXPRESSION,
  NAME_MESSAGE,
  PHONE_NUMBER_EXPRESSION,
  PHONE_NUMBER_MESSAGE,
  STUDENT_ID_MESSAGE,
  YYYY_MM_DD_EXPRESSION,
  YYYY_MM_DD_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

const VALID_DEPARTMENTS = Object.keys(departments).flatMap((department) =>
  departments[department as keyof typeof departments].map((major) => `${department} ${major}`),
);

export const CreateRecruitRequestSchema = z.object({
  year: z
    .number()
    .min(2000, '연도는 2000년 이상이어야 합니다.')
    .max(2999, '연도는 2999년 이하여야 합니다.'),
  semester: z.number().min(1, '학기는 1 이상이어야 합니다.').max(2, '학기는 2 이하여야 합니다.'),
  recruitStartDate: z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE),
  recruitEndDate: z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE),
  interviewStartDate: z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE),
  interviewEndDate: z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE),
});

export const EmailCheckRequestSchema = z.object({
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
});

export const FinalizePaperRequestSchema = z.object({
  interviewUrl: z.string().min(1, '면접 안내 URL은 비어있을 수 없습니다.'),
});

export const PhoneNumberCheckRequestSchema = z.object({
  phoneNumber: z.string().regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
});

export const RecruitFormRequestSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.').regex(NAME_EXPRESSION, NAME_MESSAGE),
  studentId: z.string().min(1, '학번을 입력해주세요.').length(8, STUDENT_ID_MESSAGE),
  department: z
    .string()
    .min(1, '학과를 선택해주세요.')
    .refine((value) => VALID_DEPARTMENTS.includes(value), {
      message: '올바른 학과가 아닙니다.',
    }),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
  phoneNumber: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
  jiwonDonggi: z
    .string()
    .min(100, '지원동기는 100자 이상이어야 합니다.')
    .max(500, '지원동기는 500자 이하이어야 합니다.'),
  selfIntroduce: z
    .string()
    .min(100, '자기소개는 100자 이상이어야 합니다.')
    .max(500, '자기소개는 500자 이하이어야 합니다.'),
  outings: z.array(z.string()),
  interviewDates: z
    .array(z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE))
    .min(1, '면접 날짜를 선택해주세요.'),
  github: z
    .string()
    .regex(GITHUB_USERNAME_EXPRESSION, GITHUB_USERNAME_MESSAGE)
    .or(z.literal(''))
    .optional(),
  frontendTechStacks: z.array(z.enum(Object.keys(FrontendTechStack) as [string, ...string[]])),
  backendTechStacks: z.array(z.enum(Object.keys(BackendTechStack) as [string, ...string[]])),
  devOpsTechStacks: z.array(z.enum(Object.keys(DevOpsTechStack) as [string, ...string[]])),
  designTechStacks: z.array(z.enum(Object.keys(DesignTechStack) as [string, ...string[]])),
  favoriteProject: z
    .string()
    .max(500, '가장 기억에 남는 프로젝트는 500자 이하이어야 합니다.')
    .optional(),
});

export const StudentIdCheckRequestSchema = z.object({
  studentId: z.string().length(8, STUDENT_ID_MESSAGE),
});

export const DuplicationCheckResponseSchema = z.object({
  duplicated: z.boolean(),
});

export const GetFormsResponseSchema = z.object({
  forms: z.array(z.custom<RecruitForm>()),
});

export const GetRecruitResponseSchema = z.object({
  recruit: z.custom<Recruit>(),
});

export const GetRecruitsResponseSchema = z.object({
  recruits: z.array(z.custom<Recruit>()),
});

export type CreateRecruitRequest = z.infer<typeof CreateRecruitRequestSchema>;
export type EmailCheckRequest = z.infer<typeof EmailCheckRequestSchema>;
export type FinalizePaperRequest = z.infer<typeof FinalizePaperRequestSchema>;
export type RecruitFormRequest = z.infer<typeof RecruitFormRequestSchema>;
export type PhoneNumberCheckRequest = z.infer<typeof PhoneNumberCheckRequestSchema>;
export type StudentIdCheckRequest = z.infer<typeof StudentIdCheckRequestSchema>;
export type DuplicationCheckResponse = z.infer<typeof DuplicationCheckResponseSchema>;
export type GetFormsResponse = z.infer<typeof GetFormsResponseSchema>;
export type GetRecruitResponse = z.infer<typeof GetRecruitResponseSchema>;
export type GetRecruitsResponse = z.infer<typeof GetRecruitsResponseSchema>;
