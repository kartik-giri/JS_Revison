interface User{
    userName:string;
    age:number;
}

const sumOfAge=(userA :User, userB:User ):number=>{
    return (userA.age+userB.age)
}

const userA:User={
    userName: "kartik",
    age:23,
}

const userB:User={
    userName: "John",
    age:33,
}

const result =  sumOfAge(userA,userB);
console.log(`The sum of 2 users age is ${result}`)