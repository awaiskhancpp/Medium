import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
export interface Blog{
    "content":string,
    "title":string,
   "id":string,
    "aurthor":{
        "name":string,
    }
}
export const usedBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res)
            setBlogs(res.data.blogs)
            setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then(res=>{
            console.log(res)
            setBlog(res.data.blog)
            setLoading(false)
        })
    },[])
    return {
        loading,
        blog
    }
}