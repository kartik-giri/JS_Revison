const { Router } = require('express');
const userRouter = Router();
const { userAuthMiddleware } = require("../middleware/userAuth")
const { userModel, purchaseModel } = require("../db")
const { z } = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user_secret } = require("../config");
const userAuth = require('../middleware/userAuth');


userRouter.post('/sign-up', async (req, res) => {
    const userInput = z.object({
        userEmail: z.string().min(5).max(40).email(),
        userPassword: z.string().min(6),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(2).max(50)
    })

    try {
        const parsed = userInput.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({
                message: `User input is not correct`
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.userPassword, 8);
        console.log(hashedPassword);
        const userEmail = req.body.userEmail;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        
        const createResult = await userModel.create({
            userEmail: userEmail,
            userPassword: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        console.log(createResult)
        if(!createResult){
            res.status(400).json({
                message:`Error occured in creating user sign-up entry!`
            })
            return
        }

        res.json({
            message: `${firstName} is signed up!`
        })
    } catch (err) {
        res.status(400).json({
            message: `Error in user signing up`,
            error: err.message
        })
    }

})

userRouter.post('/sign-in', async (req, res) => {
    const userPassword = req.body.userPassword;
    const userEmail = req.body.userEmail;

    const findUser = await userModel.findOne({
        userEmail: userEmail
    })
    if (!findUser) {
        res.status(400).json({
            message: `${userEmail} user is not found`
        })
        return
    }

    const compareResult = await bcrypt.compare(userPassword, findUser.userPassword);

    if (!compareResult) {
        res.status(400).json({
            message: `${userEmail} user password is wrong`
        })
        return
    }

    try {
        const jwtToken = jwt.sign({ id: findUser._id }, user_secret);
        res.json({
            message: `${jwtToken}`
        })
    } catch (err) {
        res.status(400).json({
            message: "Error at user signing in!"
        })
    }
})

//get all puchase course
userRouter.get('/purchases', userAuthMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const courseList = await purchaseModel.find({
            userId: userId
        })

        res.json({
            message: courseList
        })
    }
    catch (err) {
        res.status(400).json({
            message: `Error occred in user getting all its purchase courses`
        })
    }
})

//We need to export route so that our app entry point can access it.
module.exports = {
    userRouter: userRouter
}

/*
{
   "userEmail":"kartikgiri@gmail.com",
   "userPassword": "site121G//G",
   "firstName":"kartik",
   "lastName":"giri"
    

}
*/