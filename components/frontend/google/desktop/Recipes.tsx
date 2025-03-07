"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SerpRecipes } from "serping/zod/google/desktop-serp";
import { FilterUrl } from "../shared/FilterUrl";
import { TypeTitle } from "../shared/TypeTitle";

export function Recipes({original, className, filterUrl}:{original: SerpRecipes, className?: string; filterUrl?: string;}){
  const recipes = original.recipes;
  const t = useTranslations();
  return (
    <div className={cn(className)}>
      <TypeTitle title={t('frontend.serp.recipes')} className="capitalize" />
      <ul role="list" className="divide-y divide-gray-200 text-sm">
        {recipes.map(item =>  
          <li key={`recipes-${item.title}`} className=" py-2">
           {item.thumbnail === "imageBase64" ? <ImageIcon size={24} /> :
           <>
              <div className="flex gap-2">
                <div className="relative w-[150px]">
                  <img src={item.thumbnail} className="w-full flex-none rounded-s bg-gray-100 object-cover object-center" />
                </div>
                <div className="flex-auto space-y-1 max-w-6xl">
                  <h3 className="truncate font-medium">
                    <a href={item.link} target="_blank" title={item.title} rel="noopener noreferrer">{item.title}</a>
                  </h3>
                  <p className="font-medium">{item.total_time}</p>
                  <p>{item.ingredients.join(", ")}</p>
                </div>
              </div> 
              <div className="text-muted-foreground">
                <a href={item.link} target="_blank" title={item.title} rel="noopener noreferrer"><FilterUrl link={item.link.replace(/#.*/,'')} filter={filterUrl} /></a>
              </div>
            </>
           }
          </li> 
        )}
      </ul>
    </div>
  )
}