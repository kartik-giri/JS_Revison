// import dotenv from "dotenv"
// dotenv.config();
// console.log("🔍 DEBUG: JWT_SECRET from process.env =", process.env.JWT_SECRET);
import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { contentModel, linkModel, userModel } from "./db.js";
import envParse from "./config.js"
import { authMiddleware } from "./middleware/authMiddleware.js";
import crypto from "crypto";

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://kartikgiri1t30_db_user:tmOE0xWOLmKWtM0i@cluster0.ontnrw9.mongodb.net/brainly-DB")

const genrateLinkHash = () => {
    return crypto.randomBytes(16).toString("hex");
}

app.post("/api/v1/sign-up", async (req, res) => {

    const userInput = z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    })

    try {
        const parse = userInput.safeParse(req.body);

        if (!parse.success) {
            res.status(411).json({
                message: `Error in input while signing up`
            })
            return
        }

        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8)

        await userModel.create({
            userName: userName,
            password: hashedPassword
        })

        res.status(200).json({
            message: `${userName} thanks for signing up`
        })
    } catch (err) {
        res.status(411).json({
            message: `Error occured while user is signing up.`
        })
    }

})

app.post("/api/v1/sign-in", async (req, res) => {
    const userInput = z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
    })

    const parse = userInput.safeParse(req.body);

    if (!parse.success) {
        res.status(411).json({
            message: `Error in inout while signing in`
        })
        return
    }
    const { userName, password } = req.body;
    try {
        const userExist = await userModel.findOne({
            userName: userName,
        })

        if (!userExist) {
            res.status(400).json({
                message: `${userName} does not exist`
            })
        } else {
            const validPassword = await bcrypt.compare(password, userExist.password);
            if (!validPassword) {
                res.status(400).json({
                    message: `Password given by user is invalid`
                })
                return
            } else {
                const jwtToken = jwt.sign({ id: userExist._id }, envParse.JWT_SECRET);
                res.status(200).json({
                    message: `${jwtToken}`
                })
            }
        }

    } catch (e) {
        res.status(400).json({
            message: `Error while signing in.`
        })
    }
})
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
    })

    try {
        const parse = contentInput.safeParse(req.body);
        if (!parse.success) {
            res.status(400).json({
                message: `Error occured while adding content`
            })
            return
        }

        const { link, type, title, tags } = req.body;
        if (!req.userId) {
            res.status(400).json({
                message: `Error occured while adding content user id is not present`
            })
            return
        }
        await contentModel.create({
            link: link,
            type: type,
            title: title,
            tags: tags,
            userId: new mongoose.Types.ObjectId(req.userId)
        })
        res.status(200).json({
            message: `content is added`
        })
    } catch (err) {
        res.status(400).json({
            message: `error while adding content.`
        })
    }
})

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
    try {
        await contentModel.deleteOne({
            //we need to first verify content id with zod in production.
            _id: new mongoose.Types.ObjectId(req.body.id),
            //Type casting string id to the objectId.
            userId: new mongoose.Types.ObjectId(req.userId),

        })
        res.status(200).json({
            message: `Content delted succesfully`
        })
    } catch (err) {
        res.status(400).json({
            message: `Error occured while deleting content`
        })
    }
})

app.get("/api/v1/content", authMiddleware, async (req, res) => {
    try {
        const contentList = await contentModel.find({
            userId: new mongoose.Types.ObjectId(req.userId),
        }).populate("userId", "userName");

        res.status(200).json({
            message: contentList
        })
    } catch (err) {
        res.status(400).json({
            message: `Error occured while fetching user contents`
        })
    }
})

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
    const shareSchema = z.object({
        share: z.boolean(),
    })

    const parse = shareSchema.safeParse(req.body);

    if (!parse.success) {
        res.status(411).json({
            message: `Error occured in share schema checking`
        })
        return
    }

    try {
        const shareinput = parse.data.share;

        if (shareinput == false) {
            await linkModel.deleteOne({
                userId: new mongoose.Types.ObjectId(req.userId),
            })
        } else {

            const findShareLink = await linkModel.findOne({
                userId: new mongoose.Types.ObjectId(req.userId),
            })

            if (findShareLink) {
                res.status(200).json({
                    link: `http://localhost:3000/api/v1/brain/${findShareLink.hash}`,
                })
            } else {
                const hash = genrateLinkHash();

                await linkModel.create({
                    hash: hash,
                    userId: new mongoose.Types.ObjectId(req.userId)
                })

                res.status(200).json({
                    link: `http://localhost:3000/api/v1/brain/${hash}`,
                })
            }
        }
    } catch (err) {
        res.status(400).json({
            message: `Error occured in genreating brain share link`
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    try{
    const findShareSchema = await linkModel.findOne({
        hash: hash,
    })

    if(findShareSchema){
        const userId = findShareSchema.userId;
        
        if(!userId){
            res.status(411).json({
                message: `Error in finding userId of linkShema`
            })
            return
        }
        const fetchContent = await contentModel.find({
            userId: userId
        }).populate("userId", "userName");

        // const structureContent = fetchContent.map((elem)=>{
        //     return ({
        //         userName: elem.,
        //     })
        // })

        res.status(200).json({
            message: fetchContent
        })

    }else{
         res.status(400).json({
            message: `Error occured in fetching content from shareLink`
        }) 
    }
    }catch(err){
         res.status(400).json({
            message: `Error occured in fetching content from shareLink`
        }) 
    }
})


app.listen(3000, () => {
    console.log("Server is listening at port 3000")
})