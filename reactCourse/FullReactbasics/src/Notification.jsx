import { useEffect, useState } from "react"

export const Notification=()=>{
const [count, setCount] = useState(0);

useEffect(()=>{
    const id = setInterval(()=>{
        setCount(count=>count+1);
    },5000)

    return ()=>{
      clearInterval(id);  
    }
}, [])
    return (
        <>
        <div>
            <div style={{background:"red", textAlign:"center", borderRadius:20, padding:0 }}>{count}</div>
            <img src="https://cdn-icons-png.flaticon.com/512/472/472371.png" alt="bell image" style={{height:20}} />
        </div>
        </>
    )
}

