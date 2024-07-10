 
import { LocaleType } from "@/config";
import { Main } from "@/frontend/page/home/main";
import { getComponentMarkdown } from "@/i18n";

export default function Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  console.log("markdownContents 1")
  // Load by key: data/generated/components-markdown.json
  const markdownContents = {
    block1: getComponentMarkdown({
      locale: params.locale as LocaleType, 
      componentPathName: "home/block1"
    })
  }
  console.log("markdownContents 2", markdownContents)
  return (
    <div className="px-8">
      <Main params={params} markdownContents={markdownContents} />
    </div>
  );
}
