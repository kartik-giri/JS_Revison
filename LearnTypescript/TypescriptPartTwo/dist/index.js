"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLegal = (user) => {
    return (user.age > 18 ? true : false);
};
const userKartik = {
    name: "Kartik",
    age: 23,
};
const resultBool = isLegal(userKartik);
if (resultBool === true) {
    console.log(`You are eligible to vote`);
}
else {
    console.log(`You are Not eligible to vote`);
}
