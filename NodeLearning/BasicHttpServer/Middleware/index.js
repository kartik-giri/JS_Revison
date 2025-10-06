const express = require('express');

const app = express()
//create a middle ware which will check the age before lettign user buy the ticket.

const checkAgeMiddleware =(req, res, next)=>{
if(req.query.age>14){
    next();
}else{
    res.json({
        Result: "sorry you can't buy the ride ticket!"
    })
}
}

app.use(checkAgeMiddleware); //using this all the below middlewares can use this middleware.

app.get('/ride1', (req, res) => {
    // throw new error();
  res.send('Great! you can buy the ticket for ride 1!')
})

app.get('/ride2', (req, res) => {
  res.send('Great! you can buy the ticket for ride 2!')
})

//error middleware

const errMiddleware = (err,req,res,next)=>{
res.status(400).send({
    error: "there is error"
})
}
app.use(errMiddleware);

app.listen(3000)


//Middleware 
//Express app is series of middlewares.
//middle ware is the function which have access to re res objects and the next middle ware res req cycle.