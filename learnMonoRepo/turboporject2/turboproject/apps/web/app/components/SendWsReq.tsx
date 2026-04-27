"use client"
import { Input } from "@repo/ui/input"
import { useWebSocket } from "../hooks/useWebsocket";
import { useRef } from "react";
export const SendWsReq = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const { socketRef } = useWebSocket();
    const sendFunc = () => {
        const text = inputRef.current!.value;
        socketRef.current?.send(JSON.stringify({
            type:"chat",
            payload:{
                message:text
            }
        }))
        console.log("message sent")
        }
    return (
        <>
            <Input ref={inputRef} placeholder="chat" />
            <button style={{ background: "white", color: "black", width: "165px", padding: 10 }} type="button" onClick={sendFunc}>Join</button>
        </>
    )
}