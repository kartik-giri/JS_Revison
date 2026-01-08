import mongoose from "mongoose";
import { required } from "zod/mini";

const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

const contentTypes = ["image", "video", "article", "audio"];

const userSchema = new Schema({
    userName: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const contentSchema = new Schema({
    link:{type:String, required:true},
    type:{type:String, enum: contentTypes, required:true},
    title:{type:String, required:true},
    tags:[{type:ObjectId, ref:`tags`}],
    userId:{type:ObjectId, ref:`users`}
})

const tagSchema = new Schema({
    title:{type:String, required:true, unique:true}
})


const linkSchema = new Schema({
    hash:{type:String, required:true},
    userId:{type:ObjectId, ref:`users`, unique:true}
})

export const userModel = mongoose.model(`users`, userSchema);
export const contentModel = mongoose.model(`contents`, contentSchema);
export const tagModel = mongoose.model(`tags`, tagSchema);
export const linkModel = mongoose.model(`links`, linkSchema);


