const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = mongoose.ObjectId;

const usersSchema = new Schema({
    email: {type:String, unique: true},
    password: String,
    username: String
})

const todosSchema = new Schema({
    title: String,
    description: String,
    id: ObjectId
})


//Create model linking schema with collection.

const userModel = mongoose.model("users",usersSchema);
const todosModel = mongoose.model("todos", todosSchema);

module.exports = {
    userModel:userModel,
    todosModel:todosModel
}
