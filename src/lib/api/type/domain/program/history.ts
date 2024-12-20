import History from '@/api/type/schema/history';
import Page from '@/api/type/schema/page';
import {
  URL_EXPRESSION,
  URL_MESSAGE,
  YYYY_MM_DD_EXPRESSION,
  YYYY_MM_DD_MESSAGE,
} from '@/api/validation';

import { z } from 'zod';

export const CreateHistoryRequestSchema = z.object({
  title: z.string().min(1, 'title은(는) 비어있을 수 없습니다.'),
  image: z.string().regex(URL_EXPRESSION, URL_MESSAGE),
  date: z.string().regex(YYYY_MM_DD_EXPRESSION, YYYY_MM_DD_MESSAGE),
});

export const GetHistoriesPageableResponseSchema = z.object({
  histories: z.custom<Page<History>>(),
});

export const GetHistoriesResponseSchema = z.object({
  histories: z.array(z.custom<History>()),
});

export const GetHistoryResponseSchema = z.object({
  history: z.custom<History>(),
});

export type CreateHistoryRequest = z.infer<typeof CreateHistoryRequestSchema>;
export type GetHistoriesPageableResponse = z.infer<typeof GetHistoriesPageableResponseSchema>;
export type GetHistoriesResponse = z.infer<typeof GetHistoriesResponseSchema>;
export type GetHistoryResponse = z.infer<typeof GetHistoryResponseSchema>;
