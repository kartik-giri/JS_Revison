"use strict";
//1. In Vanderkam's Effective TypeScript, he advises us to think of types as set of values
//2. For example, the type number is simply the set of all numbers (an infinite set)
//3. The same apply for "composite"1 types created with the keywords interface and type
//4. TypeScript's types are open (and not sealed like in some other programming languages)
Object.defineProperty(exports, "__esModule", { value: true });
//Union-> in maths The union of sets combines all unique elements from two or more sets into a single new set
//Which means in all subset of types will be unique.
/* --> this will be unique
    firstName:"kartik",
    lastName:"giri",
    age:23,
*/
/*-->this will be unique too
 organisation:"bdjcbdj"
*/
/* --> this will be unique also
    firstName:"kartik",
    lastName:"giri",
    age:23,
    organisation:"bdjcbdj"
*/
const userKartik = {
    firstName: "kartik",
    lastName: "giri",
    age: 23,
    organisation: "bdjcbdj"
};
const employee = {
    firstName: "Bullaaaaa",
    lastName: "shullaaaaaa",
    age: 26,
    organisation: "Kaaam tmaam"
};
