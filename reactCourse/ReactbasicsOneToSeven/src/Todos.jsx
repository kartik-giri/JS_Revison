import { useEffect, useState } from "react"

export const Todos = () => {
    const [todoid, setTodoId] = useState(0);
    const [todoData, setTodoData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        //Effect will only run when todoId state changes or when compoenent mounts
        fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`)
        .then((res)=>{
            return(res.json())
        }).then((data)=>{
            setTodoData(data);
            setLoading(false);
        })

        //No need to clear the fetch effect.
        // But react clears the previous effect before running the new effect with new state

        // return ()=>{
        //     clear
        // }
    },[todoid])
    return (
        <>
            {/* <button onClick={()=>setTodoId(1)}style={{color:todoid==1:"red"?"black"}}>Todo 1</button> */}
            <button onClick={() => {
                setTodoId(1)
            }} style={{ color: todoid == 1 ? "red" : "black" }}>Todo 1</button>

            <button onClick={() => {
                setTodoId(2)
            }} style={{ color: todoid == 2 ? "red" : "black" }}>Todo 2</button>

            <button onClick={() => {
                setTodoId(3)
            }} style={{ color: todoid == 3 ? "red" : "black" }}>Todo 3</button>

            <button onClick={() => {
                setTodoId(4)
            }} style={{ color: todoid == 4 ? "red" : "black" }}>Todo 4</button>

                <div>{loading?"Loading..":todoData.title}</div>

        </>
    )
}