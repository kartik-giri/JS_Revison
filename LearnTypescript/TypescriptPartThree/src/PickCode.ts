//Pick is used to create new Type from existing type/interface by picking its certain properties.

interface User{
    firstName:string;
    lastName:string;
    age:number;
    address:string;
}

type UserAge =  Pick<User, `firstName`|`age`>

const checkAge = (userAge: UserAge)=>{
    console.log(userAge.age)
}

checkAge({firstName:"kartik",age:23})