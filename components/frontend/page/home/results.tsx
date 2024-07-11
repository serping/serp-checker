
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
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { type SerpColumn, type SerpJSON } from "serping/zod/google/desktop-serp";
import { TitleCell } from "./title-cell";

export function Results({ 
  results,
  preview = false
}:{
  results: SerpJSON;
  preview?: boolean;
}) {

  const t = useTranslations();

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
              <TitleCell row={row} preview={preview} /> 
            </div>
            )
          },
        }
      ], 
      [results, preview],
    );


  const origin_search = useMemo(() => {
    if ( !results.origin_search.results ) return [];
    let items: any = results.origin_search.results.map(item => item);  

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
