import { parse } from '@fast-csv/parse';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';
type Row = Record<string, string>;

const filePath = path.join(process.cwd(), 'data', 'geotargets.csv');

let csvData: Row[] = [];
let dataLoaded = false;
async function loadCsvData(): Promise<void> {
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

loadCsvData().catch((error) => {
  console.error('Failed to load CSV data:', error);
});

export async function GET(req: Request) {
  while (!dataLoaded) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  const { searchParams } = new URL(req.url);
  const rows: Row[] = [];
  const q = searchParams.get('q') || '';
  const num = searchParams.get('num') || '10';
  const start = searchParams.get('start') || '0';

  try {
    if (!q) {
      throw new Error('q is empty!');
    }

    const startInt = parseInt(start, 10) || 0;
    const numInt = parseInt(num, 10) || 10;
    let total_count = 0;

    csvData.forEach((row) => {
      const canonicalName = row['Canonical Name'];
      const matches = canonicalName.match(new RegExp(q, 'i'));

      if (matches) {
        total_count += 1;

        if (total_count > startInt && rows.length < numInt) {
          rows.push(row);
        }
      }
    });

    return new NextResponse(
      JSON.stringify({ data: rows, total_count }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
