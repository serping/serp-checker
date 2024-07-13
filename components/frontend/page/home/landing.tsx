 
"use client"

import { Markdown } from '@/components/shared/markdown';
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Faqs } from './faqs';

export function Landing({className, block2}:{  className?: string; block2?: string;}){
  const t = useTranslations();
  const faqs = [
    {
      question: t('frontend.home.faq.qa1.question'),
      answer: t('frontend.home.faq.qa1.answer')
    },
    {
      question: t('frontend.home.faq.qa2.question'),
      answer: t('frontend.home.faq.qa2.answer')
    },
    {
      question: t('frontend.home.faq.qa3.question'),
      answer: t('frontend.home.faq.qa3.answer')
    },
    {
      question: t('frontend.home.faq.qa4.question'),
      answer: t('frontend.home.faq.qa4.answer')
    },
    {
      question: t('frontend.home.faq.qa5.question'),
      answer: t('frontend.home.faq.qa5.answer')
    },
  ]
  return(
    <div className={cn('pt-20',className)}>
      {block2 && <Markdown content={block2} />}
      <Faqs faqs={faqs} title={t('frontend.home.faq.title')} />
    </div>
  )
}