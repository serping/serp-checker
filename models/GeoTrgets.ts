import { parseString } from '@fast-csv/parse';
import fs from 'fs';
import path from 'path';

export type Row = Record<string, string>;
const filePath = path.join(process.cwd(), 'data', 'geotargets.csv');

const csvData: Row[] = [];
let dataLoaded = false;

export default function GeoTargets(): void {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    parseString(fileContent, { headers: true })
      .on('data', (row: Row) => {
        csvData.push(row);
      })
      .on('end', () => {
        dataLoaded = true;
      })
      .on('error', (error) => {
        throw new Error(`Failed to parse CSV: ${error.message}`);
      });
  } catch (error: any) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

export { csvData, dataLoaded, GeoTargets };

