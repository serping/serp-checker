
"use client" 
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import type {
  ColumnDef
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";
import { SerpItemSource, SerpPeopleAlsoAsk, SerpThingsToKnow, SerpThingsToKnowListing, SerpThingsToKnowNormal, type SerpColumn, type SerpJSON } from "serping/zod/google/desktop-serp";
import { TitleCell } from "./title-cell";

export function Results({ 
  results,
  preview = false,
  filterUrl
}:{
  results: SerpJSON;
  preview?: boolean;
  filterUrl: string;
}) { 

  const columns: ColumnDef<SerpColumn>[] =
    useMemo(
      () => [
        {
          accessorKey: "title",
          header: "", 
          cell: ({ row }: { row: any}) => {
           return (
            <div className={`${row.original?.position ? "flex" : ""} items-center px-5`}>
              {row.original?.position && <span className="text-base font-mono mr-3">{row.original?.position}</span>}
              <TitleCell row={row} preview={preview} filterUrl={filterUrl} /> 
            </div>
            )
          },
        }
      ], 
      [results, preview, filterUrl],
    );


  const origin_search = useMemo(() => {
    if ( !results.origin_search.results ) return [];
    const items: any = [];
    results.origin_search.results.map(item => {
      if(filterUrl){
        // TODO: top_stories
        let source: SerpItemSource;
        if(["normal", "site_links", "video", "book", "twitter"].includes(item.type)){
          source = item.source as SerpItemSource;
          if(source.link.includes(filterUrl)) items.push(item);

        }else if( "featured_snippets" === item.type ){
          source = item.featured_snippets.source as SerpItemSource
          if(source.link.includes(filterUrl)) items.push(item);

        }else if( "people_also_ask" === item.type ){
          const spaa = item as SerpPeopleAlsoAsk;
          const people_also_ask: any[] = [];
          spaa.people_also_ask.map(paa => paa?.source?.link.includes(filterUrl) ? people_also_ask.push(paa) : null ); 
          if(people_also_ask.length > 0) items.push({
            ...spaa,
            people_also_ask
          });
        }
        else if( "things_to_know" === item.type ){
          const things = item as SerpThingsToKnow;
          const things_to_know: any = [];
          things.things_to_know.map(thing => {
            if(thing.type === "normal"){
              const normal = thing as SerpThingsToKnowNormal;
              if(normal.source.link.includes(filterUrl)) things_to_know.push(thing); 
            }else{
              const listing = thing as SerpThingsToKnowListing;
              const listingItems: {
                  source: {
                      link: string;
                      name: string;
                      title: string;
                  };
                  snippet: string;
              }[] = [];
              listing.items.map(list => { if(list.source.link.includes(filterUrl)) listingItems.push(list); } );

              if(listingItems.length > 0) things_to_know.push({
                ...listing,
                items: listingItems
              }); 
            }
          }); 
          if(things_to_know.length > 0) items.push({
            ...things,
            things_to_know
          });
        } 
      }else{
        if( "people_also_ask" === item.type ) console.log("people_also_ask", item)
        items.push(item); 
      }
    });

    if (results.related_searches) {
      items.push({
        type: "related_searches",
        related_searches: results.related_searches
      });
    }
    return items;
  } , [results, filterUrl]); 

  const table = useReactTable({
    data: origin_search,
    columns, 
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false 
  }); 

  return (
    <div>
      <Table>
          <TableHeader> 
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))} 
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-3 group-first:rounded-t-md group-last:rounded-b-md"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )) 
              }
          </TableBody>
        </Table>
    </div>
  );
}
