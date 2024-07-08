"use client";

import { cn } from "@/lib/utils";
export function TypeTitle({title, className}:{title: string; className?: string;}){
  return <h3 className={cn("text-xl text-primary mb-2", className)}>{title}</h3>
}