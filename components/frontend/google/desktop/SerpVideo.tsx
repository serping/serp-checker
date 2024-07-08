"use client";

import { ItemSource } from "@/frontend/google/shared/ItemSource";
import { cn } from "@/lib/utils";
import type { SerpVideo } from "serping/zod/google/desktop-serp";
export function SerpVideo({original, className}:{original: SerpVideo, className?: string;}){ 
  return (
    <div className={cn(className)}> 
      <ItemSource source={original.source} />
    </div>
  )
}