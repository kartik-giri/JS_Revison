import {prisma} from "../lib/prisma.js"


const createUser = async ()=>{
   await  prisma.users.create({
    data:{
       userName:"kartikGiriiii",
       email: "kg12121@giiimail.com",
       password: "12121" 
    }
})
}

createUser()