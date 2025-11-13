//A Promise in JavaScript is an object that represents the eventual completion (or failure) of 
// an asynchronous operation and its resulting value. Promises are used to handle asynchronous o
// perations more effectively than traditional callback functions, providing a cleaner and more 
// manageable way to deal with code that executes asynchronously, such as API calls, file I/O, or timers.

function setTimeoutPromisified(ms) {
  let p = new Promise(resolve => setTimeout(resolve, ms)); //This line is creating promise and what's promise promise runs our asyn code in such a way that it either resolves or rejects
  return p; //returning promise which is a object of promise calss.
}

function callback() {
	console.log("3 seconds have passed");
}

// I am passing 3000 to our promise async code and handling the returned promise object.
setTimeoutPromisified(3000).then(callback)

// let returnedPromise = setTimeoutPromisified(3000);
// console.log(returnedPromise);


//Code to create a base of promise.
function waitFor3Sec(resolve){ 
    setTimeout(resolve , 5000)
}

let main = ()=>{
    console.log("HI I am function!!");
}

waitFor3Sec(main)

let randomFunc=()=>{

}
let randomPromise = new Promise(randomFunc);
console.log(randomPromise);


const promiseofSetInterval = (sec)=>{
  return new Promise((resolve, reject)=>{
    return setTimeout(resolve, sec);
  })
}

promiseofSetInterval(1000).then(()=>{
  console.log("It is a set Timeout promise")
})