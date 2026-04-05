import  express, { type NextFunction }  from "express"
import {prisma} from "../lib/prisma.js"
import z from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()

app.use(express.json());

const jwt_secret="IamSecret"


app.post("/sign-up", async(req, res)=>{
    const userInput = z.object({
        userName: z.string().max(100),
        email: z.email().max(100),
        password: z.string().min(8)
    })

    try{
        const parse = userInput.safeParse(req.body);

        if(!parse.success){
            res.status(400).json({
                message:`Error occured while user input zod validation!`
            })
            return
        }

        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password,8);

        await prisma.users.create({
            data:{
                userName:userName,
                email:email,
                password: hashedPassword
            }
        })

        res.json({
            message:`${userName}, thanks for signing up!`
        })

    }catch(e){
        res.json({
            message:`Error occured in sign up`
        })
    }
})


app.post("/sign-in", async (req, res)=>{
    const userInput = z.object({
        userName: z.string().max(100),
        password: z.string().min(8),
    })

    try{
        const parse = userInput.safeParse(req.body);

        if(!parse.success){
            res.status(400).json({
                message:`Error occured in zod validation in sign in.`
            })
            return
        }

        const userName= req.body.userName;
        const password = req.body.password;

        const findUser = await prisma.users.findUnique({
            where:{
                userName: userName
            }
        })

        if(!findUser){
            res.status(400).json({
                message: `Erro occured! ${userName} did not found while signing in.`
            })
            return
        }

        const comapreResult = await bcrypt.compare(password, findUser?.password);

        if(!comapreResult){
            res.json({
                message: `Error occured! ${userName} password is wrong`
            })
            return
        }

        const jwtToken = jwt.sign({id:findUser.id}, jwt_secret);
        res.json({
            message:jwtToken
        })

    }catch(e){
        res.status(400).json({
            message:`Error occured while signing in`
        })
    }
})

const userAuth = async (req: Request ,res : Response, next: NextFunction)=>{
    try{
        const jwtToken = req.headers.authorization;
    }catch(e){
        res.status(400).json({
            message:`User Jwt is wrong`
        })
    }
}

app.post("/todos", async(req,res)=>{
    const todoInput = z.object({
        title: z.string().min(4),
        description: z.string().max(180),
    })

    try{
        const parse = todoInput.safeParse(req.body);

        if(!parse.success){
            res.status(400).json({
                message:`Error occured while todo input zod validation.`
            })
        }

        const 
    }
})

app.listen(3000, ()=>{
    console.log("Server started!!")
})