"use client";

import { cn } from "@/lib/utils";
import type { SerpLocalDirections, SerpLocalNormal, SerpLocalResults, SerpLocalServices } from "serping/zod/google/desktop-serp";

const LocalNormal =({original, className}:{original: SerpLocalNormal, className?: string;})=>{
  return(
    <div className={cn(className)}> 
       {
        original.places.map(item => {
          return(
            <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{item.title}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {item.topic}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{item.address}</p>
              <address className="mt-1 truncate text-sm text-gray-500">{item.address}, {item.phone}</address>
            </div>
            {item.thumbnail && <img alt="thumbnail" src={item.thumbnail} className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />}
          </div>
          )
        })
       }
    </div>
  )
}

const LocalServices =({original, className}:{original: SerpLocalServices, className?: string;})=>{
  return(
    <div className={cn(className)}> 
       
    </div>
  )
}
const LocalDirections =({original, className}:{original: SerpLocalDirections, className?: string;})=>{
  return(
    <div className={cn(className)}> 
       
    </div>
  )
}

export function LocalResults({original, className}:{original: SerpLocalResults, className?: string;}){
  if(original.type === "services"){
    return <LocalServices original={original as SerpLocalServices} />
    
  }else if(original.type === "directions"){
    return  <LocalDirections original={original as SerpLocalDirections} />
  }else{
    return  <LocalNormal original={original as SerpLocalNormal} />
  }
  
}
