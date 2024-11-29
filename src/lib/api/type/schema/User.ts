import BaseSchema from '@/api/type/schema/base-schema';
import BaseUser from '@/api/type/schema/base-user';

export default interface User extends BaseUser, BaseSchema {
  password: string;
  avatar: string;
  description: string;
  social: Social;
  role: Role;
  fee: boolean;
}

export interface Social {
  github: string;
  instagram: string;
  blog: string;
}

export enum Role {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  TREASURY_HEAD = 'TREASURY_HEAD',
  TREASURY_ASSISTANT = 'TREASURY_ASSISTANT',
  PUBLIC_RELATIONS_HEAD = 'PUBLIC_RELATIONS_HEAD',
  PUBLIC_RELATIONS_ASSISTANT = 'PUBLIC_RELATIONS_ASSISTANT',
  PLANNING_HEAD = 'PLANNING_HEAD',
  PLANNING_ASSISTANT = 'PLANNING_ASSISTANT',
  TECH_HEAD = 'TECH_HEAD',
  TECH_ASSISTANT = 'TECH_ASSISTANT',
  MEMBER = 'MEMBER',
  GRADUATED = 'GRADUATED',
}

export const isAdmin = (role: Role | undefined): boolean => {
  return (
    role === Role.PRESIDENT ||
    role === Role.VICE_PRESIDENT ||
    role === Role.TREASURY_HEAD ||
    role === Role.TREASURY_ASSISTANT ||
    role === Role.PUBLIC_RELATIONS_HEAD ||
    role === Role.PUBLIC_RELATIONS_ASSISTANT ||
    role === Role.PLANNING_HEAD ||
    role === Role.PLANNING_ASSISTANT ||
    role === Role.TECH_HEAD ||
    role === Role.TECH_ASSISTANT
  );
};

export const getKoreanRole = (role: Role): string => {
  const _MAPPER: Record<Role, string> = {
    [Role.PRESIDENT]: '회장',
    [Role.VICE_PRESIDENT]: '부회장',
    [Role.PLANNING_HEAD]: '기획부 부장',
    [Role.PLANNING_ASSISTANT]: '기획부 차장',
    [Role.PUBLIC_RELATIONS_HEAD]: '홍보부 부장',
    [Role.PUBLIC_RELATIONS_ASSISTANT]: '홍보부 차장',
    [Role.TREASURY_HEAD]: '총무부 부장',
    [Role.TREASURY_ASSISTANT]: '총무부 차장',
    [Role.TECH_HEAD]: '학술부 부장',
    [Role.TECH_ASSISTANT]: '학술부 차장',
    [Role.MEMBER]: '부원',
    [Role.GRADUATED]: '졸업생',
  };

  return _MAPPER[role];
};
