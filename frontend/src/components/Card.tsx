import { Link } from "react-router-dom";


interface Cardprops{
    author:string;
    content:string;
    title:string;
    publishedDate:string,
    id:string
}

export const Card = ({author,content,title,publishedDate,id}:Cardprops) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={author || "Anonymous"} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{author || "Anonymous"}</div>
                <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                <span>&#183;</span>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                {publishedDate}
            </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
  )
}
export function Avatar({name,size="small"}:{name:string,size?:"small" | "big"}){
    return <div className={`mr-1 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"}text-xs font-extralight justify-center text-gray-600 dark:text-gray-300`}>{name.substring(0,2).toLowerCase()}</span>
    </div>
}