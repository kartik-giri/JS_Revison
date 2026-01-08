/*
Math Operations
Problem:
Write a function multiplyBy2(num) that returns a promise resolving after 1 second with num * 2.
Task:
Chain multiple calls to multiply a number 5 → 10 → 20 → 40 → print final result.
*/

const multiplyBy2=(num)=>{
    return new Promise((resolve)=>{
        return setTimeout(()=>{
            let mulNum = num*2;
            resolve(mulNum)
        },1000)
    })
}

multiplyBy2(5).then((mul)=>{
    console.log(mul);
    return multiplyBy2(mul);
}).then((mul)=>{
    console.log(mul);
    return multiplyBy2(mul);
}).then((mul)=>{
    console.log(mul);
    return multiplyBy2(mul);
}).then((mul)=>{
    console.log(mul)
})