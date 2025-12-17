"use strict";
// We can create array of any primitive type or any complex type like interface or Type
Object.defineProperty(exports, "__esModule", { value: true });
//Program -1 Given an array of positive integers as input, return the maximum value in the array
const findMax = (arr) => {
    return Math.max(...arr);
};
const arrNumb = [12, 23, 43, 1, 3, 8, 4, 342, 234, 567];
const resultMax = findMax(arrNumb);
console.log(resultMax);
let userArr = [{
        firstName: "sia",
        lastName: "ram",
        age: 23
    },
    {
        firstName: "john",
        lastName: "cena",
        age: 45
    },
    {
        firstName: "roman",
        lastName: "cheemaa",
        age: 13
    }
];
const filterUser = (users) => {
    const filteruserArr = users.filter((user) => {
        return user.age > 18;
    });
    return filteruserArr;
};
const filterUserArr = filterUser(userArr);
console.log(filterUserArr);
