"use client";

import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import type { SerpPeopleAlsoAsk } from "serping/zod/google/desktop-serp";
export function PeopleAlsoAsk({original, className}:{original: SerpPeopleAlsoAsk, className?: string;}){
  return (
    <div className={cn(className)}> 
      <ul role="list" className="divide-y divide-gray-200 text-sm font-medium">
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