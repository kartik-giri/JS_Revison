abstract class Person{
    userName:string;
    age:number;

    constructor(userName:string, age:number){
        this.userName= userName;
        this.age= age;
    }

    abstract isLegal:()=>boolean;

    getInfo=():void=>{
        console.log(`User Name is ${this.userName} and Age is ${this.age}`)
    }
}

class Manager extends Person{
    constructor(userName:string, age:number){
        super(userName,age);
    }

    isLegal =():boolean=>{
        return(this.age>18?true:false);
    }
}

const userObj = new Manager("kartik", 23);
userObj.getInfo();
const result = userObj.isLegal();
if(result === true){
    console.log(`You are eligible to vote`);
}else{
    console.log(`You are Not eligible to vote`)
}