"use client"
import { initDraw } from "@/draw"
import { useEffect, useRef } from "react"

export const Canvas = ({roomId, socket}: {roomId: string, socket: WebSocket})=>{
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current){
        const canvas = canvasRef.current
        initDraw(canvas,roomId, socket)
        }
    },[canvasRef])
    return(
        <div>
            <canvas ref={canvasRef} width={1480} height={980} style={{background:"black"}}></canvas>
        </div>
    )
}