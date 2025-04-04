import { departments } from '@/app/recruit/form/_constant/departments';

import Recruit from '@/api/type/schema/recruit';
import RecruitForm, {
  BackendTechStack,
  DesignTechStack,
  DevOpsTechStack,
  FrontendTechStack,
} from '@/api/type/schema/recruit-form';
import RecruitSms from '@/api/type/schema/recruit-sms';
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

export const VALID_DEPARTMENTS = Object.keys(departments).flatMap((department) =>
  departments[department as unknown as keyof typeof departments].map(
    (major) => `${department} ${major}`,
  ),
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

export const RecruitFormRequestSchema = z
  .object({
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
      .min(300, '지원동기는 300자 이상이어야 합니다.')
      .max(500, '지원동기는 500자 이하이어야 합니다.'),
    selfIntroduce: z
      .string()
      .min(300, '자기소개는 300자 이상이어야 합니다.')
      .max(500, '자기소개는 500자 이하이어야 합니다.'),
    outings: z.array(z.string()),
    interviewDates: z
      .array(z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE))
      .min(1, '면접 날짜를 선택해주세요.'),
    whyCannotInterview: z.string().optional(),
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
      .min(100, '100자 이상이어야 합니다.')
      .max(1000, '1000자 이하이어야 합니다.'),
  })
  .superRefine((data, ctx) => {
    if (data.interviewDates.includes('0001-01-01') && !data.whyCannotInterview) {
      ctx.addIssue({
        code: 'custom',
        path: ['whyCannotInterview'],
        message: '사유를 작성해주세요.',
      });
    }
  });

export const EmailCheckRequestSchema = z.object({
  email: z.string().regex(KOOKMIN_EMAIL_EXPRESSION, KOOKMIN_EMAIL_MESSAGE),
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

export const UpdateRecruitSmsRequestSchema = z.object({
  paperFail: z.string().min(1, '서류 탈락 안내 문자를 작성해주세요.'),
  paperPass: z.string().min(1, '서류 합격 안내 문자를 작성해주세요.'),
  finalFail: z.string().min(1, '최종 탈락 안내 문자를 작성해주세요.'),
  finalPass: z.string().min(1, '최종 합격 안내 문자를 작성해주세요.'),
});

export const SendTestSmsRequestSchema = z.object({
  phoneNumber: z.string().regex(PHONE_NUMBER_EXPRESSION, PHONE_NUMBER_MESSAGE),
  field: z.enum(['PAPER_FAIL', 'PAPER_PASS', 'FINAL_FAIL', 'FINAL_PASS']),
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

export const GetRecruitSmsResponseSchema = z.object({
  recruitSms: z.custom<RecruitSms>(),
});

export type CreateRecruitRequest = z.infer<typeof CreateRecruitRequestSchema>;
export type RecruitFormRequest = z.infer<typeof RecruitFormRequestSchema>;
export type EmailCheckRequest = z.infer<typeof EmailCheckRequestSchema>;
export type PhoneNumberCheckRequest = z.infer<typeof PhoneNumberCheckRequestSchema>;
export type StudentIdCheckRequest = z.infer<typeof StudentIdCheckRequestSchema>;
export type UpdateRecruitSmsRequest = z.infer<typeof UpdateRecruitSmsRequestSchema>;
export type SendTestSmsRequest = z.infer<typeof SendTestSmsRequestSchema>;
export type DuplicationCheckResponse = z.infer<typeof DuplicationCheckResponseSchema>;
export type GetFormsResponse = z.infer<typeof GetFormsResponseSchema>;
export type GetRecruitResponse = z.infer<typeof GetRecruitResponseSchema>;
export type GetRecruitsResponse = z.infer<typeof GetRecruitsResponseSchema>;
export type GetRecruitSmsResponse = z.infer<typeof GetRecruitSmsResponseSchema>;
