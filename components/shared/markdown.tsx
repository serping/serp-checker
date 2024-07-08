import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
export function Markdown({content, className}:{content: string; className?: string;}){
  return(
    <ReactMarkdown 
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      className={className}
     >
     {content}
    </ReactMarkdown>
  )
}