import Recruit from '@/api/type/schema/recruit';
import RecruitForm, {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  Domain,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';
import {
  GITHUB_USERNAME_EXPRESSION,
  GITHUB_USERNAME_MESSAGE,
  KOOKMIN_EMAIL_EXPRESSION,
  KOOKMIN_EMAIL_MESSAGE,
  PHONE_NUMBER_EXPRESSION,
  PHONE_NUMBER_MESSAGE,
  STUDENT_ID_MESSAGE,
  YYYY_MM_DD_EXPRESSION,
  YYYY_MM_DD_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

export const ApplicationRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
  studentId: z.string().length(8, STUDENT_ID_MESSAGE),
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
  phoneNumber: z.string().regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
  jiwonDonggi: z
    .string()
    .min(30, '지원동기는 최소 30자 이상이어야 합니다.')
    .max(300, '지원동기는 최대 300자까지 작성 가능합니다.'),
  baeugoSipeunJeom: z
    .string()
    .min(30, '배우고 싶은 점은 최소 30자 이상이어야 합니다.')
    .max(300, '배우고 싶은 점은 최대 300자까지 작성 가능합니다.'),
  canInterviewDates: z
    .array(z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE))
    .min(1, '면접 가능한 날짜는 최소 1개 이상 선택해야 합니다.'),
  domains: z.array(z.nativeEnum(Domain)).min(1, '지원 분야는 최소 1개 이상 선택해야 합니다.'),
  github: z.string().regex(GITHUB_USERNAME_EXPRESSION, GITHUB_USERNAME_MESSAGE).optional(),
  frontendTechStacks: z.array(z.nativeEnum(FrontendTechStack)).optional(),
  backendTechStacks: z.array(z.nativeEnum(BackendTechStack)).optional(),
  devOpsTechStacks: z.array(z.nativeEnum(DevOpsTechStack)).optional(),
  designTechStacks: z.array(z.nativeEnum(DesignTechStack)).optional(),
  favoriteProject: z.string().optional(),
  lastComment: z.string().optional(),
});

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

export const StudentIdCheckRequestSchema = z.object({
  studentId: z.string().length(8, STUDENT_ID_MESSAGE),
});

export const DuplicationCheckResponseSchema = z.object({
  duplicated: z.boolean(),
});

export const GetApplicationResponseSchema = z.object({
  application: z.custom<RecruitForm>(),
});

export const GetApplicationsResponseSchema = z.object({
  applications: z.array(z.custom<RecruitForm>()),
});

export const GetRecruitResponseSchema = z.object({
  recruit: z.custom<Recruit>(),
});

export const GetRecruitsResponseSchema = z.object({
  recruits: z.array(z.custom<Recruit>()),
});

export type ApplicationRequest = z.infer<typeof ApplicationRequestSchema>;
export type CreateRecruitRequest = z.infer<typeof CreateRecruitRequestSchema>;
export type EmailCheckRequest = z.infer<typeof EmailCheckRequestSchema>;
export type FinalizePaperRequest = z.infer<typeof FinalizePaperRequestSchema>;
export type PhoneNumberCheckRequest = z.infer<typeof PhoneNumberCheckRequestSchema>;
export type StudentIdCheckRequest = z.infer<typeof StudentIdCheckRequestSchema>;
export type DuplicationCheckResponse = z.infer<typeof DuplicationCheckResponseSchema>;
export type GetApplicationResponse = z.infer<typeof GetApplicationResponseSchema>;
export type GetApplicationsResponse = z.infer<typeof GetApplicationsResponseSchema>;
export type GetRecruitResponse = z.infer<typeof GetRecruitResponseSchema>;
export type GetRecruitsResponse = z.infer<typeof GetRecruitsResponseSchema>;
