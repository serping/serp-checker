"use client";

import { cn } from "@/lib/utils";
import { VideoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SerpInlineVideos, SerpVideo } from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

export function InlineVideos({original, className}:{original: SerpInlineVideos, className?: string;}){
  const videos = original.inline_videos;
  const t = useTranslations();
  return (
    <div className={cn(className)}>
      <TypeTitle title={t('frontend.serp.videos')} className="capitalize" />
      <ul role="list" className="divide-y divide-gray-200 text-sm">
        {videos.map(video =>  
          <li key={`videos-${video.title}`} className="flex space-x-6 py-2">
           {video.thumbnail === "imageBase64" ? <VideoIcon size={24} /> :
           <>
              <div className="relative w-[100px]">
                <img src={video.thumbnail} className="w-full flex-none rounded-s bg-gray-100 object-cover object-center" />
                <span style={{fontSize: "11px", padding: "3px 5px"}} className="inline-block rounded-full leading-tight bg-black/70 bg-opacity-40 text-white absolute bottom-0 mb-1 ml-1">{video.duration}</span>
              </div>
              <div className="flex-auto space-y-1 max-w-[200px] lg:max-w-[300px]">
                <h3 className="truncate font-medium">
                  <a href={video.source.link} target="_blank" title={video.title} rel="noopener noreferrer">{video.title}</a>
                </h3>
                <p>{video.source.creator}</p>
                <p>{video.date}</p>
              </div>
            </>
           }
          </li> 
        )}
      </ul>
    </div>
  )
}

// TODO: Video
export function SerpVideo({original, className}:{original: SerpVideo, className?: string;}){
  return (
    <div className={cn("flex items-center gap-2", className)}> 
      {original.title}
    </div>
  )
}