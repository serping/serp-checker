"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { SerpTopStories } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

export function TopStories({original, className}:{original: SerpTopStories, className?: string;}){
  const t = useTranslations();  
  return (
    <div className={cn("max-w-[700px]",className)}>
        <TypeTitle title={t("frontend.serp.top_stories.title")} />
        {original.top_stories.stories.map((item, index) =>
         <div key={`top_stories-${index}}`}>
          <h3 className="font-medium text-base text-current border-b pb-3">{item.heading}</h3>
          <ul role="list" className=" text-secondary-foreground max-w-[200px] lg:max-w-[500px]">
            {item.posts.map((post, pIndex) =>
              <li key={`top_stories-${index}-${pIndex}`} className={cn("flex space-x-6 py-2", index > 3 ? "hidden" : "")}>   
                <a className="flex-auto space-y-1" href={post.source.link}>
                  <h3 className="truncate text-base font-medium text-primary">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-1">
                    {post.source.link} 
                  </p>  
                </a>
              </li>
            )}
          </ul> 
          </div>
        )}  
    </div>
  )
}