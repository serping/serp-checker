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

export function Faqs({ faqs, title }:{ faqs: Faq[], title?: string;}){ 

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
    <>
    {title && <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-10">{title}</h2>}
    <Accordion type="single" collapsible className="w-full">{items}</Accordion>
    </>
  )
}