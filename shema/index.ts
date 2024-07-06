import { appConfig } from '@/config';
import z from 'zod';
export const HomeFormSchema = z.object({
  query: z.string().min(2, {
    message: "query must be at least 2 characters.",
  }),
  lang: z.string(),
  country: z.string(),
  device: z.enum(appConfig.devices),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
})
export type HomeFormValues = z.infer<typeof HomeFormSchema>;
