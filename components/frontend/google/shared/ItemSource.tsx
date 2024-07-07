import { SerpItemSource } from 'serping/zod/google/base';
export function ItemSource({
  source,
  size = 50, 
}:{
  source: SerpItemSource;
  size?: number; 
}){
  const url = new URL(source.link);
  return( 
    <div className="relative flex items-center space-x-3 pb-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex-shrink-0">
         <img src={`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=${size}`} className="h-10 w-10 rounded-full" />
      </div>
      <div className="min-w-0 flex-1">
        <a href={source.link} className="focus:outline-none">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium text-gray-900">{source.name}</p>
          <p className="truncate text-sm text-gray-500">{source.display_link}</p>
        </a>
      </div>
    </div>
  )
}