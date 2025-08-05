let count =0
let todoArr = [];

//See it as a state
let addTodo = ()=>{
todoArr.push({
    title: document.querySelector("#textFeed").value
})
console.log(todoArr[0].title);
render()
}

//See it as a component
let addTodoFunc = (arrObj)=>{
    let divTodo = document.createElement("div");
    divTodo.setAttribute("id",count)

    let todoTitle = document.createElement("span");
    todoTitle.innerHTML=arrObj.title;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText= "Delete";
    deleteBtn.addEventListener("click", ()=>{
        // divTodo.parentNode.removeChild(divTodo);
        //See very important here we are not changing dom we are just chaingin state to delte element.
        todoArr.splice(divTodo.getAttribute("id"),1)
        render();
        console.log(count)
    })

    divTodo.appendChild(todoTitle);
    divTodo.appendChild(deleteBtn);

    document.querySelector("#listcontainer").appendChild(divTodo);
    console.log(count);
    console.log("Length of arr:", todoArr.length);
    count++

}

let render = ()=>{
 document.querySelector("#listcontainer").innerHTML = " ";
 count = 0

 todoArr.forEach(elem => {
    addTodoFunc(elem);
 });
}