import deepmerge from "deepmerge";
import fs from "fs";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import path from "path";
import z from "zod";
import { LocaleType, appConfig } from "./config";

export const importLocale = async (
  locale: string,
): Promise<AbstractIntlMessages> => {
  return (
    (await import(`./locales/${locale}.json`)).default as AbstractIntlMessages
  );
};

export const getMessagesForLocale = async (
  locale: string,
): Promise<AbstractIntlMessages> => {
  const localeMessages = await importLocale(locale);
  if (locale === appConfig.i18n.defaultLocale) {
    return localeMessages;
  }
  const defaultLocaleMessages = await importLocale(
    appConfig.i18n.defaultLocale,
  );
  return deepmerge(defaultLocaleMessages, localeMessages);
};

export default getRequestConfig(async ({ locale }) => ({
  messages: await getMessagesForLocale(locale),
}));

// I18n Components Markdown
export const componentsMarkdownFile = "data/generated/components-markdown.json";
export const contentComponentsMarkdownDir = 'content/components';

export const I18nComponentMarkdownSchema = z.record(
  z.object({
    locales: z.array(z.enum(appConfig.i18n.locales))
  })
);
export type I18nComponentMarkdown = z.infer<typeof I18nComponentMarkdownSchema>;
let loadComponentsMarkdownData;
if (!loadComponentsMarkdownData) {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), componentsMarkdownFile)).toString();
    if (file) loadComponentsMarkdownData = I18nComponentMarkdownSchema.parse(JSON.parse(file));
    console.log("Components markdown data is valid.");
  } catch (validationError: any) {
    console.error("Validation error:", validationError.errors);
  }
}
export const componentsMarkdownData: I18nComponentMarkdown | null = loadComponentsMarkdownData ? loadComponentsMarkdownData : null;

export const getComponentMarkdown = ({
  locale,
  componentPathName
}: {
  locale: LocaleType;
  componentPathName: string;
}): string | undefined => {
  if (!componentsMarkdownData) return undefined;

  // load locales by componentPathName
  const { locales } = componentsMarkdownData[componentPathName] as { locales: LocaleType[] };
  const currentLocale = locales.includes(locale) ? locale : appConfig.i18n.defaultLocale;
  const filePath = path.join(process.cwd(), contentComponentsMarkdownDir, componentPathName, `${currentLocale}.md`);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading Markdown file: ${error}`);
    return undefined;
  }
};