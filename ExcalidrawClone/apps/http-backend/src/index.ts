console.log("DB URL:", process.env.DATABASE_URL)
import express from "express";
import { signupScheema, signinScheema } from "@repo/zodpackage";
import bcrypt from "bcrypt";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
import { authMidleware } from "../middleware/authMidleware"
import { error } from "node:console";

const app = express();

const jwtSecret = process.env.JWT_SECRET
app.use(express.json())

app.post("/signup", async (req, res) => {
    const result = signupScheema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: `User input is incorrect while signing up!`,

        })
        return
    }

    const { username, email, password, avatar } = req.body
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                avatar: avatar
            }
        })

        res.status(200).json({
            message: `${username} Thanks for signing up`
        })
    } catch (e) {
        console.error(e)  // log full error to terminal, not just string interpolation
        res.status(400).json({
            error: e instanceof Error ? e.message : String(e)  // ✅ sends full message
        })
    }
})

app.post("/signin", async (req, res) => {
    const result = signinScheema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: `User input is incorrect while signing in!`,

        })
        return
    }

    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            res.status(400).json({
                error: `NO user exist with this email`,

            })
            return
        }
        const checkPassord = await bcrypt.compare(password, user.password)

        if (!checkPassord) {
            res.json({
                error: `User passowrd doesn't match!`
            })
            return
        }
        const jwtToken = jwt.sign({ id: user.id }, jwtSecret!);
        res.status(200).json({
            message: jwtToken
        })
    } catch (e) {
        res.status(400).json({
            error: `${e}Error occured while signing in`
        })
    }
})

app.post("/room", authMidleware, async (req, res) => {
    const adminId = req.userId;
    const { slug } = req.body;
    if (!adminId) {
        res.status(400).json({
            error: `Admin Id not found while creating room`
        })
        return
    }
    try {
        await prisma.rooms.create({
            data: {
                slug: slug,
                adminId: adminId
            }
        })

        res.status(200).json({
            message: `${slug} room is being created.`
        })
    } catch (e) {
        res.status(400).json({
            error: `Error while creating room`
        })
    }
})

app.get("/room", authMidleware, async (req, res) => {
    const slug = req.query.slug as string
    if (!slug) {
        res.status(400).json({
            error: `Slug not found while getting room`
        })
        return
    }
    try {
        const room = await prisma.rooms.findUnique({
            where: {
                slug: slug
            }
        })
        if (!room) {
            res.status(400).json({
                error: `No room found matching.`
            })
            return
        }

        res.status(200).json({
            message: room
        })
    } catch (e) {
        res.status(400).json({
            error: `${e} Occured while gettign certain room`
        })
    }
})

app.get("/chat", async (req, res) => {
    const roomId = Number(req.query.roomid);
    if (!roomId) {
        res.status(400).json({
            error: `Room Id isnot present in query.`
        })
        return
    }

    try {
        const chats = await prisma.chats.findMany({
            where: {
                roomId: roomId
            },
            orderBy:{
                id:"desc"
            },
            take:50 //desc and take combine gives 50 entries starting from end. to get latest 50 entries
        })
        res.status(200).json({
            message: chats
        })
    } catch (e) {
        res.status(400).json({
            error: `${e} while gettign chats`
        })
    }
})


app.listen(3005, () => {
    console.log("Http server listening on port 3005 ")
})