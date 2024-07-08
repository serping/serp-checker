
"use client" 
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import {
  InlineImages,
  InlineVideos,
  LocalResults,
  PeopleAlsoAsk,
  Video
} from "@/frontend/google/desktop";

import { ItemNormal } from "@/frontend/google/shared/ItemNormal";
import { ItemSource } from "@/frontend/google/shared/ItemSource";
import type {
  ColumnDef
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { SerpColumnType, type SerpColumn, type SerpJSON, type SerpNormal } from "serping/zod/google/desktop-serp";
import { FeaturedSnippets } from "../google/desktop/FeaturedSnippets";

export function Results({ 
  results
}:{
  results: SerpJSON
}) {

  const t = useTranslations();

  const columns: ColumnDef<SerpColumn>[] =
    useMemo(
      () => [
        {
          accessorKey: "position",
          header: t("frontend.home.position"),
          cell: ({ row }: { row: any}) =>  (
            <div className="flex items-center gap-2"> 
              <span>{row.original?.position}</span>
            </div>
          )
        },
        {
          accessorKey: "title",
          header: t("frontend.home.title"), 
          cell: ({ row }: { row: any}) => {
            let original = row.original;
            const type = row.original.type as SerpColumnType 
            switch( type ){
              case "normal":
              case "site_links":
              case "book":
                original = row.original as SerpNormal;
                return (
                  <div className="flex items-center gap-2">
                    <div>
                      <ItemSource source={original.source} />
                      <ItemNormal item={ {title: original.title, snippet: original.snippet, link: original.source.link } }/>
                    </div>
                    {original.thumbnail && <ImageIcon className="ml-2" size={20} />}
                  </div>
                )
              case "video":
                return <Video original={row.original} />
              case "featured_snippets":
                  return (
                    <>
                      <FeaturedSnippets original={row.original} className="text-sm text-secondary-foreground" />
                      <ItemSource source={original.featured_snippets.source} className="mt-2" />
                    </>
                  )
              case "inline_videos": 
                return <InlineVideos original={row.original} />
              case "inline_images": 
                return <InlineImages original={row.original} />
              case "people_also_ask": 
                return <PeopleAlsoAsk original={row.original} />
              case "local_results": 
                return <LocalResults original={row.original.local_results} />
              default:
                console.log('No conditions met');
                return (
                  <div className="flex items-center gap-2"> 
                    -
                  </div>
                )
            }
          },
        }
      ], 
      [results],
    );


  const origin_search = useMemo(() => {
    if ( !results.origin_search.results ) return [];
    let items: any = results.origin_search.results.map(item => item);
 
    if (results.local_results) {
      items.unshift({
        type: "local_results",
        local_results: results.local_results
      });
    }

    if (results.related_searches) {
      items.push({
        type: "related_searches",
        related_searches: results.related_searches
      });
    }
    return items;
  } , [results]); 

  const table = useReactTable({
    data: origin_search,
    columns, 
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false 
  }); 

  return (
    <div className="">
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
