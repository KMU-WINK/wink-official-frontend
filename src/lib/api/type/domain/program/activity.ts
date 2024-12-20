import Activity from '@/api/type/schema/activity';
import Page from '@/api/type/schema/page';
import { URL_EXPRESSION, URL_MESSAGE } from '@/api/validation';

import { z } from 'zod';

export const CreateActivityRequestSchema = z.object({
  title: z.string().min(1, '제목은 비어있을 수 없습니다'),
  description: z.string().min(1, '설명은 비어있을 수 없습니다'),
  images: z.array(z.string().regex(URL_EXPRESSION, URL_MESSAGE)),
});

export const GetActivitiesPageableResponseSchema = z.object({
  activities: z.custom<Page<Activity>>(),
});

export const GetActivitiesResponseSchema = z.object({
  activities: z.array(z.custom<Activity>()),
});

export const GetActivityResponseSchema = z.object({
  activity: z.custom<Activity>(),
});

export type CreateActivityRequest = z.infer<typeof CreateActivityRequestSchema>;
export type GetActivitiesPageableResponse = z.infer<typeof GetActivitiesPageableResponseSchema>;
export type GetActivitiesResponse = z.infer<typeof GetActivitiesResponseSchema>;
export type GetActivityResponse = z.infer<typeof GetActivityResponseSchema>;
