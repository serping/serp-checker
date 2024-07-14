import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { appConfig, type LocaleType } from "./config";

export default async function middleware(req: NextRequest) {
  let defaultLocale: LocaleType;

  if (req.geo?.country) {
    switch (req.geo?.country?.toLowerCase()) {
      case "es":
      case "mx":
        defaultLocale = "es";
        break;
      case "jp":
        defaultLocale = "ja";
        break;
      case "fr":
        defaultLocale = "fr";
        break;
      case "ru":
        defaultLocale = "ru";
        break;
      case "it":
        defaultLocale = "it";
      case "de":
        defaultLocale = "de";
      case "ko":
        defaultLocale = "ko";
        break;
      case "cn":
      case "sg":
      case "hk":
      case "tw":
        defaultLocale = "zh";
        break;
      default:
        defaultLocale = "en";
    }
  } else {
    defaultLocale = appConfig.i18n.defaultLocale;
  }

  const intlMiddleware = createMiddleware({
    locales: appConfig.i18n.locales,
    defaultLocale,
    localePrefix: "as-needed",
    alternateLinks: true
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
