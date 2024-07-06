import { Main } from "@/frontend/home/main";

export default function Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) { 
  return (
    <div>
      <Main params={params} />
    </div>
  );
}
