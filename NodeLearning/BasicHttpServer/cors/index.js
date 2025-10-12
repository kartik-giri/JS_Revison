const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); //express.json()-> returns a functions which is passed as argument. And it parses the json to javascript object.

app.use(cors({
    domain:["http://127.0.0.1:5500/index.html"]
}))//By using this middle ware we can allow certain end points to access our http server from fetch requests.

let count =0;

const reqIncrementMiddleWare = (req,res,next)=>{
 count +=1;
 console.log(`Total requests are = ${count}`);
 next();
}

const loggerMiddleware = (req,res,next)=>{
    console.log(`Method name = ${req.method}`)
    console.log(`Host is  = ${req.hostname}`)
    console.log(`Route is = ${req.url}`)
    console.log(`Time stamp req is called = ${new Date()}`)
    next();
}
//Route speific middleware.
app.get("/admin", loggerMiddleware, function(req, res) {
res.json({
    result : `Total request are = ${count}`
})
});

app.use(reqIncrementMiddleWare, loggerMiddleware);

app.post("/sum", function(req, res) {
let a = parseInt(req.body.a);
let b = parseInt(req.body.b);
let result = a+b;
res.json({result});
});

app.post("/sub", function(req, res) {
let a = parseInt(req.body.a);
let b = parseInt(req.body.b);
let result = a-b;
res.json({result});
});

app.post("/mul", function(req, res) {
let a = parseInt(req.body.a);
let b = parseInt(req.body.b);
let result = a*b;
res.json({result});
});

app.post("/div", function(req, res) {
let a = parseInt(req.body.a);
let b = parseInt(req.body.b);
let result = a/b;
res.json({result});
});

app.listen(3001);