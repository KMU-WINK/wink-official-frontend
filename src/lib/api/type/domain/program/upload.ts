import { z } from 'zod';

export const UploadImageResponseSchema = z.object({
  url: z.string(),
});

export type UploadImageResponse = z.infer<typeof UploadImageResponseSchema>;
