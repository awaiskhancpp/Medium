import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@mawais_se/medium-common/dist";
export const blogRouter=new Hono<{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string,
    },
    Variables:  {
        userId:string,
    }
}>();
blogRouter.use('/*',async(c,next)=>{
    const header=c.req.header("authorization") ||""
    const token=header.split(' ');

    try{
        const response=await verify(token[1],c.env.JWT_SECRET)
        if(response.id){
            //@ts-ignore
            c.set("userId",response.id)
            await next()
        }else{
            c.status(403);
            c.json({error:"unauthorized"})
        }
    }catch(er){
        c.status(403);
            c.json({error:"unauthorized"})
    }
})


blogRouter.post('/',async(c)=>{
    const body=await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:'Invalid request body'})
    }
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userId=c.get('userId')
    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            aurthorId:userId
        }
    })

    return c.json({
        id:blog.id
    });
})
blogRouter.put('/',async(c)=>{
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:'Invalid request body'})
    }
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    });
})
//do pagination
blogRouter.get('/bulk',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany();
    
    return c.json({blogs});
})

blogRouter.get('/:id',async(c)=>{
    const id=c.req.param('id')
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const blog=await prisma.post.findUnique({
            where:{
                id:String(id)
            }
        })
        return c.json({blog});
    }catch(error){
        c.status(411)
        return c.json({msg:"Error While Fetching"})
    }
})
