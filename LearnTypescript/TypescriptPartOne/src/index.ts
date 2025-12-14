let age: number = 10;
age = 18;

console.log(age);

//Program -1 Write a function that greets a user given their first name. 

const greeting = (name:string)=>{
    console.log(`Hello ${name}`)
}

greeting("kartik");

//Program -2 Write a function that calculates the sum of two functions
const getSum = (a:number, b:number) : number=>{
    return a+b;
}

console.log(getSum(10,20));

//Program -3 Return true or false based on if a user is 18+

const checkAge=(age:number):boolean=>{
    return (age>18)?true:false 
}

console.log(`Is user 18+ ${checkAge(12)}`)

//Program -4 Create a function that takes another function as input, and runs it after 1 second.
//the param type is function which returns void/nothing
const delayCall=( delayFun: ()=>void)=>{
    setTimeout(delayFun,1000);
}

const delayFun = ()=>{
    console.log(`Runs after 1 sec`);
}

delayCall(delayFun);


//Interface

//Program -1 Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

interface userType  {
    userName: string,
    age: number
}

const isLegal = (userObj: userType):boolean=>{
    return (userObj.age>18?true:false)
}

const userObj:userType = {
    userName:"kartik",
    age:23
}
console.log(`Interface asign type to object to check if user is +18 ${isLegal(userObj)}`);


//Types
//Very similar to interfaces , types let you aggregate data together.

//Union

type numberOrString = number | string;

const sum = (a: numberOrString, b: numberOrString): numberOrString=>{
    /*
    Problem:
    + behaves differently based on runtime types
    TypeScript cannot guarantee what will happen
    Thats why ts block a+b 
    */
    return (a)
}


/*
Intersection
What if you want to create a type that has every property of multiple types/ interfaces
*/
type Employee = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software developer"
};
