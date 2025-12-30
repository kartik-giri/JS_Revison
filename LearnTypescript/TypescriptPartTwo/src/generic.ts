//Porgram -1 Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.
//Ts forced us to handle undefined situation.
//I am enforing the function that argument should containe ateast one element in the arr.
//Now we have made this function generic

//Genertic type can be preimituve type or it can aslo be composite type like interface or Type
//Generics in TypeScript are a powerful feature that allow you to create flexible, reusable, 
//and type-safe components (functions, classes, and interfaces) that can work with a variety of data types, rather than a single, fixed type

const returnElem =<genType> (arrlist: [genType, ...genType[]]): genType=>{
    const firstElem = arrlist[0];
    return firstElem;
}

const result = returnElem<number>([12,23,34]);
console.log(`First element of arr is ${result}`);

const stringresult = returnElem<string>(["kartik", "ram", "shyam"]);
console.log(`First element of arr is ${stringresult}`)