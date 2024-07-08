"use client";

import { ItemSource } from "@/frontend/google/shared/ItemSource";
import { cn } from "@/lib/utils";
import type { SerpVideo } from "serping/zod/google/desktop-serp";
export function Video({original, className}:{original: SerpVideo, className?: string;}){ 
  return (
    <div className={cn(className,"relative flex items-center space-x-3 pb-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400")}>
      <div className="flex-shrink-0">
         <img src={original.thumbnail} className="h-20 w-20 rounded-full" />
      </div>
      <div className="min-w-0 flex-1">
        <ItemSource source={original.source} />
      </div>
    </div> 
  )
}