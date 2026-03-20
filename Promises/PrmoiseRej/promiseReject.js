const fs = require("fs");

let readFilePromise = new Promise((resolve, reject)=>{
    fs.readFile("a.txt", "utf-8", (err,data)=>{
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})

readFilePromise.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err)
})


const readFile = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile("a.txt", "utf-8", (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

const fileRead = async()=>{
    try{
        let data = await readFile();
        console.log(data);
    }catch(e){
        console.log(e)
    }
}
fileRead()