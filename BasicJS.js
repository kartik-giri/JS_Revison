// Variables
var firstname = "kartik"; //var is function scope should not use
let rollNo = 342; //block s   cope
const age = 22; //block scope const val doesnot update.

console.log(firstname);
console.log(age);
console.log(rollNo);

//Updating variables
rollNo= 23;
console.log(rollNo);

//Array

let rollNumbers = [12,23,34,45,65];
//Loop array values.
console.log("Roll numbers:");
for(values of rollNumbers){
    console.log(values);
}


//Functions
//Normal function decalration.
function sum(a,b){
    return a+b;
}

let sumResult = sum(23,34);
console.log("Sum function result:", sumResult);

sumResult = sum("kartik", "giri"); //Intersting it is concating the string!!!
console.log("sum function result:", sumResult);


//Arrow function
let canvote = (age) =>{
    if(age>18){
        return true;
    }
    else{
        return false;
    }
}

let person_age = 12;
let result = canvote(person_age);
result? console.log("yes person can vote"): console.log("NO, person can not vote");

//Write a function called sum that finds the sum from 1 to a number
let sumfunc = (numInt)=>{
    let sumResult = 0;
    for(let i =1; i<=numInt; i++){
        sumResult = sumResult + i;
    }
    console.log("The sum of 1 to a number:", sumResult);
}

sumfunc(10);

//Write a function that takes a user as an input and greets them with their name and age
let greets= (obj) =>{
    console.log(`Good morning! ${obj.userName} of age ${obj.age}.`)
}

let userObj ={
    userName: "kartik",
    age: 22
}
greets(userObj);

// Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)
let greetsBasisGender= (obj) =>{
    console.log(`Good morning! ${obj.usergender} ${obj.userName} of age ${obj.age}.`)
    if(obj.age>18){
        console.log("Congrats! you can vote.");
    }
    else{
         console.log("Sorr! you can not vote.");
    }
}

let userGenderObj={
    usergender : "Mr",
    userName: "kartik",
    age: 22

}

greetsBasisGender(userGenderObj);

//Write a function that takes an array of numbers as input, and returns a new array with only even values. Read about filter in JS
let EvenOddNumberArr = [1,2,3,4,5,6,7,8,9,10,11,12];

let findEvenOrOdd =(numberArr)=>{
    //The filter() method creates a new array with elements that pass a test.
    //callback returns true to keep the item.

/*
The filter() callback function takes 3 arguments:

array.filter(function(element, index, array) {
  // return true to keep the element
})
🔹 1. element
Current item in the array.

🔹 2. index
Index of the current item.

🔹 3. array
The original array being filtered. 
    */
    let newArr = numberArr.filter(elem => elem % 2 == 0);
    return newArr;
}

let resultFindEvenOrOdd = findEvenOrOdd(EvenOddNumberArr);
console.log(resultFindEvenOrOdd);

//Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old
let usersObjectArray = [
    {
        name:"kartik",
        age: 22
    },
    {
        name:"Ram",
        age: 23
    },
    {
        name:"Shayama",
        age: 12
    },
    {
        name:"Arjuna",
        age: 34
    }, 
]

let find_18AboveUser =(userObjectArray)=>{
    let new18AboveUsers = userObjectArray.filter(elem => elem.age > 18);
    return new18AboveUsers;
}

let resultFind_18AboveUser = find_18AboveUser(usersObjectArray);
console.log(resultFind_18AboveUser);

///Create a function that takes an array of objects as input, and returns the users whose age > 18 and are male
let usersObjectArrayWithGender = [
    {
        name:"kartik",
        age: 22,
        gender : "male"
    },
    {
        name:"Ram",
        age: 23,
        gender : "male"
    },
    {
        name:"Shayama",
        age: 12,
        gender : "male"
    },
    {
        name:"Arjuna",
        age: 34,
        gender : "male"
    }, 
        {
        name:"Shayana",
        age: 22,
        gender : "female"
    },
    {
        name:"kumari",
        age: 34,
        gender : "female"
    }, 
]

let find_18AboveMaleUser =(userObjectArray)=>{ 
    // let new18AboveMaleUsers = userObjectArray.filter(elem => elem.age > 18 && elem.gender == "male");
    let new18AboveMaleUsers = userObjectArray.filter((elem)=>{
        return elem.age > 18 && elem.gender == "male"
    });
    return new18AboveMaleUsers;
}

let resultfind_18AboveMaleUser = find_18AboveMaleUser(usersObjectArrayWithGender);
console.log("Only males above 18:", resultfind_18AboveMaleUser);