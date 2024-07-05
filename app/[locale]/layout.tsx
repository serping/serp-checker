
import { appConfig, type LocaleType } from "@/config";
import { getMessagesForLocale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SerpChecking: Free Serp Checker",
  description: "Free Serp Checker, Source by Serping",
};

export default async function RootLayout({
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
  const messages = await getMessagesForLocale(locale);

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
      </body>
    </html>
  );
}
