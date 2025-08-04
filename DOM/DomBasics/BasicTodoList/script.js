console.log(document); //document represent html root node

//It selects the first element in the DOM that matches a CSS selector.
//"selector" = any valid CSS selector (like class, id, tag, etc.)
// Returns the first matching element or null if not found

let TodoContainer = document.querySelector("#TodoContainer");


let getFeedData = ()=>{
    let textFeed = document.querySelector("#textFeed");
     let inputfeedData = textFeed.value;
    console.log(inputfeedData);
    updateTodo(inputfeedData);
}

let updateTodo = (inputfeedData)=>{
    let todoElem = document.createElement("h4");
    todoElem.textContent = inputfeedData;
    console.log( todoElem.textContent)
    TodoContainer.appendChild(todoElem);
}

let deleteTodo = (index)=>{
    let todo = document.querySelector("#Todo-"+index);
    todo.parentElement.removeChild(todo);
}

// let counterFunc = ()=>{
//     let counterElem = document.querySelector("#counter");
//     let count = 0;
//     setInterval(()=>{
//         count++;
//         counterElem.innerHTML= count;
//     },1000)
    
// }
// counterFunc()

