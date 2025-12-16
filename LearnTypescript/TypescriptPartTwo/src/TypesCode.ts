type User = {
	firstName: string;
	lastName: string;
	age: number
}

type Hacker = {
    firstName:string;
    lastName: string;
    age:number;
    organisation:string
}

//Union-> uses to assign two or more type checks to variable.
const userKartik:User|Hacker={
    firstName:"kartik",
    lastName:"giri",
    age:23,
}

//Intersection-> is used to create the new type which have all properties of tow or more types.
type EthicalHacker = User & Hacker;

const employee:EthicalHacker = {
    firstName:"Bullaaaaa",
    lastName:"shullaaaaaa",
    age:26,
    organisation:"Kaaam tmaam"
}