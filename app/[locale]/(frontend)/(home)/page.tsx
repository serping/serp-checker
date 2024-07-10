 
import { LocaleType } from "@/config";
import { Main } from "@/frontend/page/home/main";
import { getComponentMarkdown } from "@/i18n";

export default function Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  // Load by key: data/generated/components-markdown.json
  const markdownContents = {
    block1: getComponentMarkdown({
      locale: params.locale as LocaleType, 
      componentPathName: "home/block1"
    }),
    block2: getComponentMarkdown({
      locale: params.locale as LocaleType, 
      componentPathName: "home/block2"
    }),
  }
  return (
    <div className="px-8">
      <Main params={params} markdownContents={markdownContents} />
    </div>
  );
}
