
export const FilterUrl =({link, filter}:{link: string, filter?: string})=>{
  if(filter){ 
    return <span dangerouslySetInnerHTML={{__html: link.replaceAll(filter,`<b class="text-red-400">${filter}</b>`)}} />;
  }else{
    return link
  }
}
