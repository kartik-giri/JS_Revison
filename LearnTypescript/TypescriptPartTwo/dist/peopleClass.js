"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Now create the class object of this interface.
class PeopleGreet {
    userName;
    age;
    constructor(name, age) {
        this.userName = name;
        this.age = age;
    }
    greet = () => {
        return (`Hi ${this.userName} of ${this.age} Good morning`);
    };
}
const userObj = new PeopleGreet("kartik", 23);
const result = userObj.greet();
console.log(result);
