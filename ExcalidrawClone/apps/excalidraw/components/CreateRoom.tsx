"use client"
import { useRef } from "react"

export const CreateRoom = ()=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const createRoom = async()=>{
        const roomName = inputRef.current!.value;
        const token = localStorage.getItem("jwtToken")
        const res = await fetch("http://localhost:3005/room", {
            method: "POST",
            headers:{
                 "Content-Type": "application/json",
                "authorization": token || ""
            },
            body: JSON.stringify({
                slug:roomName
            })
        })

        const resObj = await res.json();
        if(res.ok){
            alert("room created")
        }
    }
    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Room name" />
            <button onClick={createRoom}>Create room</button>
        </div>
    )
} 