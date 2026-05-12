import { Shapes } from "@/components/Canvas"


type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    radius: number,
    centerX: number,
    centerY: number,
}
export const initDraw = async (canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) => {
    console.log("Canvas is loaded")
    const ctx = canvas.getContext("2d"); //Get the context of the canvas,
    if (!ctx) {
        return;
    }
    //Getting existing shapes from db
    let existingShapes: Shape[] = await getExistingShapes(roomId);
    clearCanvas(canvas, ctx, existingShapes)

    // const existingShapes : Shape[] = []
    ctx.strokeStyle = "white"
    let clicked = false;
    let startX = 0;
    let startY = 0;

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape)
            clearCanvas(canvas, ctx, existingShapes)
        }
    }

    const mousedownHanlder = (e: MouseEvent) => {
        clicked = true
        startX = e.clientX;
        startY = e.clientY
    }

    const mouseupHandler = (e: MouseEvent) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        let shape: Shape| null = null;
        //@ts-ignore
        if(window.selectedTool === Shapes.rectangle){
            shape = {
            type: "rect",
            x: startX,
            y: startY,
            width: width,
            height: height
        }//@ts-ignore
        }else if(window.selectedTool === Shapes.circle){
            const radius = Math.min(Math.abs(width), Math.abs(height)) / 2
            shape ={
                type:"circle",
                radius: radius,
                centerX:startX + (width / 2),
                centerY: startY + (height / 2)
            }
        }

        if(!shape){
            return;
        }

        existingShapes.push(shape); //storing the shape while reciving the msg from ws.
        clearCanvas(canvas,ctx, existingShapes )
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }
            ),
            roomId: roomId
        }))
    }

    const mousemovegHandler = (e: MouseEvent) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(canvas, ctx, existingShapes)
            //@ts-ignore
            const selectedTool = window.selectedTool;

            if (selectedTool === Shapes.rectangle) {
                ctx.strokeRect(startX, startY, width, height)
            }

            if (selectedTool === Shapes.circle) {
                // drawCircle(ctx,startX,startY)
                //enter is halfway across the box
                const centerX = startX + (width / 2);
                // center is halfway down the box
                const centerY = startY + (height / 2);
                //use the SMALLER dimension so it doesn't overflow
                const radius = Math.min(Math.abs(width), Math.abs(height)) / 2
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    canvas.addEventListener("mousedown", mousedownHanlder);
    canvas.addEventListener("mouseup", mouseupHandler);
    canvas.addEventListener("mousemove", mousemovegHandler)

    return () => {
        canvas.removeEventListener("mousedown", mousedownHanlder);
        canvas.removeEventListener("mouseup", mouseupHandler);
        canvas.removeEventListener("mousemove", mousemovegHandler);
        socket.onmessage = null
    }
}

const clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingShapes: Shape[]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }

        else if(shape.type === "circle"){
             ctx.beginPath();
                ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath(); 
        }


    })
}

const getExistingShapes = async (roomId: string) => {
    const res = await fetch(`http://localhost:3005/chat?roomid=${roomId}`);
    const chatsObj = await res.json();
    const chats = chatsObj.message;
    if (!chatsObj.message) {
        console.log("Failed to fetch chats!")
        return []
    }

    const shapes = chats.map((X: { message: string }) => {
        const messageData = JSON.parse(X.message);
        return messageData.shape
    })

    return shapes;

}
/*
chats:{
id:int,
message:{shape:{x,y}}
}
*/

// const drawCircle = (ctx: CanvasRenderingContext2D,startX:number,startY:number) => {
//     //enter is halfway across the box
//     const centerX = startX + (width / 2);
//     // center is halfway down the box
//     const centerY = startY + (height / 2);
//     //use the SMALLER dimension so it doesn't overflow
//     const radius = Math.min(Math.abs(width), Math.abs(height)) / 2
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//     ctx.stroke();
//     ctx.closePath
// }

