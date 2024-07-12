"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ReactMarkdown from 'react-markdown';
import type { SerpTwitter } from "serping/zod/google/desktop-serp";
import { ItemSource } from "../shared/ItemSource";
import { TypeTitle } from "../shared/TypeTitle";
export function Twitter({original, className}:{original: SerpTwitter, className?: string;}){
  const t = useTranslations();  
  return (
    <div className={cn('ml-8',className)}>
      <ItemSource source={original.source} />
      <a href={original.source.link} className="text-primary" ><TypeTitle title={original.source.title} /></a>
      <Carousel className="w-full max-w-screen-md">
        <CarouselContent className="-ml-1">
          {original.posts.map((item, index) =>   (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-start justify-center p-6">
                    <ReactMarkdown components={{ a: ({ children, href }) => <a className="text-primary mt-au" href={href}>{children}</a>,}} className="text-base">{item.snippet}</ReactMarkdown>
                    <span className="text-base">{item.posted_on}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}