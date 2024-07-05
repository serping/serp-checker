import deepmerge from "deepmerge";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { appConfig } from "./config";

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
