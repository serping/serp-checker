"use client";
import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { CSVLink } from 'react-csv';
import { SerpPeopleAlsoAsk, type SerpItemSource, type SerpJSON } from "serping/zod/google/desktop-serp";
export function DownloadCsv({results}:{results: SerpJSON}){
  const t = useTranslations();
  const headers: { label: string; key: string; }[] = [
    { label: "Position" , key: 'position' },
    { label: "Type" , key: 'type' },
    { label: "Title" , key: 'title' },
    { label: "Snippet" , key: 'snippet' },
    { label: "Snippet Highlighted Words" , key: 'snippet_highlighted_words' },
    { label: "Display Link" , key: 'display_link' },
    { label: "Source Name" , key: 'source_name' },
    { label: "Source Link" , key: 'source_link' },
    { label: "Thumbnail" , key: 'thumbnail' },
    { label: "Duration" , key: 'duration' },
    { label: "Links" , key: 'links' }, 
  ]

  const origin_search_results = useMemo(() => {
    if ( !results.origin_search.results ) return [];
    let items: {
      position?: number;
      type: string;
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
          case "featured_snippets":
            const data = item as {
              position: number;
              type: string;
              title: string;
              thumbnail?: string;
              snippet: string;
              snippet_highlighted_words: string[];
              duration?: string;
              links?: string;
              source: SerpItemSource
            };

            const source = data.source; 
            items.push({
              position: data.position,
              type: data.type,
              title: data.title,
              snippet: data.snippet,
              snippet_highlighted_words: JSON.stringify(data.snippet_highlighted_words),
              display_link: source.display_link,
              source_name: source.name,
              source_link: source.link,
              thumbnail:  data.thumbnail ? "yes" : "no",
              duration: data?.duration,
            })
            break;
          case "people_also_ask":
            const ask = item as SerpPeopleAlsoAsk; 
            ask.people_also_ask.map(qa =>{
              items.push({ 
                type: ask.type,
                title: qa.question,
                snippet: qa.snippet,  
                display_link: qa?.source?.display_link,
                source_name: qa?.source?.name,
                source_link: qa?.source?.link,
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
    <CSVLink data={origin_search_results} headers={headers} filename={"my-data.csv"} className="flex">
      <DownloadIcon className="size-5 mr-2" /> {t('frontend.serp.download_csv')}
    </CSVLink>
  )

}