
import { appConfig, type LocaleType } from "@/config";
import { getMessagesForLocale } from "@/i18n";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export async function generateMetadata(locale: LocaleType): Promise<Metadata> {
  const t = await getTranslations(locale);
  return {
    title: t('frontend.meta.default.title'),
    description: t('frontend.meta.default.description'),
  };
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const { locale } = params as { locale: LocaleType };

  if (!appConfig.i18n.locales.includes(locale)) {
    notFound();
  }
  const messages = getMessagesForLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
     <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextTopLoader color="var(--colors-primary)" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        {appConfig.gaId && <GoogleAnalytics gaId={appConfig.gaId} />}
      </body>
    </html>
  );
}
