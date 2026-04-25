import express from "express";
import {prisma} from "@repo/db";

const app = express();

app.get("/signup", (req,res)=>{
    res.send("Hello World")
    // prisma.user.cre
    
})

app.get("/signin", (req,res)=>{
    res.send("Hello World")
})

app.get("/chat", (req,res)=>{
    res.send("Hello World")
})

app.listen(3001);