import { Main } from "@/frontend/home/main";

export default function Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) { 
  return (
    <div className="px-8">
      <Main params={params} />
    </div>
  );
}
