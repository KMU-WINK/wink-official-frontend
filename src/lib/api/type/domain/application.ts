import Application, { Scope } from '@/api/type/schema/application';
import { URL_EXPRESSION, URL_MESSAGE } from '@/api/validation';

import { z } from 'zod';

export const CreateApplicationRequestSchema = z.object({
  name: z.string().min(1, '애플리케이션 이름은 비어있을 수 없습니다.'),
});

export const UpdateApplicationLoginRequestSchema = z.object({
  enable: z.boolean(),
  urls: z.array(z.string().regex(URL_EXPRESSION, URL_MESSAGE)),
  scopes: z.array(z.nativeEnum(Scope)),
});

export const UpdateApplicationRequestSchema = z.object({
  name: z.string().min(1, '애플리케이션 이름은 비어있을 수 없습니다.'),
  img: z.string().regex(URL_EXPRESSION, URL_MESSAGE),
});

export const GetApplicationsResponseSchema = z.object({
  applications: z.array(z.custom<Application>()),
});

export const GetApplicationResponseSchema = z.object({
  application: z.custom<Application>(),
});

export const OauthLoginResponseSchema = z.object({
  token: z.string(),
});

export type CreateApplicationRequest = z.infer<typeof CreateApplicationRequestSchema>;
export type UpdateApplicationLoginRequest = z.infer<typeof UpdateApplicationLoginRequestSchema>;
export type UpdateApplicationRequest = z.infer<typeof UpdateApplicationRequestSchema>;
export type GetApplicationsResponse = z.infer<typeof GetApplicationsResponseSchema>;
export type GetApplicationResponse = z.infer<typeof GetApplicationResponseSchema>;
export type OauthLoginResponse = z.infer<typeof OauthLoginResponseSchema>;
