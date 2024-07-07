"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { DeviceType } from "@/config";
import { SerpForm } from "@/frontend/home/form";
import apiClient from "@/lib/api";
import { type HomeFormValues } from "@/shema/index";
import { useEffect, useState } from "react";
import { SerpJsonSchema, type SerpJSON } from "serping/zod/google/desktop-serp";
import { Results } from "./results";
import { Status } from "./status";

export function Main({ 
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  const locale = params.locale;
  const defaultValues =  {
    query: "",
    locale: locale === "zh" ? "zh-Hans" : locale,
    country: "us",
    location: "",
    device: "desktop" as DeviceType,
  }
  const [searchParams, setSearchParams] = useState<HomeFormValues>(defaultValues);
  const [results, setResults] = useState<SerpJSON|null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(()=>{
    if(searchParams.query){
      const params = {
        q: searchParams.query,
        hl: searchParams.locale,
        gl: searchParams.country,
        location: searchParams.location,
        snapshot: "on",
        thumbnail: "on",
        num: 100,
        // device: searchParams.device,
      }
      setLoading(true);
      apiClient.post('/google/serp', { body: JSON.stringify(params) })
      .then((data) => {
        setResults(SerpJsonSchema.parse(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setLoading(false);
      });
    }
  }, [searchParams]);

  const SkeletonItem =()=>{
    return (
      <div className="flex items-center space-x-4 my-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    )
  }

  const SkeletonList =({num}:{num: number})=>{
    const items = [];
    for (let i = 0; i < num; i++) {
      items.push(<SkeletonItem key={i} />)
    }
    return items;
  }

  const onSubmit =({values}:{values: HomeFormValues})=>{
    setSearchParams(values)
  }
  return (
    <div>
      <SerpForm loading={loading} defaultValues={defaultValues} onSubmit={onSubmit} />
      <Status searchParams={searchParams} />
      {loading && <SkeletonList num={10} /> }
      {!loading &&  searchParams.query && results && <Results results={results} /> } 
    </div>
  );
}
