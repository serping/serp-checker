
import { appConfig } from "@/config";
import { redirect } from 'next/navigation';
import Serping from "serping";
export async function GET(__req: Request, { params }: { params: { id: string } }) {
  const { serpingApi } = appConfig;
  try {
    const { id } = params;
    const serping = new Serping({ region: "us-east-1", apiKey: serpingApi["us-east-1"].apiKey });
    const data = await serping.googleSerpSnapshot({ id });
    return new Response(
      data,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8;',
          'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=59'
        }
      }
    );
  } catch (error: any) {
    console.log("error", error)
    redirect('/404');
  }
}
