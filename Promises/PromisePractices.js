// //Promised version of reading file
const fs = require('fs');

let readFileFunc=(resolve) => {
    fs.readFile("greet.txt", "utf-8", function(err,data){
        resolve(data); //this data will goes down automatically to callabck function which is called inside .then as per promise class implmenation.
    })
}

function readFilePromise(fileFunc){
    let filePromise = new Promise(fileFunc);
    return filePromise;
}

let callBackAfterPromiseDone=(content) =>{
    console.log(content)
}
readFilePromise(readFileFunc).then(callBackAfterPromiseDone); 


//Proimise is a class.
//We can instanitate the pormise object by pasing the function signature which have resolve argument.
//Once async task is complete call the resolve function to get the data means promise is resolved.
//and to get the data call back the function.

let polishedPromise = new Promise((resolve)=>{
        fs.readFile("wish.txt", "utf-8", (err,data)=>{
        resolve(data);
    })
});

polishedPromise.then((data)=>{
    console.log(data)
})


//Promising the settimeout func

let funcTimeout=(sec)=>{
    let timeoutPromise = new Promise((resolve)=>{
    setTimeout(resolve, sec);
})
   return timeoutPromise;
}

let funcTimeoutResult = funcTimeout(3000);

funcTimeoutResult.then(()=>{
    console.log("after 3 seconds")
})



//Promisized version of reading file.
let promisedReadFile = new Promise((resolve)=>{
    fs.readFile("wish.txt", "utf-8", (err,data)=>{
        resolve(data);
    })
})

promisedReadFile.then((data)=>{
    console.log(data);
})

let prmiseResult = new Promise((resolve, reject)=>{
    fs.readFile("a.txt", "utf-8",(err,data)=>{
        if(err){
            reject(err);
        }else{
            resolve(data);
        }
    } )
})

prmiseResult.then((result)=>{
    console.log(result)
})

























