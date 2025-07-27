class Employee{
    constructor(name, age, salary){
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    // In JavaScript class syntax, you define methods without the function keyword. It's just how the class syntax works — it's designed to be clean and concise.
    //We need to sue this to accces object variables
    readEmployeeData() {
        console.log(this); //This line will print this object mean this value of this object.
        console.log(`HI ${this.name} of ${this.age} your salary is ${this.salary}`);
    }

}

let emplkaju = new Employee("Kartik giri", 22, "75000");
emplkaju.readEmployeeData();


//Date class
let dateObj = new Date();
console.log(dateObj.toISOString())
console.log(dateObj.getDate())
//Map class
let mapObj = new Map();
mapObj.set('name', 'kartik');
mapObj.set('age',  23);
console.log(mapObj.get('name'));
console.log(mapObj.get('age'));
console.log(mapObj);

/*
✅ Map Class in JavaScript
The Map object is a built-in class that stores key-value pairs — like an object, but better in some ways.

🔹 Syntax:
let mapObj = new Map();
You can:

set(key, value) → Add data
get(key) → Get value
delete(key) → Remove entry
has(key) → Check if key exists
size → Get number of items
clear() → Remove all
*/