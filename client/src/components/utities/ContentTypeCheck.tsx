

export default function contentTypeCheck(contentType: string){
    if(contentType === 'text') return null;
    return (contentType.toLocaleUpperCase())
};