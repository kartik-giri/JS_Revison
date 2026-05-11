type Shape = {
    type:"rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type:"circle",
    x: number,
    y: number,
    width: number,
    height: number
}
export const initDraw = async(canvas: HTMLCanvasElement, roomId: string, socket:WebSocket)=>{
    console.log("Canvas is loaded")
            const ctx = canvas.getContext("2d"); //Get the context of the canvas,

            let existingShapes: Shape[] = await getExistingShapes(roomId)

            if(!ctx){
                return;
            }
            // const existingShapes : Shape[] = []
            ctx.strokeStyle= "white"
            let clicked = false;
            let startX = 0;
            let startY = 0;

            socket.onmessage = (event)=>{
                const message = JSON.parse(event.data);

                if(message.type === "chat"){
                    const parsedShape = JSON.parse(message.message);
                    existingShapes.push(parsedShape.shape)
                    clearCanvas(canvas,ctx,existingShapes)
                }
            }

            canvas.addEventListener("mousedown", (e)=>{
                clicked = true
                startX = e.clientX;
                startY = e.clientY
            })

            canvas.addEventListener("mouseup", (e)=>{
                clicked= false;
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                const shape: Shape = {
                    type:"rect",
                    x:startX,
                    y:startY,
                    width: width,
                    height:height
                }
                existingShapes.push(shape);

                socket.send(JSON.stringify({
                    type:"chat",
                    message: JSON.stringify({
                        shape}
                    ),
                    roomId: roomId
                }))
            })

            canvas.addEventListener("mousemove", (e)=>{
                if(clicked){
                const width = e.clientX - startX;
                const height = e.clientY -startY;
                clearCanvas(canvas,ctx,existingShapes)
                ctx.strokeRect(startX,startY,width,height)
            }})
}

const clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingShapes:Shape[])=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    existingShapes.map((shape)=>{
        if(shape.type === "rect"){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }
    })
}

const getExistingShapes = async(roomId: string)=>{
    const res = await fetch(`http://localhost:3005/chat?roomid=${roomId}`);
    const chatsObj = await res.json();
    const chats = chatsObj.message;

    const shapes = chats.map((X:{message:string})=>{
        const messageData = JSON.parse(X.message);
        return messageData.shape
    })

    return shapes;

}

