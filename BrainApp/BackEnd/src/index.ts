import express  from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { userModel } from "./db.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://kartikgiri1t30_db_user:tmOE0xWOLmKWtM0i@cluster0.ontnrw9.mongodb.net/brainly-DB")

app.post("/api/v1/sign-up", async(req,res)=>{

    const userInput = z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    })

    const parse = userInput.safeParse(req.body);

    if(!parse.success){
        res.status(411).json({
            message:`Error in input`
        })
        return
    }

    const {userName, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,8)

    await userModel.create({
        userName:userName,
        password:hashedPassword
    })

    res.status(200).json({
        message:`${userName} thanks for signing up`
    })

})

app.post("/api/v1/sign-in", async(req,res)=>{

})

app.post("/api/v1/content", async(req,res)=>{

})

app.delete("/api/v1/content", async(req,res)=>{

})

app.get("/api/v1/content", async(req,res)=>{

})

app.post("/api/v1/brain/share", async(req,res)=>{

})

app.get("/api/v1/brain/:shareLink", async(req,res)=>{

})


app.listen(3000, ()=>{
    console.log("Server is listening at port 3000")
})