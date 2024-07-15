"use client"

import { Switch } from "@/components/ui/switch";
import { countries } from "@/country";
import { HomeFormValues } from "@/schema";
import {
  Camera,
  Globe,
  Monitor,
  Smartphone
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Status({
  searchUrl,
  snapshotId,
  searchParams,
  onCheckedChange
}: {
  searchParams: HomeFormValues;
  onCheckedChange?: ( checked: boolean )=> void;
  searchUrl?: string;
  snapshotId?: string;
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
        <div className="flex gap-4">
          <div className="flex items-center">{devicesIcons[searchParams.device]} <span className="capitalize ml-2">{searchParams.device}</span></div>
          <div>{country?.flag} {country?.name } <span className="text-sm">({searchParams.locale})</span> </div>
          {searchUrl && <a href={searchUrl} target="_blank" className="flex items-center"><Globe size={18} className="mr-2 text-lime-800" />{t('home.status.online_google')}</a>}
          {snapshotId && <a href={`/api/snapshot/${snapshotId}`} target="_blank" className="flex items-center"><Camera size={18} className="mr-2" />{t('frontend.snapshot')}</a>}
        </div>
        <div className="flex">
        <span className="mr-2">{t("frontend.home.views.preview")}</span><Switch onCheckedChange={onSwitchChange}/> 
        </div>
      </div>
    </div>
  )
}
