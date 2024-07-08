"use client";

import { cn } from "@/lib/utils";
export function SiteIcon({
  link,
  size = 20,
  className
}:{
  link: string;
  size?: number; 
  className?: string;
}){
  const url = new URL(link);
  return <img src={`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=${size}`} className={cn("h-8 w-8 rounded-full", className)} />
}