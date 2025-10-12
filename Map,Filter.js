let arr = [12,23,34,56];

//Map transforms each element in the array

let newArr = arr.map((elem)=>{
    return elem*2;
})

console.log(newArr);

//Filter Keeps only elements that meet a condition

let evenArr = arr.filter((elem)=>{
    return elem %2 ==0;
}) 
console.log(evenArr)