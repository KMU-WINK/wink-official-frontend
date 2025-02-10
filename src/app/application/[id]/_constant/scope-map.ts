import { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Scope } from '@/api/type/schema/application';

import {
  BadgeCheck,
  CaseSensitive,
  CircleDollarSign,
  GraduationCap,
  IdCard,
  Image,
  LucideProps,
  Mail,
  Phone,
  RadioTower,
  Shapes,
  User,
} from 'lucide-react';

export interface ScopeMapType {
  name: string;
  value: Scope;
  disable: boolean;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

export const SCOPE_MAP: ScopeMapType[] = [
  {
    name: 'UUID',
    value: Scope.UUID,
    disable: true,
    icon: IdCard,
  },
  {
    name: '이메일',
    value: Scope.EMAIL,
    disable: false,
    icon: Mail,
  },
  {
    name: '이름',
    value: Scope.NAME,
    disable: false,
    icon: User,
  },
  {
    name: '학번',
    value: Scope.STUDENT_ID,
    disable: false,
    icon: BadgeCheck,
  },
  {
    name: '학부(과)',
    value: Scope.DEPARTMENT,
    disable: false,
    icon: GraduationCap,
  },
  {
    name: '전화번호',
    value: Scope.PHONE_NUMBER,
    disable: false,
    icon: Phone,
  },
  {
    name: '프로필 사진',
    value: Scope.AVATAR,
    disable: false,
    icon: Image,
  },
  {
    name: '한 줄 소개',
    value: Scope.DESCRIPTION,
    disable: false,
    icon: CaseSensitive,
  },
  {
    name: '소셜 정보',
    value: Scope.SOCIAL,
    disable: false,
    icon: RadioTower,
  },
  {
    name: '역할',
    value: Scope.ROLE,
    disable: false,
    icon: Shapes,
  },
  {
    name: '회비 납부',
    value: Scope.FEE,
    disable: false,
    icon: CircleDollarSign,
  },
];
