"use client"
import { useEffect, useState } from "react"
import { Canvas } from "./Canvas";

export const RoomCanvas=({roomId}: {roomId:string})=>{
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem("jwtToken")
        const ws = new WebSocket(`ws://localhost:8081?token=${token}`);

        ws.onopen= ()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join-room",
                roomId: roomId
            }))
        }
    },[])

    if(!socket){
        return <div>
            Connecting to server.....
        </div>
    }
    return (
        <div>
            <Canvas roomId={roomId} socket={socket}/>
        </div>
    )
}