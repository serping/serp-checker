
"use client"

import {
  InlineImages,
  InlineVideos,
  LocalResults,
  PeopleAlsoAsk,
  ThinksToKnow,
  Video
} from "@/frontend/google/desktop";
import { ItemNormal } from "@/frontend/google/shared/ItemNormal";
import { ItemSource } from "@/frontend/google/shared/ItemSource";
import { TypeTitle } from "@/frontend/google/shared/TypeTitle";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SerpColumnType, type SerpNormal } from "serping/zod/google/desktop-serp";
import { FeaturedSnippets } from "../google/desktop/FeaturedSnippets";
import { SiteIcon } from "../google/shared/SiteIcon";

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
      original = original as SerpNormal;
      
      return ( 
        <div className="flex items-center gap-2">
          <SiteIcon link={original.source.link} /> 
          <a href={original.source.link} target="_blank">
            <h3 className="font-semibold text-l text-blue-700 ">{original.title}</h3>
            <div className="lg:max-w-[700px] line-clamp-1">{original.source.link}</div> 
          </a>
          {original.thumbnail && <ImageIcon className="ml-2 text-muted-foreground" size={25} />}
        </div> 
      )
    case "featured_snippets":
        return (
          <>
            <TypeTitle title={t('frontend.serp.featured_snippets')} />
            <ItemSource source={original.featured_snippets.source} className="mt-2" />
          </>
        )
    case "inline_videos": 
      return <InlineVideos original={original} />
    case "inline_images": 
      return <InlineImages original={original} />
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} />
    case "local_results": 
      return <LocalResults original={original.local_results} />
    default:
      console.log('No conditions met');
      return (
        <div className="flex items-center gap-2"> 
          -
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
          <>
            <FeaturedSnippets original={original} className="text-sm text-secondary-foreground" />
            <ItemSource source={original.featured_snippets.source} className="mt-2" />
          </>
        )
    case "inline_videos": 
      return <InlineVideos original={original} />
    case "things_to_know": 
      return <ThinksToKnow original={original} />
    case "inline_images": 
      return <InlineImages original={original} />
    case "people_also_ask": 
      return <PeopleAlsoAsk original={original} />
    case "local_results": 
      return <LocalResults original={original.local_results} />
    default:
      console.log('No conditions met');
      return (
        <div className="flex items-center gap-2"> 
          -
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