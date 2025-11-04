const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    userEmail: {type: String, unique: true},
    userPassword: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    adminEmail : {type: String, unique: true},
    adminPassword: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: objectId  //Admin Id cause only admin can create courses
})

//Creating a separate purchase collection (join table) is the better, more scalable approach — especially when you need to store many-to-many relationships.
//That’s a many-to-many relationship.
//If you stored purchasedCourses inside user, then how would you know which users bought a given course efficiently?
const purchaseSchema = new Schema({
    //userId: references the user who purchased the course.
    //courseId: references the course that was purchased.
    userId: {type : objectId, ref: `user`}, 
    courseId: {type: objectId , ref: `course`}
});

//Model name: 'user'
// Collection name: 'users' (Mongoose automatically pluralizes and lowercases the model name)
const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports= {
    userModel:userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}