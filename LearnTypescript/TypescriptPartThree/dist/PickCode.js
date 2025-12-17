"use strict";
//Pick is used to create new Type from existing type/interface by picking its certain properties.
Object.defineProperty(exports, "__esModule", { value: true });
const checkAge = (userAge) => {
    console.log(userAge.age);
};
checkAge({ firstName: "kartik", age: 23 });
