"use client"
import { initDraw } from "@/draw"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./IconButton"
import { Circle, Pencil, RectangleHorizontal } from "lucide-react"

export enum Shapes {
        circle,
        rectangle,
        pencil
    }
export const Canvas = ({roomId, socket}: {roomId: string, socket: WebSocket})=>{


    const [selctedShape, setSelctedShape] = useState<Shapes>();
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {width, height} = useWindowSize();

    useEffect(()=>{
        //@ts-ignore
        window.selectedTool = selctedShape; //bad approch for making selectedshape accessibel to initDraw.
    },[selctedShape])
    useEffect(()=>{
        if(canvasRef.current){
        const canvas = canvasRef.current

        let cleanUp : (()=>void) | undefined
        const init = async()=>{
        cleanUp = await initDraw(canvas,roomId, socket)
        }
        init();

        return ()=>{
            cleanUp?.()
        }
    }
    },[height,width])
    return(
        <div style={{position:"relative"}}>
            <canvas ref={canvasRef} width={width} height={height} style={{background:"black"}}></canvas>

            <div className=" absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                <IconButton onClick={()=>{
                    setSelctedShape(Shapes.pencil)
                }} active={selctedShape === Shapes.pencil} icon={<Pencil/>}></IconButton>

                <IconButton onClick={()=>{
                    setSelctedShape(Shapes.circle)
                }} active={selctedShape === Shapes.circle} icon={<Circle/>}></IconButton>

                <IconButton onClick={()=>{
                    setSelctedShape(Shapes.rectangle)
                }} active={selctedShape=== Shapes.rectangle} icon={<RectangleHorizontal/>}></IconButton>
            </div>
        </div>
    )
}