//Hoisting means javaScript moves declarations to the top of the scope before execution or calling it.

console.log(a); //Js hoist the var at the top of the block and make it undefine.
var a = 12;

//Js hoist the normal function at the top of block which  allow us calling the normal function before defining them.

callFunction();

function callFunction(){
    console.log("hoisted at top")
}

//But this is not the case with const,let and arrow function these are not hoisted at top.