//Switch case sstatment is the statement which runs particular block of code if certain condition met.

const role = "admin";

switch (role) {
    case "user":
        console.log("User have limited acess");
        break;

    case "admin":
        console.log("User have admin acess");
        break;

    case "Founder":
        console.log("User have all acess");
        break;

    default:
        console.log("NO content")

}

const findAccess = (role)=>{
    switch (role) {
    case "user":
        console.log("User have limited acess");
        break;

    case "admin":
        console.log("User have admin acess");
        break;

    case "Founder":
        console.log("User have all acess");
        break;

    default:
        throw new Error("No user found");

}
}

const accessRecuslt = findAccess("Founder");

try{
    const accessRecuslt2 = findAccess("Founder23232");
}catch(err){
    console.log(err)
}

console.log("Our code is not breaking great....")