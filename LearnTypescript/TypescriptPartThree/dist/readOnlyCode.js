"use strict";
//As we know we can mutate the value of keys even though they are constants to solve this we can make the interface/Type property readonly.
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: "kartik",
    age: 23
};
//Readonly<Interface/type Name> -> this syntax is also fine
// user.age=23;//We can't change now readonly properties
