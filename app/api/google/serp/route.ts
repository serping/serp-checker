
import Serping from "serping";
import { GoogleSerpSearchParamSchema } from 'serping/zod/google/base';
export async function POST(req: Request) {
  const data = await req.json();
  const { body } = data;

  try {
    const searchParams = GoogleSerpSearchParamSchema.parse(JSON.parse(body));
    const serping = new Serping({ region: "us-east-1" });
    const data = await serping.googleSerp(searchParams);
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.log("error", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
