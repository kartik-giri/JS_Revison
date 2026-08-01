//Biggest number we save in normal int is 9007199254740992 if add any thing in it this will cause precision loss
//Normal int is of size 64 bits

let num = 9007199254740992;
console.log(num+1); //printing 9007199254740992

let bigNum = 9007199254740992n;
console.log(bigNum+1n); //I have used in contract devlopment for defi contract to safely work with crypto

console.log(bigNum+ BigInt(100000000000000000000));

//Numeric separator.
//A numeric separator (_) lets us visually separate digits in numbers without affecting the value.

const million = 1_000_000; //already used in blockchain
console.log(million)