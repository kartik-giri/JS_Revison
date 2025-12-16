"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    userName;
    age;
    constructor(userName, age) {
        this.userName = userName;
        this.age = age;
    }
    getInfo = () => {
        console.log(`User Name is ${this.userName} and Age is ${this.age}`);
    };
}
class Manager extends Person {
    constructor(userName, age) {
        super(userName, age);
    }
    isLegal = () => {
        return (this.age > 18 ? true : false);
    };
}
const userObj = new Manager("kartik", 23);
userObj.getInfo();
const result = userObj.isLegal();
if (result === true) {
    console.log(`You are eligible to vote`);
}
else {
    console.log(`You are Not eligible to vote`);
}
