
"use client" 
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { LocalResults, PeopleAlsoAsk, SerpInlineImages, SerpInlineVideos } from "@/frontend/google/desktop";
import { type HomeFormValues } from "@/shema/index";
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
import { useMemo, useState } from "react";
import { type SerpColumn, type SerpJSON, type SerpNormal } from "serping/zod/google/desktop-serp";

export function Results({
  searchParams,
  results
}:{
  searchParams: HomeFormValues;
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
          accessorKey: "type",
          header: t("frontend.home.type"),
          cell: ({ row }: { row: any}) =>  {
            const [open, setOpen] = useState(false);
            const title = row.original.type.replace(/_/g,' ');
            let data = row.original;
 
            if(row.original.type === "local_results") data = row.original.local_results;
            if(row.original.type === "related_searches") data = row.original.related_searches;
            return ( 
              <div className="flex items-center gap-2 capitalize">
                  <span className="mr-2 capitalize">{ title }</span> 
                </div> 
              )
          }
        },
        {
          accessorKey: "title",
          header: t("frontend.home.title"), 
          cell: ({ row }: { row: any}) => {
            let original = row.original;
            switch( row.original.type ){
              case "normal":
              case "site_links":
                original = row.original as SerpNormal;
                return (
                  <div className="flex items-center gap-2"> 
                    {original.title}
                    {original.thumbnail && <ImageIcon className="ml-2" size={20} />}
                  </div>
                )
              case "inline_videos": 
                return <SerpInlineVideos original={row.original} />
              case "inline_images": 
                return <SerpInlineImages original={row.original} />
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
    <div className="px-8 pt-10">
      <h2 className="text-xl font-semibold">Results for “{searchParams.query}”</h2>
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
                      className="py-2 group-first:rounded-t-md group-last:rounded-b-md"
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
