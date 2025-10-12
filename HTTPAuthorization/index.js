const express = require('express');

const app = express()

const users = [];

const generateToken=()=> {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)]; //0->32 find any number and than floor it mean round up.
    }
    return token;
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

  const userFound = users.find((elem)=>{
    return elem.username === userName && elem.userpassword === userPassword;
  })
  console.log("Sign in user:", userFound)

  if(userFound){
    const token = generateToken();
    userFound.token = token;
    console.log(userFound);
  }


  if(userFound){ 
  res.json({
    message: `You are signed in and your token is ${userFound.token}.`,
    token: `${userFound.token}`
  })}else{
    res.status(400).json({
        message: `Sorry you can't sign in, wrong credentials!`
        
    })
  }


})

app.get("/me", (req, res)=>{
    let userToken = req.headers.authorization;
    let userFound = users.find((elem)=>{
        return elem.token == userToken;
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


app.listen(3001);