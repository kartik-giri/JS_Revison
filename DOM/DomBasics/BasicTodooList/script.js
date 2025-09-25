const retrieveTodo=()=>{
    let textFeed = document.getElementById("text-feed");
    let textValue = textFeed.value;
    console.log(textValue);
    addTodoData(textValue);
}

//Add todo
const addTodoData=(textValue)=>{
    let divContainer = document.querySelector(".List-container")
    let Indvidualtodocontainer = document.createElement("div");
    let todoElem = document.createElement("h2");
    todoElem.textContent=textValue;

    let deleteButton = document.createElement("button")
    Indvidualtodocontainer.appendChild(todoElem);

    divContainer.appendChild(Indvidualtodocontainer);
}

const deleteTodo=(index)=>{
    let todoelem = document.querySelector("#todo-"+index);
    todoelem.parentElement.removeChild(todoelem);
}

//Delete Todo

