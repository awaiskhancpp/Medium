import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify } from 'hono/jwt'
import {signupInput,signinInput} from '@mawais_se/medium-common/dist'

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()
userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:'Invalid request body'})
    }
    try{
        const user=await prisma.user.create({
            data: {
                email:body.email,
                password:body.password
            }
        });
        const jwt=await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({jwt})
    }catch(error){
        c.status(403)
        return c.json({msg:"User already exists"})
    }
})
userRouter.post('/signin',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({message:'Invalid request body'})
    }
    const user=await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
        c.status(403)
        return c.json({error:"User not found!"})
    }
    const jwt=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt})
})