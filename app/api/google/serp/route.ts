
import { GoogleSerpSearchParamSchema } from 'serping/zod/google/base';

export async function POST(req: Request) {
  const searchParams = GoogleSerpSearchParamSchema.parse(req.body);

  try {


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
