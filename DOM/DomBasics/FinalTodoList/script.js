let count = 1;
const addTodo=()=>{
    //retrieve todo
    let textFeed = document.querySelector("#textFeed");
    let textValue = textFeed.value;

    //Add todo
    let todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", "index-"+count);

    let todoname = document.createElement("h4");
    todoname.textContent=textValue;

    let deletebtn = document.createElement("button");
    deletebtn.textContent="Delete";

    deletebtn.addEventListener("click",()=>{
        todoDiv.parentElement.removeChild(todoDiv);
    })

    todoDiv.appendChild(todoname);
    todoDiv.appendChild(deletebtn);
    let container = document.querySelector("#listcontainer")
    container.appendChild(todoDiv);

    count++;
}


































// let count = 1;

// //Here we are creating dom elemnets and not using html to create new todo and delete them.
// let addTodo = ()=>{
//     let textFeed = document.querySelector("#textFeed");
//     let textValue = textFeed.value;
//     console.log(textValue);

//     //Adding todo
//     let todoDiv = document.createElement("div");
//     todoDiv.setAttribute("id", "todo-"+count);
    
//     let todoName = document.createElement("span");
//     todoName.innerHTML= textValue;
    
//     let deleteBtn = document.createElement("button");
//     deleteBtn.innerText = "Delete";
    
//     deleteBtn.addEventListener("click",()=>{
//         todoDiv.parentNode.removeChild(todoDiv)
//     })

//     todoDiv.appendChild(todoName);
//     todoDiv.appendChild(deleteBtn);

//     document.querySelector("#listcontainer").appendChild(todoDiv)
//     count++;
// }