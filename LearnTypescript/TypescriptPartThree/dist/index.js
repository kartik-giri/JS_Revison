"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sumOfAge = (userA, userB) => {
    return (userA.age + userB.age);
};
const userA = {
    userName: "kartik",
    age: 23,
};
const userB = {
    userName: "John",
    age: 33,
};
const result = sumOfAge(userA, userB);
console.log(`The sum of 2 users age is ${result}`);
