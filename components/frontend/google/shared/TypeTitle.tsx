"use client";

import { cn } from "@/lib/utils";
export function TypeTitle({title, className}:{title: string; className?: string;}){
  return <h3 className={cn("font-medium mb-2 text-xl text-current", className)}>{title}</h3>
}