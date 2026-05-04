import express from "express";
import {signupScheema, signinScheema} from "../lib/zod";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";


const app = express();

const jwtSecret = "IamSecretJWT"
app.use(express.json())

app.post("/signup", async(req,res)=>{
    const result = signupScheema.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            error:`User input is incorrect while signing up!`,
            
        })
        return
    }

    const {username, email, password} = req.body();
    const hashedPassword = await bcrypt.hash(password,8);

    try{
        await prisma.users.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword
            }
        })

        res.status(200).json({
            message:`${username} Thanks for signing up`
        })
    }catch(e){
        res.status(400).json({
            error: `${e}Error occured while signing up`
        })
    }
})

app.post("/signin", async(req,res)=>{
    const result = signinScheema.safeParse(req.body);
    if(!result.success){
         res.status(400).json({
            error:`User input is incorrect while signing in!`,
            
        })
        return
    }

    const {email, password} = req.body();
    try{
        const user = await prisma.users.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            res.status(400).json({
            error:`NO user exist with this email`,
            
        })
             return
        }
        const checkPassord = bcrypt.compare(password, user.password)

        if(!checkPassord){
            res.json({
                error: `User passowrd doesn't match!`
            })
            return
        }
        const jwtToken = jwt.sign({id:user.id},jwtSecret);
        res.status(200).json({
            message:jwtToken;
        })
    }catch(e){
                res.status(400).json({
            error: `${e}Error occured while signing in`
        })
    }
})

app.post("roomId", async(req,res)=>{

})

app.listen(3005, ()=>{
    console.log("Http server listening on port 3005 ")
})