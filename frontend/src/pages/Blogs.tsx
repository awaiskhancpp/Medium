import { AppBar } from "../components/AppBar"
import { Card } from "../components/Card"
import { Skeleton } from "../components/Skeleton";
import { usedBlogs } from "../hooks"


const Blogs = () => {
  const {loading,blogs}=usedBlogs();
  if(loading){
    return <div>
        <AppBar/>
        <div className="flex justify-center">
          <div>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </div>
        </div>
    </div>
  }
  
  return (
    <div>
      <AppBar/>
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((b)=>(
              <Card author={b.aurthor.name} content={b.content} title={b.title} id={b.id} publishedDate={"Mar 3rd 2021"}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
