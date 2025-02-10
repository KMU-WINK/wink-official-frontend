import BaseSchema from '@/api/type/schema/base-schema';
import User from '@/api/type/schema/user';

export default interface Application extends BaseSchema {
  name: string;
  img: string;
  secret: string;
  user: User;
  login: Login;
}

export interface Login {
  enable: boolean;
  urls: string[];
  scopes: Scope[];
}

export enum Scope {
  UUID = 'UUID',
  EMAIL = 'EMAIL',
  NAME = 'NAME',
  STUDENT_ID = 'STUDENT_ID',
  DEPARTMENT = 'DEPARTMENT',
  PHONE_NUMBER = 'PHONE_NUMBER',
  AVATAR = 'AVATAR',
  DESCRIPTION = 'DESCRIPTION',
  SOCIAL = 'SOCIAL',
  ROLE = 'ROLE',
  FEE = 'FEE',
}
