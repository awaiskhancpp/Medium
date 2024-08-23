import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./Card"


export const BlogBody = ({blog}:{blog:Blog}) => {
  return (
    <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on March 3rd 2024
                    </div>
                    <div className="pt-2">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex">
                        <div className="pr-2 flex flex-col justify-center">
                            <Avatar name={blog.aurthor.name || "Anonymous"} size="big"/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {(blog.aurthor.name || "Anonymous").toLocaleUpperCase()}
                            </div>
                            <div>
                                Master of mirth, purveyor of puns and the funniest person in kingdom
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
  )
}

