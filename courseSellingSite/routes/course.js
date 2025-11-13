const { Router } = require('express');
const courseRouter = Router();
const { userAuthMiddleware } = require("../middleware/userAuth");
const { userModel, purchaseModel, courseModel } = require("../db")

//We have added new course route because user route can be furthered break and it amke our code more readeable.
//Purchase course
courseRouter.post('/purchase', userAuthMiddleware, async (req, res) => {
   
    const userId = req.userId;
    console.log(userId)
    const courseId = req.body.courseId;
    try {
        const purchaseResult = await purchaseModel.create({
            userId: userId,
            courseId: courseId
        })

        res.json({
            message: "Successfully baught the course!"
        })
    } catch (err) {
        res.status(400).json({
            message: "Error ouccred while ptuchase the course!"
        })
    }
})

//see all courses
courseRouter.get('/preview', async (req, res) => {
    try{
    const allCourses = await courseModel.find({});
    res.json({
        message: allCourses
    })
    }catch(err){
        res.status.json({
            message: `Error occured in previewing all courses`
        })
    }

})

//We need to export route so that our app entry point can access it.
module.exports = {
    courseRouter: courseRouter
}