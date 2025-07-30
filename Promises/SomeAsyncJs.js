const fs = require("fs"); ///Just importing files like we do in soliditty by import keyword.

//fucntion to read file.
console.log("synchronus I/O tasks");
let fileContant = fs.readFileSync("greet.txt", "utf-8"); //it takes files location and and output format.
console.log(fileContant)



let wishFileContent = fs.readFileSync("wish.txt", "utf-8");
console.log(wishFileContent);

// But what if made the reading of file operation wait some time.

let fileResult =0;

let fileContantAsync = setTimeout(() => {
    fileResult = fs.readFileSync("greet.txt", "utf-8"); 
}, 1000);

console.log(fileResult) //It prints 0 cause it's execution is completed before async function.



//Function as function arguments.

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function doOperation(a, b, op) {
  return op(a, b)
}
console.log(doOperation(1, 2, sum))

//But How to made I/O tasks efficiant in that case we can use js asynchronus nature. But to know that task is done we will use callback functions.

let read=(err,data)=>{
    if(err){
        console.log("Error is", err);
    }else{
        console.log("Returned data is", data);
    }
}

fs.readFile("greet.txt", "utf-8", read);

fs.readFile("wish.txt", "utf-8", read);

console.log("Asynchronus I/O tasks");