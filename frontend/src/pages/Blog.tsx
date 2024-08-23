import { AppBar } from "../components/AppBar";
import { BlogBody } from "../components/BlogBody";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks"

import { useParams } from "react-router-dom";
const Blog = () => {
  const {id}=useParams()
  const {loading,blog}=useBlog({
    id:id||""
  });
  if(loading){
    return <div>
      <AppBar />
      <div className="flex justify-center">
            <div className="flex">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
              <div className="col-span-8">
                <Skeleton/>
              </div>
              <div className="col-span-4">
                <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
            </div>
            </div>
        </div>
    </div>
  }
  return (
    <div>
      <BlogBody blog={blog} />
    </div>
  )
}

export default Blog
