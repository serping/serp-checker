"use client"

import { Switch } from "@/components/ui/switch";
import { countries } from "@/country";
import { HomeFormValues } from "@/shema";
import {
  Monitor,
  Smartphone
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Status({
  searchParams,
  onCheckedChange
}: {
  searchParams: HomeFormValues;
  onCheckedChange?: ( checked: boolean )=> void;
}){
  const t = useTranslations(); 
  const devicesIcons = {
    "desktop": <Monitor size={20} className="font-semibold" />,
    "mobile": <Smartphone size={20} className="font-semibold" />
  }
  const country = countries.find(item => item.code === searchParams.country);

  const onSwitchChange =(checked: boolean)=>{
   if(onCheckedChange) onCheckedChange(checked);
  }
  return(
    <div className="mb-2">
      {searchParams.query && <h2 className="text-2xl font-semibold mb-4">{t('frontend.home.results_for', { query: searchParams.query } )}</h2>}
      <div className="flex text-muted-foreground justify-between">
        <div className="flex">
          <div className="flex items-center">{devicesIcons[searchParams.device]} <span className="capitalize ml-2">{searchParams.device}</span></div>
          <div className="ml-4">{country?.flag} {country?.name } <span className="text-sm">({searchParams.locale})</span> </div>
        </div>
        <div className="flex">
        <span className="mr-2">{t("frontend.home.views.preview")}</span><Switch onCheckedChange={onSwitchChange}/> 
        </div>
      </div>
    </div>
  )
}
