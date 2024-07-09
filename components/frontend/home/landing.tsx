 

import { Faqs } from './faqs';
export function Landing({className}:{  className?: string;}){
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
      <div>
        Content ...
      </div>
      <Faqs faqs={faqs} />
    </div>
  )
}