 
"use client"

import { Markdown } from '@/components/shared/markdown';
import { Faqs } from './faqs';

export function Landing({className, block2}:{  className?: string; block2?: string;}){
   
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
      {block2 && <Markdown content={block2} />}
      <Faqs faqs={faqs} />
    </div>
  )
}