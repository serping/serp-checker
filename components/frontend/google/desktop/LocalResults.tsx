"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import type { SerpLocalResults } from "serping/zod/google/desktop-serp";

export function LocalResults({original, className}:{original: SerpLocalResults, className?: string;}){
  return (
    <div className={cn(className)}> 
      <ul role="list" className="divide-y divide-gray-200 text-sm">
        {original.places.map(place =>  
          <li key={place.place_id} className="flex space-x-6 py-2">
           {place.thumbnail === "imageBase64" ? <ImageIcon size={24} /> :
           <>
              <div className="relative w-[100px]">
                <img src={place.thumbnail} className="w-full flex-none rounded-s bg-gray-100 object-cover object-center" />
              </div>
              <div className="flex-auto space-y-1 max-w-[200px] lg:max-w-[300px]">
                <h3 className="truncate font-medium">
                  {place.title}
                </h3>
                <p>{place.hours}</p>
                <address>{place.address}</address>
                <p>{place.description}</p>
              </div>
            </>
           }
          </li> 
        )}
      </ul>
    </div>
  )
}
