"use client"
import { initDraw } from "@/draw"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./IconButton"
import { Circle, Pencil, RectangleHorizontal } from "lucide-react"
import { Game } from "@/draw/Game"

export enum Shapes {
        circle,
        rectangle,
        pencil
    }
export const Canvas = ({roomId, socket}: {roomId: string, socket: WebSocket})=>{

    const [selctedShape, setSelctedShape] = useState<Shapes>(Shapes.pencil);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {width, height} = useWindowSize();
    const [game, setGame] = useState<Game>();
    
    /*
    The bug is that game init function is async which is waitng and event are registered after the await that's why when clean up is run it has no effect on events.
    cause events are registered later and than both the games will have registered events.
    Solution for async init is boolean flag
    */
    useEffect(()=>{
        if(canvasRef.current){
        const canvas = canvasRef.current

        const gameObj = new Game(canvas,roomId, socket, selctedShape);
        if(!gameObj){
            return
        }
        setGame(gameObj);


        return ()=>{
           gameObj.cleanEvents();
        }
    }
    },[height,width])

    useEffect(()=>{
        game?.setSelectedShape(selctedShape);
    },[selctedShape])

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