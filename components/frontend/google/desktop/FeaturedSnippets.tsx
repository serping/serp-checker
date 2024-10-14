"use client";

import { Markdown } from "@/components/shared/markdown";
import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SerpFeaturedListSchema,
  SerpFeaturedNormalSchema,
  SerpFeaturedSnippetsSchema,
  type SerpFeaturedList,
  type SerpFeaturedNormal,
  type SerpFeaturedSnippets
} from "serping/zod/google/desktop-serp";

const List =({item, className}:{item: SerpFeaturedList, className?: string;})=>{
  return (
    <div className={cn("flex",className)}>
      <div>
        {item.snippet_title && <h3 className="font-medium mb-2"> {item.snippet_title}</h3>}
        <ul>
          {item.snippet_list?.map(obj => <li key={obj}>{obj}</li>)}
        </ul>
      </div>
      {item.images && <img src={item.images[0].thumbnail} className="ml-5" />}
    </div>
  )
}

const Normal =({item, className}:{item: SerpFeaturedNormal, className?: string;})=>{
  return (
    <div className={className}>
      <Markdown content={item.snippet} className="max-w-[650px] leading-7" />
      {item.images && <img src={item.images[0].thumbnail} />}
    </div>
  )
}

export function FeaturedSnippets({original, className}:{original: SerpFeaturedSnippets, className?: string;}){
  const t = useTranslations();

  const data = SerpFeaturedSnippetsSchema.parse(original); 
  const Content =()=>{
    if(original.featured_snippets.type === "featured_list"){
      const featuredList = SerpFeaturedListSchema.parse(data.featured_snippets);
      return <List item={featuredList} />
    }else{
      const featuredNormal= SerpFeaturedNormalSchema.parse(data.featured_snippets);
      return <Normal item={featuredNormal} />
    }
  }
  
  return (
    <div className={cn("flex", className)}>
      <CrownIcon textDecoration={t('frontend.serp.featured_snippets')} className="mr-2 absolute top-8 left-0 -m-8 text-muted-foreground" />
      <Content />  
    </div>
  )
}