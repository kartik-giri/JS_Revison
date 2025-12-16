interface People {
    userName:string;
    age: number;

    greet: ()=>string
}

//Now create the class object of this interface.

class PeopleGreet implements People{
    userName:string;
    age: number;

    constructor(name:string,age:number){
        this.userName=name;
        this.age=age;
    }

    greet =():string=>{
        return (`Hi ${this.userName} of ${this.age} Good morning`)
    }
}

const userObj = new PeopleGreet("kartik", 23);
const result = userObj.greet();
console.log(result);