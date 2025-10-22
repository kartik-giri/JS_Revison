const express = require('express');
const jwt = require("jsonwebtoken");

const app = express()

const jwt_secret = "yoItisSecret!";
const users = [];

const auth = (req,res,next)=>{
 let token = req.headers.authorization;

 if(token){
    jwt.verify(token,jwt_secret, (err,decodeData)=>{
        if(err){
            res.status(400).json({
                message: "Users is not sign-in"
            })
        }
        else{
            req.userName = decodeData;
        }
    })
 }else{
     res.status(400).json({
                message: "Users is not sign-in"
            })
 }
next();

}

app.use(express.json());


app.post('/sign-up', (req, res) => {
    
    users.push({
    username : req.body.userName,
    userpassword : req.body.password
    })
    console.log(users);
    res.json({
        message: "You are signed up"
    })
})


app.post('/sign-in', (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.password;

  //.find() is an Array method in JavaScript that returns the first element in an array that satisfies the provided condition (callback function).
  const userFound = users.find((elem)=>{
    return elem.username === userName && elem.userpassword === userPassword;
  })
  console.log("Sign in user:", userFound)
  
  let token = null;
  if(userFound){
    token = jwt.sign({
        user: userFound.username
    }, jwt_secret);
    console.log(userFound);
  }


  if(userFound){ 
  res.json({
    message: `You are signed in and your token is ${token}.`,
    token: `${token}`
  })}else{
    res.status(400).json({
        message: `Sorry you can't sign in, wrong credentials!`
        
    })
  }


})

app.get("/me", auth, (req, res)=>{
    let usersign = req.userName.user;

    let userFound = users.find((elem)=>{
        return elem.username == usersign;
    })
    // console.log(userFound)
    if(userFound){
        res.status(200).json({
            userName: userFound.username,
            userPassword: userFound.userpassword
        })}else{
            res.status(400).json({
                message: "You are not user!"
            })
        }
})


app.listen(3003);