import type { todoType } from "./interfaces/todosInterface";
import type { childrenProps } from "./interfaces/todosInterface";
/*
type -
This tells TypeScript:
This import is ONLY for type checking
Remove it completely from JS output
*/
const App =()=>{

  //Type[] means array of Type
  let todoItem:todoType[] = [{
    id: Date.now(), // A unique ID, useful for managing items in a list
    title: "Learn JavaScript objects", // The task description or title
    completed: false, // A boolean indicating if the task is done
    dueDate: "2025-12-31" // Optional: a due date for the task
}];

  return (
    <>
    <RenderTodo>{todoItem}</RenderTodo>
    </>
  )
}

//Here in props children is the in childrenProps type which.
//And children props type is todoType[]
const RenderTodo = ({children}:childrenProps)=>{
  return (
    <>
    <div>{children.map((todo:todoType)=>{
      return(<div>
      <p>{todo.title}</p>
      <p>{todo.completed?"completed":"NOT completed"}</p>
      <p>{todo.dueDate}</p>
      </div>)
    })}</div>
    </>
  )
}

export default App