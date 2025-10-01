const express = require('express');

const app = express();

app.use(express.json()); //To get body json for post request.

//Database demo data
let users=[{
    userName: "john",
    kidenies:[{
        healthy:false
    }]
}]

//Query params are used to get input from users in get method
app.get("/", (req,res)=>{
let userKidneis = users[0].kidenies;
let kideniesNum = userKidneis.length; //how many kidnies
let healthyKidnies = userKidneis.filter((elem)=>elem.healthy!=false).length;
let UnhealthyKidnies = userKidneis.filter((elem)=>elem.healthy==false ).length;

res.json({
    kideniesNum,
    healthyKidnies,
    UnhealthyKidnies
})
})


//POST - User can add a new kidney
//To get data from user in post method Body is used.
app.post('/', (req,res)=>{
    let inputKidney = req.body.isHealthy;
    let userKidneis = users[0].kidenies;
    userKidneis.push({healthy:inputKidney});
    let TotalUserKidney = userKidneis.length;

    res.json({
        inputKidney,
        TotalUserKidney
    })
})

//PUT - User can replace a kidney, make it healthy

app.put('/', (req,res)=>{
      let userKidneis = users[0].kidenies;
      userKidneis.forEach((i)=>i.healthy=true );
      res.json({
        response:"Its done"
      })
})

//DELETE - User can remove a kidney
app.delete('/',(req,res)=>{
    let userKidneis = users[0].kidenies;
    let newKidneyArr = userKidneis.filter((elem)=>elem.healthy!=false);
    users[0].kidenies = newKidneyArr;
    res.json({
        response:"Its done" 
    })
})


app.listen(3000);