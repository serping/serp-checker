"use client";
import { HomeFormValues } from "@/schema";
import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { CSVLink } from 'react-csv';
import { SerpFeaturedListSchema, SerpFeaturedNormalSchema, SerpPeopleAlsoAsk, type SerpItemSource, type SerpJSON } from "serping/zod/google/desktop-serp";
export function DownloadCsv({results, searchParams}:{results: SerpJSON, searchParams: HomeFormValues}){
  const t = useTranslations();
  const headers: { label: string; key: string; }[] = [
    { label: "Country" , key: 'country' },
    { label: "Locale" , key: 'locale' },
    { label: "Location" , key: 'location' },
    { label: "Position" , key: 'position' },
    { label: "Type" , key: 'type' },
    { label: "Domain" , key: 'domain' },
    { label: "Title" , key: 'title' },
    { label: "Thumbnail" , key: 'thumbnail' },
    { label: "Duration" , key: 'duration' },
    { label: "Snippet" , key: 'snippet' },
    { label: "Snippet Highlighted Words" , key: 'snippet_highlighted_words' },
    { label: "Display Link" , key: 'display_link' },
    { label: "Source Name" , key: 'source_name' },
    { label: "Source Link" , key: 'source_link' },
    { label: "Links" , key: 'links' }, 
  ];

  const itemDefault:{
    country: string;
    location?: string; 
    locale: string;
  } = {country: searchParams.country, location: searchParams.location, locale: searchParams.locale }

  const origin_search_results = useMemo(() => {
    if ( !results.origin_search.results ) return [];
    let items: {
      country: string;
      location?: string;
      locale: string;
      position?: number;
      type: string;
      domain?: string;
      title: string;
      thumbnail: "yes" | 'no';
      snippet: string;
      snippet_highlighted_words?: string;
      display_link?: string;
      source_name?: string;
      source_link?: string;
      duration?: string;
      links?: string;
    }[] = []
    results.origin_search.results.map(item => { 
        switch(item.type){
          case "book":
          case "normal":
          case "site_links":
          case "twitter":
          case "video": 
            const data = item as {
              position: number;
              type: string;
              title: string;
              thumbnail?: string;
              snippet: string;
              snippet_highlighted_words: string[];
              duration?: string;
              links?: string;
              source: SerpItemSource | undefined;
            };

            const source = data.source; 
            try{
              items.push({
                ...itemDefault,
                position: data.position,
                type: data.type,
                title: data.title,
                snippet: data.snippet,
                snippet_highlighted_words: JSON.stringify(data.snippet_highlighted_words),
                display_link: source?.display_link,
                source_name: source?.name,
                source_link: source?.link,
                domain: source ? new URL(source.link).hostname: "",
                thumbnail:  data.thumbnail ? "yes" : "no",
                duration: data?.duration,
              })
              break;
            }catch(error:any){
              console.error("data", data)
              throw error;
            }
          case "featured_snippets":
            if(item.featured_snippets.type === "featured_list" ){
              const featuredList = SerpFeaturedListSchema.parse(item.featured_snippets);
              items.push({
                ...itemDefault,
                position: item.position,
                type: item.type,
                title: featuredList.source.title,
                snippet: featuredList.snippet_list.join("\n"), 
                display_link: featuredList.source.display_link,
                source_name: featuredList.source.name,
                source_link: featuredList.source.link,
                domain: featuredList.source ? new URL(featuredList.source.link).hostname: "",
                thumbnail:  featuredList.images ? "yes" : "no"
              })
              break;
            }else{
              const featuredNormal = SerpFeaturedNormalSchema.parse(item.featured_snippets);
              items.push({
                ...itemDefault,
                position: item.position,
                type: item.type,
                title: featuredNormal.source.title,
                snippet: featuredNormal.snippet, 
                snippet_highlighted_words: JSON.stringify(featuredNormal.snippet_highlighted_words),
                display_link: featuredNormal.source.display_link,
                source_name: featuredNormal.source.name,
                source_link: featuredNormal.source.link,
                domain: featuredNormal.source ? new URL(featuredNormal.source.link).hostname: "",
                thumbnail:  featuredNormal.images ? "yes" : "no"
              })
              break;
            } 
               
          case "people_also_ask":
            const ask = item as SerpPeopleAlsoAsk; 
            ask.people_also_ask.map(qa =>{
              items.push({ 
                ...itemDefault,
                type: ask.type,
                title: qa.question,
                snippet: qa.snippet,  
                display_link: qa?.source?.display_link,
                source_name: qa?.source?.name,
                source_link: qa?.source?.link,
                domain: qa?.source?.link ? new URL(qa?.source?.link).hostname : "",
                thumbnail: "no",
              })
            });
            break;
          default:
            break;
        } 
    }); 
    return items;
  } , [results]); 

  return(
    <CSVLink data={origin_search_results} headers={headers} filename={`${searchParams.country}-${searchParams.locale}-${searchParams.device}-${searchParams.query}.csv`} className="flex">
      <DownloadIcon className="size-5 mr-2" /> {t('frontend.serp.download_csv')}
    </CSVLink>
  )

}