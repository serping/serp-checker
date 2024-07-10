 
"use client"

import { Markdown } from '@/components/shared/markdown';
import { Faqs } from './faqs';

export function Landing({className, block1}:{  className?: string; block1?: string;}){
   
  const faqs = [
    {
      question: "Question",
      answer: "Answer string"
    },
    {
      question: "Question",
      answer: "answer string"
    },
  ]
  return(
    <div className={className}>
      {block1 && <Markdown content={block1} />}
      <Faqs faqs={faqs} />
    </div>
  )
}