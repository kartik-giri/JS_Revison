// We can create array of any primitive type or any complex type like interface or Type

//Program -1 Given an array of positive integers as input, return the maximum value in the array

const findMax = (arr:number[]):number=>{
    return Math.max(...arr);
}

const arrNumb: number[]= [12,23,43,1,3,8,4,342,234,567];

const resultMax = findMax(arrNumb)

console.log(resultMax)



//Program - 2 Given a list of users, filter out the users that are legal (greater than 18 years of age

interface User{
    firstName: string;
	lastName: string;
	age: number;
}

let userArr:User[]=[{
        firstName: "sia",
	    lastName: "ram",
	    age: 23},
    {
        firstName:"john",
        lastName:"cena",
        age:45
    },
    {
        firstName:"roman",
        lastName:"cheemaa",
        age:13
    }
]

const filterUser=(users:User[]):User[]=>{
    const filteruserArr = users.filter((user)=>{
        return user.age>18
    })

    return filteruserArr;
}

const filterUserArr = filterUser(userArr)
console.log(filterUserArr)

