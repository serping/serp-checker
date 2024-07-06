import { Main } from "@/frontend/home/main";

export default function Home({
  params
}: Readonly<{ 
  params: { locale: string; country: string; };
}>) { 
  return (
    <div>
      <Main params={params} />
    </div>
  );
}
