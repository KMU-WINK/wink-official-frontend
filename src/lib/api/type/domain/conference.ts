import Conference from '@/api/type/schema/conference';
import Page from '@/api/type/schema/page';
import { YYYY_MM_DD_HH_MM_EXPRESSION, YYYY_MM_DD_HH_MM_MESSAGE } from '@/api/validation';

import { z } from 'zod';

export const CreateConferenceRequestSchema = z.object({
  location: z.string().min(1, '장소를 입력해주세요'),
  date: z.string().regex(YYYY_MM_DD_HH_MM_EXPRESSION, YYYY_MM_DD_HH_MM_MESSAGE),
});

export const GetConferenceResponseSchema = z.object({
  conference: z.custom<Conference>(),
});

export const GetConferencesResponseSchema = z.object({
  conferences: z.array(z.custom<Conference>()),
});

export const GetConferencesPageableResponseSchema = z.object({
  conferences: z.custom<Page<Conference>>(),
});

export const GetCurrentParticipantResponseSchema = z.object({
  survey: z.boolean(),
  present: z.boolean(),
});

export type CreateConferenceRequest = z.infer<typeof CreateConferenceRequestSchema>;
export type GetConferenceResponse = z.infer<typeof GetConferenceResponseSchema>;
export type GetConferencesResponse = z.infer<typeof GetConferencesResponseSchema>;
export type GetConferencesPageableResponse = z.infer<typeof GetConferencesPageableResponseSchema>;
export type GetCurrentParticipantResponse = z.infer<typeof GetCurrentParticipantResponseSchema>;
