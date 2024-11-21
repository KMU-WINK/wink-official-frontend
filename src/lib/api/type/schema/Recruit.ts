import BaseSchema from '@/api/type/schema/base-schema';

export default interface Recruit extends BaseSchema {
  year: number;
  semester: number;
  googleFormId: string;
  googleFormUri: string;
  googleFormResponseEntity: Record<FormEntryKeys, string>;
  recruitStartDateTime: string;
  recruitEndDateTime: string;
  interviewStartDate: string;
  interviewEndDate: string;
}

export enum FormEntryKeys {
  NAME = 'NAME',
  STUDENT_ID = 'STUDENT_ID',
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  JIWON_DONGGI = 'JIWON_DONGGI',
  BAEUGO_SIPEUN_JEOM = 'BAEUGO_SIPEUN_JEOM',
  CAN_INTERVIEW_DATES = 'CAN_INTERVIEW_DATES',
  DOMAIN = 'DOMAIN',
  GITHUB = 'GITHUB',
  FRONTEND_TECH_STACKS = 'FRONTEND_TECH_STACKS',
  BACKEND_TECH_STACKS = 'BACKEND_TECH_STACKS',
  DEV_OPS_TECH_STACKS = 'DEV_OPS_TECH_STACKS',
  DESIGN_TECH_STACKS = 'DESIGN_TECH_STACKS',
  FAVORITE_PROJECT = 'FAVORITE_PROJECT',
  LAST_COMMENT = 'LAST_COMMENT',
}
