"use client";

import { cn } from "@/lib/utils";
import { SerpLocalDirectionPlaceNormalSchema, SerpLocalDirectionPlaceStoreSchema, SerpLocalServicePlaceSchema, type SerpLocalDirections, type SerpLocalNormal, type SerpLocalResults, type SerpLocalServices } from "serping/zod/google/desktop-serp";

const LocalNormal =({original}:{original: SerpLocalNormal})=>{
  return(
    <> 
       {
        original.places.map(item => {
          return(
            <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div>
                <h3 className="truncate text-base font-medium text-gray-900">{item.title}</h3>
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
            <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div>
                <h3 className="truncate text-base font-medium text-gray-900">{item.title}</h3>
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
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-base font-medium text-gray-900">{data.title}</h3>
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
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div>
                    <h3 className="truncate font-medium text-gray-900 text-base">{data.title}</h3>
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

  const Results =()=>{
    if(original.type === "services"){
      return <LocalServices original={original as SerpLocalServices} />
      
    }else if(original.type === "directions"){
      return  <LocalDirections original={original as SerpLocalDirections} />
    }else{
      return  <LocalNormal original={original as SerpLocalNormal} />
    }
  }
  
  return(
    <div className={cn("max-w-[500px]", className)}>
      <Results />
    </div>
  )
  
}
