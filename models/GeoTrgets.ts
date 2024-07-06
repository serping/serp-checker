import { parse } from '@fast-csv/parse';
import fs from 'fs';
import path from 'path';

export type Row = Record<string, string>;
const filePath = path.join(process.cwd(), 'data', 'geotargets.csv');

let csvData: Row[] = [];
let dataLoaded = false;

export default async function GeoTargets(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('data', (row: Row) => {
        csvData.push(row);
      })
      .on('end', () => {
        dataLoaded = true;
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export { GeoTargets, csvData, dataLoaded };
