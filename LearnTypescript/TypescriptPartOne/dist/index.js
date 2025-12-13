"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let age = 10;
age = 18;
console.log(age);
//Program -1 Write a function that greets a user given their first name. 
const greeting = (name) => {
    console.log(`Hello ${name}`);
};
greeting("kartik");
//Program -2 Write a function that calculates the sum of two functions
const getSum = (a, b) => {
    return a + b;
};
console.log(getSum(10, 20));
//Program -3 Return true or false based on if a user is 18+
const checkAge = (age) => {
    return (age > 18) ? true : false;
};
console.log(`Is user 18+ ${checkAge(12)}`);
//Program -4 Create a function that takes another function as input, and runs it after 1 second.
//the param type is function which returns void/nothing
const delayCall = (delayFun) => {
    setTimeout(delayFun, 1000);
};
const delayFun = () => {
    console.log(`Runs after 1 sec`);
};
delayCall(delayFun);
