"use client";

import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SerpPeopleAlsoAsk } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

export function PeopleAlsoAsk({original, className}:{original: SerpPeopleAlsoAsk, className?: string;}){
  const t = useTranslations();

  return (
    <div className={cn(className)}>
      <TypeTitle title={t("frontend.serp.people_also_ask")} />
      <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-secondary-foreground">
        {original.people_also_ask.map((item, index) =>  
          <li key={`people_also_ask-${index}`} className="flex space-x-6 py-2">   
            <div className="flex-auto space-y-1 max-w-[200px] lg:max-w-[300px]">
              <h3 className="truncate flex items-center">
                {item.question} <a href={item.source.link} target="_blank" title={item.question}> <ExternalLinkIcon size={15} className="ml-2" /></a>
              </h3>  
            </div>
          </li> 
        )}
      </ul>
    </div>
  )
}