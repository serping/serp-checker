"use client";

import { Markdown } from "@/components/shared/markdown";
import { cn } from "@/lib/utils";
export function ItemNormal({
  item, 
  className
}:{
  item:{
    title: string; 
    link: string; 
    snippet: string;
  };
  className?: string;
}){ 
  return( 
    <div className={cn(className,"mb-2")}>
      <h3 className="text-blue-700 text-xl font-medium mb-2"><a href={item.link} target="_blank" className="hover:underline underline-offset-4" rel="noopener noreferrer">{item.title}</a></h3>
      <Markdown content={item.snippet} className="text-sm text-secondary-foreground max-w-[550px]" />
    </div>
  )
}