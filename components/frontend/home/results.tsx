
"use client" 
import { type HomeFormValues } from "@/shema/index";

export function Results({searchParams}:{searchParams:HomeFormValues}) { 
  return (
    <div className="px-8 pt-10">
      <h2 className="text-xl font-semibold">Results for “{searchParams.query}”</h2>
    </div>
  );
}
