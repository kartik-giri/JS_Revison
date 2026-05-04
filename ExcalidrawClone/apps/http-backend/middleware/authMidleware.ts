import {NextFunction, Request, Response} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
export const authMidleware = async(req: Request,res:Response,next: NextFunction)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            res.status(400).json({
                error:`No token.`
            })
            return
        }
        const jwtScret = process.env.JWT_SECRET
        const jwtVerify = jwt.verify(token,jwtScret!)
    }catch(e){
        res.status(400).json({
            error:`${e} in auth middleware`
        })
    }
}

