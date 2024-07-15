import { appConfig } from '@/config';
import z from 'zod';
export const HomeFormSchema = z.object({
  query: z.string().min(2, {
    message: "query must be at least 2 characters.",
  }),
  locale: z.string(),
  country: z.string(),
  device: z.enum(appConfig.devices),
  location: z.string().optional(),
  snapshot: z.enum(["on", "off"])
})
export type HomeFormValues = z.infer<typeof HomeFormSchema>;

export const LocationSchema = z.object({
  "Criteria ID": z.string(),
  Name: z.string(),
  "Canonical Name": z.string(),
  "Parent ID": z.string(),
  "Country Code": z.string(),
  "Target Type": z.string(),
  Status: z.string()
})

export type Location = z.infer<typeof LocationSchema>;

export type ComboboxFramework = {
  disabled?: boolean;
  icon?: React.ReactNode;
  short_label?: string;
  code?: string;
  value: string;
  label: string;
}
