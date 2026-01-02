// import dotenv from "dotenv"
// dotenv.config();
// console.log("🔍 DEBUG: JWT_SECRET from process.env =", process.env.JWT_SECRET);
import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { contentModel, userModel } from "./db.js";
import envParse from "./config.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://kartikgiri1t30_db_user:tmOE0xWOLmKWtM0i@cluster0.ontnrw9.mongodb.net/brainly-DB");
app.post("/api/v1/sign-up", async (req, res) => {
    const userInput = z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    });
    try {
        const parse = userInput.safeParse(req.body);
        if (!parse.success) {
            res.status(411).json({
                message: `Error in input while signing up`
            });
            return;
        }
        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        await userModel.create({
            userName: userName,
            password: hashedPassword
        });
        res.status(200).json({
            message: `${userName} thanks for signing up`
        });
    }
    catch (err) {
        res.status(411).json({
            message: `Error occured while user is signing up.`
        });
    }
});
app.post("/api/v1/sign-in", async (req, res) => {
    const userInput = z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    });
    const parse = userInput.safeParse(req.body);
    if (!parse.success) {
        res.status(411).json({
            message: `Error in inout while signing in`
        });
        return;
    }
    const { userName, password } = req.body;
    try {
        const userExist = await userModel.findOne({
            userName: userName,
        });
        if (!userExist) {
            res.status(400).json({
                message: `${userName} does not exist`
            });
        }
        else {
            const validPassword = await bcrypt.compare(password, userExist.password);
            if (!validPassword) {
                res.status(400).json({
                    message: `Password given by user is invalid`
                });
                return;
            }
            else {
                const jwtToken = jwt.sign({ id: userExist._id }, envParse.JWT_SECRET);
                res.status(200).json({
                    message: `${jwtToken}`
                });
            }
        }
    }
    catch (e) {
        res.status(400).json({
            message: `Error while signing in.`
        });
    }
});
// link:{type:String, required:true},
// type:{type:String, enum: contentTypes, required:true},
// title:{type:String, required:true},
// tags:[{type:ObjectId, ref:`tags`}],
// userId:{type:ObjectId, ref:`users`}
app.post("/api/v1/content", authMiddleware, async (req, res) => {
    const contentInput = z.object({
        link: z.string().min(5),
        type: z.enum(["image", "video", "article", "audio"]),
        title: z.string().min(3)
        // tags:
    });
    try {
        const parse = contentInput.safeParse(req.body);
        if (!parse.success) {
            res.status(400).json({
                message: `Error occured while adding content`
            });
            return;
        }
        const { link, type, title, tags } = req.body;
        if (!req.userId) {
            res.status(400).json({
                message: `Error occured while adding content user id is not present`
            });
            return;
        }
        await contentModel.create({
            link: link,
            type: type,
            title: title,
            tags: tags,
            userId: req.userId
        });
        res.status(200).json({
            message: `content is added`
        });
    }
    catch (err) {
        res.status(400).json({
            message: `error while adding content.`
        });
    }
});
app.delete("/api/v1/content", async (req, res) => {
});
app.get("/api/v1/content", async (req, res) => {
});
app.post("/api/v1/brain/share", async (req, res) => {
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
});
app.listen(3000, () => {
    console.log("Server is listening at port 3000");
});
//# sourceMappingURL=index.js.map