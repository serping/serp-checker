"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SerpRelatedNormalSchema, type SerpRelatedSearches } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

export function RelatedSearches({original, className}:{original: SerpRelatedSearches[], className?: string;}){
  const t = useTranslations();
  // TODO: other types
  const Item =({item}:{item: SerpRelatedSearches})=>{
    switch(item.type){
      case "normal":{
        const data = SerpRelatedNormalSchema.parse(item);
        return (
          <ul role="list" className=" text-secondary-foreground max-w-[200px] lg:max-w-[500px]">
            {data.searches.map((value, index) =>  
              <li key={`normal-searches-${index}`} className="flex space-x-6 py-2">   
               {value}
              </li> 
            )}
          </ul>
        ) 
      }
      case "videos":
        return <></>
      case "people_also_search_for":
        return <></>
      case "near":
        return <></>
      default:
        return <></>;
    }
  }
  

  return (
    <div className={cn(className)}>
      <TypeTitle title={t("frontend.serp.related_searches")} />
      {original.map(item => <Item key={item.type} item={item}/>  )} 
    </div>
  )
}