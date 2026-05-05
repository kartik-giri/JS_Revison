import type {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken";
import  type { JwtPayload } from "jsonwebtoken"

export const authMidleware = async(req:Request,res:Response,next: NextFunction)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            res.status(400).json({
                error:`No token.`
            })
            return
        }
        const jwtScret = process.env.JWT_SECRET
        //At jwt signing we can wither sign string or object liek {id:"jdjbc"} so that's why at verfying it will return jwtpayload cause we signed payload
        const jwtVerify = jwt.verify(token,jwtScret!) as JwtPayload //typecasting jwtverify as jwtpayload obj
        if(!jwtVerify){
             res.status(400).json({
                error:`Wrong JWT token`
            })
            return
        }
        const userid = jwtVerify.id;
        req.userId = userid;
        next()
    }catch(e){
         res.status(400).json({
            error:`${e} in auth middleware`
        })
    }
}

