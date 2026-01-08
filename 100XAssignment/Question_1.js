/*
Question 1
Sequential Steps
Problem:
You have three functions: step1(), step2(), step3(). Each returns a promise that resolves after 1 second with a message "Step X done".
Task:
Use promise chaining to print all steps in order and then "All steps completed".
*/

const promiseFunc = (step)=>{
    return new Promise((resovle)=>{
        return setTimeout(()=>resovle(`Step ${step} done`),1000)
    }) 
}

promiseFunc(1).then((msg)=>{
    console.log(msg);
    return promiseFunc(2);
}).then((msg)=>{
    console.log(msg);
    return promiseFunc(3);
}).then((msg)=>{
    console.log(msg);
    console.log("All steps completed")
})