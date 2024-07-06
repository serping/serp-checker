import { GeoTargets, csvData, dataLoaded, type Row } from "@/models/GeoTrgets";

GeoTargets().catch((error: any) => {
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

    return new Response(
      JSON.stringify({ data: rows, total_count }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
