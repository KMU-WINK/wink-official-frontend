import WinkRequest from '@/api/request';
import { VALID_DEPARTMENTS } from '@/api/type/domain/recruit';
import {
  KOOKMIN_EMAIL_EXPRESSION,
  KOOKMIN_EMAIL_MESSAGE,
  NAME_EXPRESSION,
  NAME_MESSAGE,
  PASSWORD_EXPRESSION,
  PASSWORD_MESSAGE,
  PHONE_NUMBER_EXPRESSION,
  PHONE_NUMBER_MESSAGE,
  STUDENT_ID_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

export const MigrateRequestSchema = z.object({
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
  password: z.string().regex(PASSWORD_EXPRESSION, PASSWORD_MESSAGE),
});

export type MigrateRequest = z.infer<typeof MigrateRequestSchema>;

export default class Migrate {
  constructor(private readonly request: WinkRequest) {}

  public async migrate(data: MigrateRequest): Promise<void> {
    await this.request.post('/migrate', data);
  }
}
