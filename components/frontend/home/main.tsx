"use client"

import { DeviceType } from "@/config";
import { SerpForm } from "@/frontend/home/form";
import { type HomeFormValues } from "@/shema/index";
import { useState } from "react";
import { Results } from "./results";

export function Main({ 
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  const defaultValues =  {
    query: "",
    locale: params.locale,
    country: "us",
    location: "",
    device: "desktop" as DeviceType,
  }
  const [searchParams, setSearchParams] = useState<HomeFormValues>(defaultValues);
  const onSubmit =({values}:{values: HomeFormValues})=>{
    setSearchParams(values)
  }
  return (
    <div>
      <SerpForm defaultValues={defaultValues} onSubmit={onSubmit} />
      {searchParams.query && <Results searchParams={searchParams} />}
    </div>
  );
}
