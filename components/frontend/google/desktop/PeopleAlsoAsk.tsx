"use client";

import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { SerpPeopleAlsoAsk } from "serping/zod/google/desktop-serp";
import { FilterUrl } from "../../google/shared/FilterUrl";
import { TypeTitle } from "../shared/TypeTitle";
export function PeopleAlsoAsk({
  original, 
  className,
  filterUrl
}:{
  original: SerpPeopleAlsoAsk, 
  className?: string;
  filterUrl?: string;
}){
  const t = useTranslations();

  return (
    <div className={cn(className)}>
      <TypeTitle title={t("frontend.serp.people_also_ask")} />
      <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-muted-foreground">
        {original.people_also_ask.map((item, index) =>  
          <li key={`people_also_ask-${index}`} className="flex space-x-6 py-2">   
            <div className="flex-auto space-y-1">
              <h3 className="truncate flex items-center text-blue-700">
                {item.question} {item.source && <a href={item.source.link} target="_blank" title={item.question} rel="noreferrer"> <ExternalLinkIcon size={15} className="ml-2" /></a>}
              </h3>
              {item.source && <Link href={item.source.link}>
                <FilterUrl link={item.source.link.replace(/#.*/,'')} filter={filterUrl} />
              </Link>} 
            </div>
          </li> 
        )}
      </ul>
    </div>
  )
}