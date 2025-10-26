const express = require("express");
const { userModel, todosModel } = require("./DB");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const {z} = require('zod');

/*
Under the hood:
Mongoose queues up all model operations (like .find(), .create(), etc.)
and runs them only after the database connection is successfully opened.
So your app doesn’t crash — Mongoose simply buffers those operations until connected.
*/

//Best way is to handle the returned promise. it is working because it is buffering and queing all mongoose calls and calling them when connection is established.
mongoose.connect(
  "mongodb+srv://kartikgiri1t30_db_user:tmOE0xWOLmKWtM0i@cluster0.ontnrw9.mongodb.net/Todo-App-DB"
);
const app = express();

app.use(express.json());

const jwtSecret = "IamSecret";

app.post("/sign-up", async (req, res) => {
  const requireBody = z.object({
    userEmail: z.string().min(3).max(30).email(),
    userName: z.string().min(3).max(30),
    userPassword: z.string().min(3).max(30)
  })

  //Check if the user input passes the schema checks.
  const {success} = requireBody.safeParse(req.body);

  if(!success){
    res.status(400).json({
      message: "Incorect format"
    })
    return;
  }

  const userEmail = req.body.userEmail;
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  try {
    const hashPassword = await bcrypt.hash(userPassword,10);

    await userModel.create({
      email: userEmail,
      password: hashPassword,
      username: userName,
    });

    res.status(200).json({
      message: `${userName} You are sign up!`,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error occured while creating new sign-up entry.",
    });
  }
});

app.post("/log-in", async (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const findUser = await userModel.findOne({
    email: userEmail,
  });

  console.log(findUser);

  if(!findUser){
    res.status(400).json({
      message: "User is not signed up!",
    });
    return;
  }
  
  //Crucial to check if given password matches with the DB hashed password.
  //salt+password is hashed to get unique hash.
  //salt is added in front of gnerated hash.
  //So that we can get the salt. And hash the password and salt together to get the hash and see if it matches the stored hash.
  const matchPassword = await bcrypt.compare(userPassword, findUser.password);

  if (matchPassword) {
    let token = null;
    token = jwt.sign({ id: findUser._id }, jwtSecret); //._id is unique idetifer given to every document by mongoDB
    res.json({
      jwtToken: token,
    });
  } else {
    res.status(400).json({
      message: "User is not signed up!",
    });
  }
});

//Auth middleware
//The server doesn’t care about restarts, because no session state is stored in memory.
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({
      message: "Token is not specified!",
    });
  }
  try {
    let jwtData = jwt.verify(token, jwtSecret);
    let userId = jwtData.id;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(400).json({
      message: `Error occured in auth middleware!`,
    });
  }
};

app.post("/todo", auth, async (req, res) => {
  let userId = req.userId;

  const todoTitle = req.body.todoTitle;
  const todoDescription = req.body.todoDescription;

  try {
    await todosModel.create({
      title: todoTitle,
      description: todoDescription,
      id: userId,
    });

    res.status(200).json({
      message: `${todoTitle} Todo is added`,
    });
  } catch (err) {
    res.status(200).json({
      message: `Error occured in todo post request`,
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  let userid = req.userId;

  try {
    const userTodos = await todosModel.find({
      id: userid,
    });

    if (userTodos) {
      res.status(200).json({
        message: userTodos,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: `Error occured in todos get request.`,
    });
  }
});

app.listen(3000);

/*
{
    "userEmail": "John@gmail.com",
    "userName":"john", 
    "userPassword":"xxx12121"
    

}

{
    "todoTitle": "Gym",
    "todoDescription":"Go to gym"
    

}
*/
