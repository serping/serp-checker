"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { DeviceType } from "@/config";
import { SerpForm } from "@/frontend/page/home/form";
import apiClient from "@/lib/api";
import { cn } from "@/lib/utils";
import { type HomeFormValues } from "@/schema/index";
import { ChangeEvent, useEffect, useState } from "react";
import { SerpJsonSchema, type SerpJSON } from "serping/zod/google/desktop-serp";
import { Landing as LandingPage } from "./landing";
import { Results } from "./results";
import { Status } from "./status";

export function Main({ 
  params,
  markdownContents
}: Readonly<{ 
  params: { locale: string; };
  markdownContents: Record<string, string|undefined>;
}>) {
  const locale = params.locale;
  const { block1, block2 } = markdownContents;
  const defaultValues: HomeFormValues =  {
    query: "",
    locale: locale === "zh" ? "zh-Hans" : locale,
    country: "us" ,
    location: "",
    device: "desktop" as DeviceType,
    snapshot: "off"
  }
  const [searchParams, setSearchParams] = useState<HomeFormValues>(defaultValues);
  const [results, setResults] = useState<SerpJSON|null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [preview, setPreview] = useState<boolean>(false); 
  const [landing, setLanding] = useState<boolean>(true); 
  const [filterUrl, setFilterUrl] = useState<string>(""); 

  useEffect(()=>{
    if(searchParams.query){
      const params = {
        q: searchParams.query,
        hl: searchParams.locale,
        gl: searchParams.country,
        location: searchParams.location,
        snapshot: searchParams.snapshot,
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
    if(landing) setLanding(false);
    setSearchParams(values)
  }

  const onCheckedChange=(checked: boolean)=>{
    setPreview(checked)
  }

  const filterOnChange =(e: ChangeEvent<HTMLInputElement>)=>{
    setFilterUrl(e.target.value)
  }
  
  return (
    <div className={cn("flex",landing ? "flex-col" : "flex-col md:flex-row")}>
      <div className={cn("flex-shrink-0 w-full", landing ? "": "md:w-[300px] mr-10")}>
        <SerpForm loading={loading} defaultValues={defaultValues} onSubmit={onSubmit} landing={landing} block1={block1} />
      </div>
      <div className="flex-auto">
        {!landing && <Status filterOnChange={filterOnChange} loading={loading} results={results} searchParams={searchParams} onCheckedChange={onCheckedChange} searchUrl={results?.meta?.url} snapshotId={results?.meta?.snapshot_id} />}
        {landing && <LandingPage className="md:max-w-[880px] mx-auto" block2={block2} />}
        {loading && <SkeletonList num={10} /> }
        {!loading &&  searchParams.query && results && <Results filterUrl={filterUrl} results={results} preview={preview} /> } 
      </div>
    </div>
  );
}
