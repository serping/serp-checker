import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyList,
  TypographyP,
  TypographySmall
} from '../ui/typography';

export function Markdown({
  content,
   className,
   classNames,
   markdownClassName
}:{
    content: string; 
    className?: string;
    classNames?:{
      h1?: string;
      h2?: string;
      h3?: string;
      h4?: string;
      p?: string;
      blockquote?: string;
      list?: string;
      inline_code?: string;
      small?: string; 
    };
    markdownClassName?: string;
} ){
  return(
    <div className={cn('prose lg:prose-xl dark:prose-invert', className)}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{ 
          h1: ({ children }) => <TypographyH1 className={classNames?.h1}>{children}</TypographyH1>, 
          h2: ({ children }) => <TypographyH2 className={classNames?.h2}>{children}</TypographyH2>, 
          h3: ({ children }) => <TypographyH3 className={classNames?.h3}>{children}</TypographyH3>, 
          h4: ({ children }) => <TypographyH4 className={classNames?.h4}>{children}</TypographyH4>, 
          p: ({ children }) => <TypographyP className={classNames?.p}>{children}</TypographyP>,
          blockquote: ({ children }) => <TypographyBlockquote className={classNames?.blockquote}>{children}</TypographyBlockquote>,
          ul: ({ children }) => <TypographyList className={classNames?.list}>{children}</TypographyList>,
          code: ({ children }) => <TypographyInlineCode className={classNames?.inline_code}>{children}</TypographyInlineCode>,   
          small: ({ children }) => <TypographySmall className={classNames?.small}>{children}</TypographySmall>,
        }}
        className={markdownClassName}
      >
      {content}
      </ReactMarkdown>
    </div>
  )
}