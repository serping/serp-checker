import config from "serping/config";
import { serpingApiConfig } from "serping/types/config";
const regions = ["us-east-1"] as const;
const locales = ['en', 'es', 'ja', 'de', 'fr', "it", 'zh', "ko", "ru"] as const;
const defaultLocale = "en" as const;
const devices = ["desktop", "mobile"] as const;

export type RegionType = typeof regions[number];
export type LocaleType = typeof locales[number];
export type DeviceType = typeof devices[number];
export type SerpingApiType = Record<RegionType, serpingApiConfig>

export const appConfig = {
  appDomain: "serpchecking.com",
  appName: "SerpChecking",
  appDescriptioni: "SerpChecking",
  i18n: {
    locales,
    defaultLocale,
    labels: {
      "en": "English",
      "es": "Español",
      "de": "Deutsch",
      "fr": "Français",
      "it": "Italian",
      "ru": "Русский",
      "ja": "日本語",
      "zh": "简体中文",
      "ko": "한국어"
    } as Record<LocaleType, string>
  },
  regions,
  devices,
  serpingApi: {
    "us-east-1": {
      baseUrl: config.serpingApi["us-east-1"].baseUrl,
      apiKey: process.env.SERPING_US_EAST_1_API_KEY!
    }
  } as SerpingApiType
}