import BaseSchema from '@/api/type/schema/base-schema';

export default interface Recruit extends BaseSchema {
  year: number;
  semester: number;
  googleFormId: string;
  googleFormUri: string;
  googleFormResponseEntity: Record<FormEntryKeys, string>;
  recruitStartDate: string;
  recruitEndDate: string;
  interviewStartDate: string;
  interviewEndDate: string;
  step: Step;
}

export enum FormEntryKeys {
  NAME,
  STUDENT_ID,
  DEPARTMENT,
  EMAIL,
  PHONE_NUMBER,
  JIWON_DONGGI,
  SELF_INTRODUCE,
  OUTINGS,
  INTERVIEW_DATES,
  GITHUB,
  FRONTEND_TECH_STACKS,
  BACKEND_TECH_STACKS,
  DEV_OPS_TECH_STACKS,
  DESIGN_TECH_STACKS,
  FAVORITE_PROJECT,
}

export enum Step {
  PRE = 'PRE',
  PAPER_END = 'PAPER_END',
  INTERVIEW_END = 'INTERVIEW_END',
}
