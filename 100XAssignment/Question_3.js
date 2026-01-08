/*
You’re given an array of user objects, now write a function getActiveUserNames(users) that:
Returns an array of names of users who are active and older than 18.
Example:
Input:
[
  { name: "Rahul", age: 21, isActive: true },
  { name: "Amit", age: 17, isActive: true },
  { name: "Priya", age: 22, isActive: false },
  { name: "Zara", age: 25, isActive: true },
]

Output: ["Rahul", "Zara"]
*/

const getActiveUserName=(users)=>{
    return newArr = users.filter((elem)=>{
        return elem.isActive === true && elem.age>18 
    }).map((elem)=>{
        return elem.name
    })
    
}

const arrObj = [
  { name: "Rahul", age: 21, isActive: true },
  { name: "Amit", age: 17, isActive: true },
  { name: "Priya", age: 22, isActive: false },
  { name: "Zara", age: 25, isActive: true },
]

const arrResult = getActiveUserName(arrObj);
console.log(arrResult)
