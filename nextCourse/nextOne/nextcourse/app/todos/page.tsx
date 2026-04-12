

const todos = async ()=>{
    
        const resp = await fetch("https://jsonplaceholder.typicode.com/todos");
        const resObj = await resp.json();


    return (
        <>
        {resObj.map((todo:any)=>{
            return <li key={todo.id}>{todo.title}</li>
        })}
        </>
    )
}

export default todos