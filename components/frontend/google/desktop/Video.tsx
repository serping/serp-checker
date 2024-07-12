"use client";

import { ItemSource } from "@/frontend/google/shared/ItemSource";
import { cn } from "@/lib/utils";
import type { SerpVideo } from "serping/zod/google/desktop-serp";
export function Video({original, className}:{original: SerpVideo, className?: string;}){ 
  return (
    <div className={cn(className,"relative flex items-center space-x-3 pb-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400")}>
      <div className="flex-shrink-0 relative">
        <img src={original.thumbnail} className="h-25 rounded" />
        <span style={{fontSize: "11px", padding: "3px 5px"}} className="inline-block rounded-full leading-tight bg-black/70 bg-opacity-40 text-white absolute bottom-0 mb-1 ml-1">{original.duration}</span>
      </div>
      <div className="min-w-0 flex-1 max-w-[550px] line-clamp-2">
        <ItemSource source={original.source} />
        <div>{original.snippet}</div>
      </div>
    </div> 
  )
}