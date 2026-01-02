import type { NextFunction, Request, Response } from "express";
import envParse from "../config.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { ObjectId, ObjectIdQueryTypeCasting } from "mongoose";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const jwtToken = req.headers.authorization;

        if (!jwtToken) {
            res.status(400).json({
                message: `Error occured in auth`
            })
        } else {
            //“ as means Trust me — this value is an object that has all standard JWT fields AND an id property. means intersection”
            //to implement the type checking.
                const verifyJwt = jwt.verify(jwtToken, envParse.JWT_SECRET) as JwtPayload &{id: ObjectIdQueryTypeCasting} ;
                if(!verifyJwt){
                   res.status(400).json({
                    message:`Error occured while verifying jwt`
                   }) 
                }else{
                req.userId = verifyJwt.id;
                next();
                }
        }
    } catch (err) {
        res.status(400).json({
            message: `Error occured in auth middleware`
        })
    }

}