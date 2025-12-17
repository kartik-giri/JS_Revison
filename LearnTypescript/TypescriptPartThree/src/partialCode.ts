//Partial allows us to create all the properties of the type?interface optional.
interface User{
    firstName:string;
    lastName:string;
    age:number;
    address:string;
}

type UserOptional = Partial<User>

const checkAge = (userAge: UserOptional)=>{
    console.log(userAge.age)
}

checkAge({firstName:"kartik",age:23})