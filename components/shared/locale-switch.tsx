"use client"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { appConfig, type LocaleType } from "@/config"
import { usePathname } from "@/lib/i18n"
import { LanguagesIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export function LocaleSwitch() {
  const router = useRouter();
  const currentLocale = useLocale() as LocaleType;
  const [locale, setLocale] = useState<LocaleType>(currentLocale);
  const { labels, locales } = appConfig.i18n;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language">
          <LanguagesIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            setLocale(value as LocaleType);
            router.replace(`/${value}/${pathname}?${searchParams.toString()}`);
          }}
        >
          {locales.map((locale) => {
            return (
              <DropdownMenuRadioItem key={locale} value={locale}>
                {locale in labels
                  ? labels[locale as keyof typeof labels]
                  : locale}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
