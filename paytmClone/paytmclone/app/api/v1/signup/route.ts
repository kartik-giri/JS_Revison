import prisma from "@/lib/prisma";
import { signupScheema } from "@/lib/zod";
import { NextRequest } from "next/server"
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest)=>{
    const body = await req.json();

    const result = signupScheema.safeParse(body);
    if(!result.success){
        return Response.json({
            error: result.error.issues
        },{status:400})
    }

    const {userName, email, password} = result.data;

    const hashedPassword = await bcrypt.hash(password,8)
    try{
    const user = await prisma.users.create({
        data:{
            username:userName,
            email:email,
            password:hashedPassword
        }
    })
      return Response.json({
        message:user
      }, {status:200})
}catch(e){
        return Response.json({
            error:`Error occured while signng up`
        }, {status:400})
    }


}