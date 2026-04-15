
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export const POST = async ( req: NextRequest)=>{
    const data = await req.json() //get user input and parsing it.
    
    const userName = data.userName;
    const password  = data.password;

    try{
        await prisma.users.create({
        data:{
            username:userName,
            password: password
        }

    })
    return NextResponse.json({
        message: `${userName} thanks for signing up!`
    })
}catch(e){

    return NextResponse.json({
        message: "You have been signed Up"
    })}
}