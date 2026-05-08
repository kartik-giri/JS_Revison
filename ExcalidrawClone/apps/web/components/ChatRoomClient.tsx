"use client"

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";


export const ChatRoomClient= ({messages,roomId}:{messages:{message:string}[], roomId:number})=>{
    const {socket, loading} = useSocket();
    const [chats, setChats] = useState(messages);
    const inputRef = useRef<HTMLInputElement>(null)
    
    const sendMsg = async()=>{
        const msg = inputRef.current!.value;
        await socket!.send(JSON.stringify({
            type:"chat",
            message:msg,
            roomId:roomId
        }))
    }
    useEffect(()=>{
        if(socket && !loading){

            socket.send(JSON.stringify({
                type:"join-room",
                roomId:roomId
            }))

            socket.onmessage= (event)=>{
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat"){
                setChats((chats)=>{
                    chats = [...chats,{message:parsedData.message}];
                    return chats
                })
            }
            }
        }
    },[socket,loading, roomId])
    return (
        <div>
            {chats.map((chat)=>{
                return <div>{chat.message}</div>
            })}
            <input ref={inputRef} type="text" placeholder="Text..." />
            <button onClick={sendMsg}>Send</button>
        </div>
    )
}