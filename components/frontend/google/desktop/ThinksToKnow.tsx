"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SerpThingsToKnowListingSchema, SerpThingsToKnowNormal, SerpThingsToKnowNormalSchema, type SerpThingsToKnow, type SerpThingsToKnowListing } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";


const Listing =({item}:{ item: SerpThingsToKnowListing })=>{

  return(
    <Heading heading={item.heading}></Heading>
  ) 
}

const Normal =({item}:{ item: SerpThingsToKnowNormal })=>{

  return(
    <Heading heading={item.heading}></Heading>
  ) 
}



const Heading = ({
  heading
} :{
  heading:{
    primary: string;
    secondary: string;
  } 
})=>{
  return(
    <div className="flex-auto space-y-1">
      <h3 className="truncate text-base font-medium">
        {heading.primary}
      </h3>
      <h4 className="truncate text-l">
        {heading.secondary}
      </h4>  
    </div>
  )
}

export function ThinksToKnow({original, className}:{original: SerpThingsToKnow, className?: string;}){
  const t = useTranslations();
  const [open,setOpen] = useState<boolean>(false);

  return (
    <div className={cn(className)}>
      <TypeTitle title={t("frontend.serp.things_to_know")} />
      <ul role="list" className="divide-y divide-gray-200 text-secondary-foreground max-w-[200px] lg:max-w-[500px]">
        {original.things_to_know.map((item, index) => { 
            const licn = cn("flex space-x-6 py-2", index > 3 ? `${open ? "" : "hidden"}` : "");
            const key = `things_to_know-${index}`;
          if( item.type === 'listing'){
            const data = SerpThingsToKnowListingSchema.parse(item); 
            return(
              <li key={key} className={licn}>   
                <Listing item={data}/>
              </li> 
            )
          }else{
            const data =  SerpThingsToKnowNormalSchema.parse(item)
            return(
              <li key={key} className={licn}>   
                <Normal item={data}/>
              </li> 
            )
          } 
        })}
        {original.things_to_know.length >= 4 && <li className="flex justify-center items-center cursor-pointer hover:bg-slate-100" onClick={()=>setOpen(!open)}>
          {open ? <ChevronUp className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground" />}
        </li>}
      </ul>

    </div>
  )
}