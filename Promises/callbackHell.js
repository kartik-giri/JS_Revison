//A callback is just a function passed as an argument to another function, usually for asynchronous code.

setTimeout(()=>{
    console.log("Runs after 1 sec!");
    setTimeout(()=>{
        console.log("Runs after 3 seconds!");
        setTimeout(()=>{
            console.log("Runs after 5 seconds!");
        }, 5000)
    },3000)
}, 1000)

//Solving using promises

let promisedTimeout = (sec)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, sec); //You're calling resolve() immediately, not passing it as a function to be executed after the delay.
    })
}

promisedTimeout(1000).then(()=>{
    console.log("After 1 sec");
    
    promisedTimeout(3000).then(()=>{
        console.log("After 3 sec");
       
        promisedTimeout(5000).then(()=>{
            console.log("After 5 sec");
        })
    })
})

//Promise chaining to make it more readable.

promisedTimeout(1000).then(()=>{
    console.log("Runs after 1 sec");
    return promisedTimeout(3000)
}).then(()=>{
    console.log("Runs after 3 sec")
    return promisedTimeout(5000)
}).then(()=>{
    console.log("Runs after 5 sec")
})

setTimeout(()=>{
console.log("After 1 sec");
setTimeout(()=>{
    console.log("After 2 sec");
    setTimeout(()=>{
        console.log("Called after 4 sec")
    }, 4000)
}, 2000)
},1000)


const pAsync =(ms)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,ms)
    })
}

pAsync(1000).then(()=>{
    console.log("This callback will run when resolve function will run!")
})