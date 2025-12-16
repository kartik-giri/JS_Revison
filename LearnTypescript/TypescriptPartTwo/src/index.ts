interface User{
    name: string,
    age:number,
    address?:Address
}

interface Address {
    city:string,
    state: string,
    pincode: number
}

interface Office {
    address:Address
}

const isLegal=(user:User):boolean=>{
    return (user.age>18?true:false);
}

const userKartik : User={
    name:"Kartik",
    age:23,
}

const resultBool = isLegal(userKartik);

if(resultBool === true){
    console.log(`You are eligible to vote`);
}else{
    console.log(`You are Not eligible to vote`)
}