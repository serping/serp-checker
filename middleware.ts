import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { appConfig } from "./config";

const intlMiddleware = createMiddleware({
  locales: appConfig.i18n.locales,
  defaultLocale: appConfig.i18n.defaultLocale,
  localePrefix: "never",
});

export default async function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
