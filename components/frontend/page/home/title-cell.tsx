
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
import { FilterUrl } from "../../google/shared/FilterUrl";

const Overview =({
  original,
  filterUrl,
  type
}:{
  original: any;
  type: SerpColumnType;
  filterUrl: string;
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
          <a href={original.source.link} target="_blank" rel="noreferrer">
            <h3 className="font-semibold text-l text-blue-600">{original.title ?? original.source.title}</h3>
            <div className="lg:max-w-[700px] line-clamp-1 text-muted-foreground">
              <FilterUrl link={original.source.link} filter={filterUrl} />
            </div> 
          </a>
          {original.thumbnail && <ImageIcon className="ml-2 text-muted-foreground" size={25} />}
        </div> 
      )
    case "featured_snippets": 
        return ( 
          <div className="flex items-center gap-2">
            <CrownIcon textDecoration={t('frontend.serp.featured_snippets')} className="mr-2 text-muted-foreground" />
            <div className="flex">
              <SiteIcon link={original.featured_snippets.source.link} /> 
              <a href={original.featured_snippets.source.link} target="_blank" rel="noreferrer">
                <h3 className="font-semibold text-l text-blue-600">{original.featured_snippets.title ?? original.featured_snippets.source.title}</h3>
                <div className="lg:max-w-[700px] line-clamp-1 text-muted-foreground">
                  <FilterUrl link={original.featured_snippets.source.link} filter={filterUrl} />
                </div> 
              </a>
            </div> 
            {original.featured_snippets.images && <ImageIcon className="ml-2 text-muted-foreground" size={25} />}
        </div> 
        )
    case "inline_videos": 
        return <InlineVideos original={original} className="ml-6" />
    case "inline_images": 
      return <InlineImages original={original} className="ml-6" /> 
    case "things_to_know": 
        return <ThinksToKnow original={original} className="ml-6" filterUrl={filterUrl}  />
    case "top_stories": 
      return <TopStories original={original} className="ml-6" /> 
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} className="ml-6" filterUrl={filterUrl} />
    case "local_results": 
      return <LocalResults original={original} className="ml-6" />
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
  type,
  filterUrl
}:{
  original: any;
  type: SerpColumnType;
  filterUrl: string;
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
      return <InlineVideos original={original} className="ml-6" />
    case "things_to_know": 
      return <ThinksToKnow original={original} className="ml-6" filterUrl={filterUrl}  />
    case "inline_images": 
      return <InlineImages original={original} className="ml-6" />
    case "top_stories": 
      return <TopStories original={original} className="ml-6" /> 
    case "twitter": 
      return <Twitter original={original} />
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} className="ml-6" filterUrl={filterUrl} />
    case "local_results": 
      return <LocalResults original={original} className="ml-6" />
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
  preview = false,
  filterUrl
}:{
  row: any;
  preview?: boolean;
  filterUrl: string;
}) {
  const original = row.original;
  const type = original.type as SerpColumnType;

  if(preview){
    return <Preview filterUrl={filterUrl} type={type} original={original} />
  }else{
    return <Overview filterUrl={filterUrl} type={type} original={original} />;
  } 
  
}