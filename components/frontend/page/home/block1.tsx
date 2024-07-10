 
import { type LocaleType } from '@/config';
import { componentsMarkdownData } from '@/i18n';

export function Block1({
  currentLocale,
  className
}: { 
  currentLocale: LocaleType;
  className?: string;
}) {  
  if(!componentsMarkdownData) return null;
  const pathName = 'home/block1';
  const { locales } = componentsMarkdownData[pathName] as {locales: LocaleType[]};
 console.log("currentLocale", currentLocale)
  return (
  <div className={className}>
    {currentLocale}, {locales} stsetsf
  </div>
  );
}
