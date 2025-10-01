const express = require('express');

const app = express();

const sumfunc = (num)=>{
    let sum = 0;
    for(let i = 1; i<=num; i++){
        sum = sum +i;
    }
    console.log(sum)
    return sum;
}

app.get("/", (req,res)=>{
    let num = parseInt(req.query.n); //-> converting string into number
    let result = sumfunc(num);
    res.send(result.toString());
})


app.listen(3000);