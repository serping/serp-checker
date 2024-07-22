"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  SerpLocalDirectionPlaceNormalSchema,
  SerpLocalDirectionPlaceStoreSchema,
  SerpLocalDirectionsSchema,
  SerpLocalNormalSchema,
  SerpLocalServicePlaceSchema,
  SerpLocalServicesSchema,
  type SerpLocalDirections, type SerpLocalNormal, type SerpLocalResults, type SerpLocalServices
} from "serping/zod/google/desktop-serp";
import { TypeTitle } from "../shared/TypeTitle";

const LocalNormal =({original}:{original: SerpLocalNormal})=>{
  return(
    <> 
       {
        original.places.map(item => {
          return(
          <div key={item.position} className="flex w-full items-center justify-between py-4">
            <div className="flex-1 truncate">
              <div>
                <h3 className="truncate text-base font-medium">{item.title}</h3>
                <span className="text-gray-500">{item.topic}</span>
              </div> 
              <address className="mt-1 truncate text-sm text-gray-500">{item.address}</address>
              <p className="mt-1 truncate text-sm text-gray-500">{item.description}</p>
            </div>
            {item.thumbnail && <img alt="thumbnail" src={item.thumbnail} className="h-18 w-18 flex-shrink-0 rounded bg-gray-300" />}
          </div>
          )
        })
       }
    </>
  )
}

const LocalServices =({original}:{original: SerpLocalServices})=>{
  return(
    <> 
      {
        original.places.map(item => {
          const data = SerpLocalServicePlaceSchema.parse(item);
          return(
            <div className="flex w-full items-center justify-between py-4">
            <div className="flex-1 truncate">
              <div>
                <h3 className="truncate text-base font-medium">{item.title}</h3>
                <span className="text-gray-500">{item.topic}</span>
              </div> 
              <address className="mt-1 truncate text-sm text-gray-500">{item.address}</address>
              <p className="mt-1 truncate text-sm text-gray-500">{item.description}</p>
            </div>
            <div className="flex gap-6">
              {data.links.map(link =>
                <a href={link.link} key={link.name}>{link.name}</a>
              )}
            </div>
          </div>
          )
        })
        }
    </>
  )
}
const LocalDirections =({original}:{original: SerpLocalDirections})=>{ 
  return(
    <> 
      {
        original.places.map(item => {
          if( item.type === "normal"){
            const data = SerpLocalDirectionPlaceNormalSchema.parse(item);
            return(
              <div className="flex w-full items-center justify-between py-4">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-base font-medium">{data.title}</h3>
                    <span className="text-gray-500">{item.topic}</span>
                  </div> 
                  <address className="mt-1 truncate text-sm text-gray-500">{data.address}</address>
                  <p className="mt-1 truncate text-sm text-gray-500">{data.description}</p>
                </div>
                <div>

                </div>
              </div>
            )
          }else{
            const data = SerpLocalDirectionPlaceStoreSchema.parse(item);
            return(
              <div className="flex w-full items-center justify-between py-4">
                <div className="flex-1 truncate">
                  <div>
                    <h3 className="truncate font-medium text-base">{data.title}</h3>
                    <span className="text-gray-500">{data.type}</span>
                  </div> 
                  <address className="mt-1 truncate text-sm text-gray-500">{data.address}</address>
                  <p className="mt-1 truncate text-sm text-gray-500">{data.description}</p>
                </div>
                <div className="flex gap-6">
                  {data.links.map(link =>
                    <a href={link.link} key={link.name}>{link.name}</a>
                  )}
                </div>
              </div>
            )
          } 
        })
        }
    </>
  )
}

export function LocalResults({original, className}:{original: SerpLocalResults, className?: string;}){
  const t = useTranslations();
  const Results =()=>{
    if(original.local_results.type === "services"){ 
      return <LocalServices original={SerpLocalServicesSchema.parse(original.local_results)} />
      
    }else if(original.local_results.type === "directions"){
      return  <LocalDirections original={SerpLocalDirectionsSchema.parse(original.local_results)} />
    }else{
      return  <LocalNormal original={SerpLocalNormalSchema.parse(original.local_results)} />
    }
  }
  
  return(
    <div className={cn("max-w-[500px] text-current", className)}>
      <TypeTitle title={t('frontend.serp.places')} className="capitalize" />
      <Results />
    </div>
  )
  
}
