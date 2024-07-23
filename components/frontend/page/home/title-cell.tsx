
"use client"

import {
  FeaturedSnippets,
  InlineImages,
  InlineVideos,
  LocalResults,
  PeopleAlsoAsk,
  RelatedSearches,
  ThinksToKnow,
  TopStories,
  Video
} from "@/frontend/google/desktop";
import { ItemNormal } from "@/frontend/google/shared/ItemNormal";
import { ItemSource } from "@/frontend/google/shared/ItemSource";
import { SiteIcon } from "@/frontend/google/shared/SiteIcon";
import { CrownIcon, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SerpColumnType, type SerpNormal } from "serping/zod/google/desktop-serp";
import { Twitter } from "../../google/desktop/Twitter";

const Overview =({
  original,
  type
}:{
  original: any;
  type: SerpColumnType
})=>{
  const t = useTranslations();
  switch( type ){
    case "normal":
    case "site_links":
    case "video":
    case "book":
    case "twitter":
      original = original as SerpNormal;
      
      return ( 
        <div className="flex items-center gap-2">
          <SiteIcon link={original.source.link} /> 
          <a href={original.source.link} target="_blank">
            <h3 className="font-semibold text-l text-blue-600">{original.title ?? original.source.title}</h3>
            <div className="lg:max-w-[700px] line-clamp-1 text-muted-foreground">{original.source.link}</div> 
          </a>
          {original.thumbnail && <ImageIcon className="ml-2 text-muted-foreground" size={25} />}
        </div> 
      )
    case "featured_snippets":
        return (
          <div title={t('frontend.serp.featured_snippets')} className="flex items-center">
            <CrownIcon textDecoration={t('frontend.serp.featured_snippets')} className="mr-2 text-muted-foreground" />
            <ItemSource source={original.featured_snippets.source} className="mt-2" />
          </div>
        )
    case "inline_videos": 
        return <InlineVideos original={original} />
    case "inline_images": 
      return <InlineImages original={original} /> 
    case "top_stories": 
      return <TopStories original={original} /> 
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} />
    case "local_results": 
      return <LocalResults original={original} />
    case "related_searches": 
      return <RelatedSearches original={original.related_searches} />
    default:
      return (
        <div className="flex items-center gap-2 capitalize"> 
          {original.type.replace(/_/g, " ")}
        </div>
      )
  } 
}

const Preview =({
  original,
  type
}:{
  original: any;
  type: SerpColumnType
})=>{
  const t = useTranslations();
  switch( type ){
    case "normal":
    case "site_links":
    case "book":
      original = original as SerpNormal;
      return (
        <div className="flex items-center gap-2">
          <div>
            <ItemSource source={original.source} />
            <ItemNormal item={ {title: original.title, snippet: original.snippet, link: original.source.link } }/>
          </div>
          {original.thumbnail && <ImageIcon className="ml-2" size={20} />}
        </div>
      )
    case "video":
      return <Video original={original} />
    case "featured_snippets":
        return (
          <div title={t('frontend.serp.featured_snippets')} className="flex flex-col relative">
            <FeaturedSnippets original={original} className="text-sm text-secondary-foreground" />
            <ItemSource source={original.featured_snippets.source} className="mt-2" />
          </div>
        )
    case "inline_videos": 
      return <InlineVideos original={original} />
    case "things_to_know": 
      return <ThinksToKnow original={original} />
    case "inline_images": 
      return <InlineImages original={original} />
    case "top_stories": 
      return <TopStories original={original} /> 
    case "twitter": 
      return <Twitter original={original} />
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} />
    case "local_results": 
      return <LocalResults original={original} />
    case "related_searches": 
      return <RelatedSearches original={original.related_searches} />
    default: 
      return (
        <div className="flex items-center gap-2 capitalize"> 
          {original.type.replace(/_/g, " ")}
        </div>
      )
  }
}

export function TitleCell({
  row,
  preview = false
}:{
  row: any;
  preview?: boolean;
}) {
  let original = row.original;
  const type = original.type as SerpColumnType;

  if(preview){
    return <Preview type={type} original={original} />
  }else{
    return <Overview type={type} original={original} />;
  } 
  
}