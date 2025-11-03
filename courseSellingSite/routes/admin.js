const { Router } = require('express');
const adminRouter = Router();
const { adminAuthMiddleware } = require("../middleware/adminAuth")
const { adminModel, courseModel } = require("../db")
const { z } = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { admin_secret } = require("../config");


adminRouter.post('/sign-up', async (req, res) => {
    const adminInput = z.object({
        adminEmail: z.string().min(5).max(40).email(),
        adminPassword: z.string().min(6),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(2).max(50)
    })

    try {
        const parse = adminInput.safeParse(req.body);

        if (!parse.success) {
            res.status(400).json({
                message: `Admin input is not correct`
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.adminPassword, 8);
        const adminEmail = req.body.adminEmail;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const createResult = await adminModel.create({
            adminEmail: adminEmail,
            adminPassword: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            message: `${firstName} admin is signed up!`
        })
    } catch (err) {
        res.status(400).json({
            message: `Error in admin signing up`,
            Error: err.message
        })
    }
})

adminRouter.post('/sign-in', async (req, res) => {
    const adminPassword = req.body.adminPassword;
    const adminEmail = req.body.adminEmail;

    const findAdmin = await adminModel.findOne({
        adminEmail: adminEmail
    })
    if (!findAdmin) {
        res.status(400).json({
            message: `${adminEmail} admin is not found`
        })
        return
    }

    const compareResult = await bcrypt.compare(adminPassword, findAdmin.adminPassword);

    if (!compareResult) {
        res.status(400).json({
            message: `${adminEmail} admin password is wrong`
        })
        return
    }

    try {
        const jwtToken = jwt.sign({ id: findAdmin._id }, admin_secret);
        res.json({
            message: `${jwtToken}`
        })
    } catch (err) {
        res.status(400).json({
            message: "Error at user signing in admin!"
        })
    } 1
})

//create course
adminRouter.post('/course', adminAuthMiddleware, async (req, res) => {
    const courseInput = z.object({
        title: z.string().min(3).max(300),
        description: z.string().min(80).max(1200),
        price: z.string().min(10).max(100000),
        image: z.string(),
    })

    try {
        const success = courseInput.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                message: `Course input is not valid!`
            })
            return
        }

        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const image = req.body.image;
        const adminId = req.adminId;

        const courseCreated = await courseModel.create({
            title: title,
            description: description,
            price: price,
            image: image,
            creatorId: adminId
        })

        if (!courseCreated) {
            res.status(400).json({
                message: `Error happened while create course entry`
            })
            return
        }
        res.json({
            message: `Course is successfully created`,
            courseId: courseCreated._id
        })
    } catch (err) {
        res.status(400).json({
            message: `Erro occured in creating course`
        })
    }
})

//add course content
adminRouter.put('/course', adminAuthMiddleware, async (req, res) => {


    const courseInput = z.object({
        title: z.string().min(3).max(300),
        description: z.string().min(80).max(1200),
        price: z.string().min(10).max(100000),
        image: z.string(),
    })

    const success = courseInput.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: `Course input is not valid!`
        })
        return
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const adminId = req.adminId;
    const courseid = req.body.courseId;
    try {
        const updatecourse = await courseModel.findByIdAndUpdate(
            courseid, {
            title: title,
            description: description,
            price: price,
            image: image,
            creatorId: adminId,
        }
        )

        if (!updatecourse) {
            res.status(400).json({
                message: `Error course is not found!`
            })
        }

        res.json({
            message: `Course is updated successfully!`
        })
    } catch (err) {
        res.status(400).json({
            message: `Error occured while updating course!`
        })
    }

})

//get all courses
adminRouter.get('/course/bulk', async (req, res) => {
    const adminId = req.adminId;
    try {
        const allCourses = await courseModel.find({
            creatorId: adminId
        })
        res.json({
            message: allCourses
        })
    }catch (err) {
        res.status(400).json({
            message: `Error occured while showing all courses created by admin!`
        })
    }
})

//delete course
adminRouter.delete('/course', async (req, res) => {
    const courseId = req.body.courseId;
    try{
        const deleteCourse = await courseModel.deleteOne({
            _id: courseId
        })
        res.json({
            message:`Course delted successfully!`
        })
    }catch(err){
        res.status.json({
            message:`Error ocurred while deleting course.`
        })
    }
})

//We need to export route so that our app entry point can access it.
module.exports = {
    adminRouter: adminRouter
}

/*

{
   "adminEmail":"admivbngiri@gmail.com",
   "adminPassword": "site121G//G",
   "firstName":"Neeraj",
   "lastName":"giri"
    

}



{
   "title":"Learn java from scratch",
   "description": "Best course for c++",
   "price":"100",
   "image":"httpjdcbjdbcjdbcjdbcdbjcbjd",
    "courseId": "6908da67417ff5eabb8790ce"

}
*/
