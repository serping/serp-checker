"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SerpInlineImages } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

export function InlineImages({original, className}:{original: SerpInlineImages, className?: string;}){
  const collection = original.collection;
  const t = useTranslations();
  return (
    <div className={cn(className)}>
      <TypeTitle title={t('frontend.serp.images')} className="capitalize" />
      <ul role="list" className="flex text-sm gap-3">
        {collection.map(image =>  
          <li key={`inline-images-${image.title}`} className="flex space-x-6 py-2">
           {image.thumbnail === "imageBase64" ? <ImageIcon size={24} /> : 
            <div className="relative w-[100px]">
              <img src={image.thumbnail} className="w-full flex-none rounded-s bg-gray-100 object-cover object-center" title={image.title} />
            </div>  
           }
          </li> 
        )}
      </ul>
    </div>
  )
}