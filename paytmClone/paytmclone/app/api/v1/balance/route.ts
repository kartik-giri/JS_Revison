import prisma from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server"

export const POST = async(req: NextRequest)=>{
    const body = await req.json();

    const {amount, senderId, recieverId} = body;

    try{

    const senderUser = await prisma.users.findUnique({
        where:{
            id:senderId
        },
        include:{
            account:true
        }
    })
    if(!senderUser || senderUser.account?.balance!<amount){
        return Response.json({
            error: "Insufficient Balance"
        })
    }

    const txResult = await prisma.$transaction(async(txs)=>{
        const transaction = await txs.transactions.create({
            data:{
                amount:amount,
                senderId:senderId,
                recieverId:recieverId
            }
        })

         await txs.accounts.update({
            where:{
                user_id:senderId
            },
            data:{
                balance:{decrement:amount}
            }
        })

        await txs.accounts.update({
            where:{
                user_id:recieverId
            },
            data:{
                balance:{increment:amount}
            }
        })

        return {transaction}
    },
        {
        maxWait:5000,
        timeout: 10000
    }

)

    return NextResponse.json({
        message:`Transaction is being made`
    })
}catch(e){
    return NextResponse.json({
        error: `${e}Occured while sending money`
    })
}
}