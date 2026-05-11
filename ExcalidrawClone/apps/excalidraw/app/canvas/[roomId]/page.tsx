
import { RoomCanvas } from "@/components/RoomCanvas";

const CanvasPage = async ({params}:{
    params: Promise<{
        roomId : string
    }>
})=>{

    const {roomId} = await params;
    return (
        <div>
            <RoomCanvas roomId={roomId}/>
        </div>
    )
}

export default CanvasPage

























// "use client"

// import { initDraw } from "@/draw"
// import { useEffect, useRef } from "react"

// const Canvas = ()=>{
//     const canvasRef = useRef<HTMLCanvasElement>(null)

//     //The useEffect runs ONCE on mount — but it REGISTERS event listeners that stay alive:
//     useEffect(()=>{
//         //running side effect only after canvasRef is reffering to canvas
//         if((canvasRef.current)){
//             const canvas = canvasRef.current;

//             initDraw(canvas);
//         }

//     },[canvasRef]) //The effect will run when componets mounts and re-runs when depencdy value changes.

//     return(
//         <div>
//             <canvas ref={canvasRef}  width={1680} height={900} style={{background:"black"}}></canvas>
//         </div>
//     )
// }

// export default Canvas