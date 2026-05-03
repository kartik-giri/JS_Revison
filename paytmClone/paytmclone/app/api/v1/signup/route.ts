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
    
    const txresult = await prisma.$transaction(async (txs)=>{
        const user = await txs.users.create({
        data:{
            username:userName,
            email:email,
            password:hashedPassword
        }
    })

    const account = await txs.accounts.create({
        data:{
            balance:10000,
            user_id: user.id
        }
    })

    return {user, account};
    },
      {
        maxWait:5000,
        timeout: 10000
    }
)
    
      return Response.json({
        message:txresult.user
      }, {status:200})
}catch(e){
        return Response.json({
            error:`${e}Error occured while signng up`
        }, {status:400})
    }


}