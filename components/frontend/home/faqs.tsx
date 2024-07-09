"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


type Faq = {
  question: string;
  answer: string;
}
type ItemCF = ({faq,value}:{faq: Faq, value: string}) => React.ReactNode;

export function Faqs({faqs}:{faqs: Faq[]}){ 

  const Item: ItemCF = ({faq,value})=>{
    return (
    <AccordionItem value={value}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
    )
  }
  const items = faqs.map((item,index) => <Item key={index} value={`item-${index}`} faq={item} />)
  return (
    <Accordion type="single" collapsible className="w-full">{items}</Accordion>
  )
}