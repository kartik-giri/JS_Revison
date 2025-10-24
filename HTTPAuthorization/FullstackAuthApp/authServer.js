const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();

let users = [];

const JWT_Secret = "Iamsecret";

app.use(express.json());

app.use(cors({
    domain:["http://127.0.0.1:5500/index.html"]
}))

app.post('/sign-up', (req, res)=>{
    let username = req.body.userName;
    let userPassword = req.body.password;

    users.push({
        username: username,
        userPassword: userPassword
    })

    res.json({
        message: `${username} User succesfully sign-up`
    })
})


app.post('/sign-in', (req, res)=>{
    let username = req.body.userName;
    let userPassword = req.body.password;

    let userFound = users.find((elem)=>{
        return elem.username == username && elem.userPassword == userPassword;
    })

    let userJWT = null;
    if(userFound){
        userJWT = jwt.sign({userName:username}, JWT_Secret);
    }

    if(userFound){
        res.status(200).json({
            message: userJWT
        })
    }else{
        res.status(400).json({
            message:`Eroor 404`
        })
    }
})

const auth = (req,res,next)=>{
    let userToken = req.headers.authorization;

    if(userToken){
        //Asynchronous Version (callback)
        //But in modern time we use sync way of jwt verify with try and catch
        jwt.verify(userToken, JWT_Secret, (err, authData)=>{
            if(err){
                res.status(400).json({
                    message: "Error 400 JWT"
                })
            }else{
                req.userName = authData.userName;
                next()
            }
        })
    }else{
        res.status(400).json({
            message: "error 400!"
        })
    }
}

app.get(`/me`, auth, (req, res)=>{
    let userName = req.userName;

    let userFound = users.find((elem)=>{
        return elem.username == userName;
    })

    if(userFound){
        res.status(200).json({
            userName: userFound.username,
            userPassword: userFound.userPassword
        })
    }else{
        res.status(400).json({
            message: "Error Me"
        })
    }
})

app.listen(3000);