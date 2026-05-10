"use client"

import { useEffect, useRef } from "react"

const Canvas = ()=>{
    const canvasRef = useRef<HTMLCanvasElement>(null)

    //The useEffect runs ONCE on mount — but it REGISTERS event listeners that stay alive:
    useEffect(()=>{
        //running side effect only after canvasRef is reffering to canvas
        if((canvasRef.current)){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d"); //Get the context of the canvas,

            if(!ctx){
                return;
            }
           
            let clicked = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener("mousedown", (e)=>{
                clicked = true
                startX = e.clientX;
                startY = e.clientY
            })

            canvas.addEventListener("mouseup", (e)=>{
                clicked= false;
                console.log(startX);
                console.log(startY)
            })

            canvas.addEventListener("mousemove", (e)=>{
                if(clicked){
                const width = e.clientX - startX;
                const height = e.clientY -startY;
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.strokeRect(startX,startY,width,height)
            }})
        }

    },[canvasRef]) //The effect will run when componets mounts and re-runs when depencdy value changes.

    return(
        <div>
            <canvas ref={canvasRef}  width={500} height={500}></canvas>
        </div>
    )
}

export default Canvas