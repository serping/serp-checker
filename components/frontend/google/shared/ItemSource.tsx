"use client";

import { cn } from "@/lib/utils";
import { SerpItemSource } from 'serping/zod/google/base';
import { SiteIcon } from './SiteIcon';
export function ItemSource({
  source,
  size = 50,
  className
}:{
  source: SerpItemSource;
  size?: number; 
  className?: string;
}){
  return( 
    <div className={cn(className,"relative flex items-center space-x-3 pb-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400")}>
      <div className="flex-shrink-0">
        <SiteIcon link={source.link} size={size} />
      </div>
      <div className="min-w-0 flex-1">
        <a href={source.link} target="_blank" className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium text-primary">{source.name}</p>
          <p className="truncate text-sm text-muted-foreground">{source.display_link}</p>
        </a>
      </div>
    </div>
  )
}