let count = 1;

let addTodo = ()=>{
    //Fetching value of feed.
    let textFeed = document.querySelector("#textFeed");
    let feedValue = textFeed.value;
    console.log(feedValue);

    //Updating list.
    let newTodo = document.createElement("div");
    newTodo.setAttribute("id", "todo-"+count);
    newTodo.innerHTML= `<h4>${feedValue}</h4> <button onclick="deleteTodo(${count})">Delete</button>`
    let todoParent = document.querySelector("#listContainer");
    todoParent.appendChild(newTodo);
    count++;
}

let deleteTodo = (count)=>{
    let todoElem = document.querySelector("#todo-"+count);
    todoElem.parentNode.removeChild(todoElem);
}

