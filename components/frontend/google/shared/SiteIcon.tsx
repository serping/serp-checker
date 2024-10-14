"use client";

import { cn } from "@/lib/utils";
export function SiteIcon({
  link,
  className
}:{
  link: string;
  className?: string;
}){
  const url = new URL(link);
  return <img src={`https://www.faviconextractor.com/favicon/${url.hostname}`} className={cn("h-8 w-8 rounded-full", className)} />
}