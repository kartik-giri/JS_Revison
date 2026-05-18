import { Shapes } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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

export class Game {

    private canvas: HTMLCanvasElement;
    private roomId: string;
    private socket: WebSocket;
    private ctx!: CanvasRenderingContext2D;
    private existingShapes!: Shape[];
    private startX: number = 0;
    private startY: number = 0;
    private clicked: boolean = false;
    private selectedShape!: Shapes;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, selectedShape: Shapes) {
        this.canvas = canvas;
        this.roomId = roomId;
        this.socket = socket;
        this.selectedShape= selectedShape;
        this.init();

    }

    init = async () => {
        this.ctx = this.canvas.getContext("2d")!;
        this.ctx.strokeStyle = "white"
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
        this.initEvents(); //assign the event canvas event listneres
    }

    setSelectedShape = (shape: Shapes)=>{
        this.selectedShape = shape
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
            }

            else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }

    mousedownHanlder = (e: MouseEvent) => {
        this.clicked = true
        this.startX = e.clientX;
        this.startY = e.clientY
    }

    onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            this.existingShapes.push(parsedShape.shape)
            this.clearCanvas()
        }
    }

    mouseupHandler = (e: MouseEvent) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        let shape: Shape | null = null;
        //@ts-ignore
        if (this.selectedShape === Shapes.rectangle) {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width: width,
                height: height
            }//@ts-ignore
        } else if (this.selectedShape === Shapes.circle) {
            const radius = Math.min(Math.abs(width), Math.abs(height)) / 2
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + (width / 2),
                centerY: this.startY + (height / 2)
            }
        }

        if (!shape) {
            return;
        }

        this.existingShapes.push(shape); //storing the shape while reciving the msg from ws.
        this.clearCanvas()
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }
            ),
            roomId: this.roomId
        }))
    }

    mousemovegHandler = (e: MouseEvent) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas()
            //@ts-ignore
            const selectedTool = this.selectedShape;

            if (selectedTool === Shapes.rectangle) {
                this.ctx.strokeRect(this.startX, this.startY, width, height)
            }

            else if (selectedTool === Shapes.circle) {
                // drawCircle(ctx,startX,startY)
                //enter is halfway across the box
                const centerX = this.startX + (width / 2);
                // center is halfway down the box
                const centerY = this.startY + (height / 2);
                //use the SMALLER dimension so it doesn't overflow
                const radius = Math.min(Math.abs(width), Math.abs(height)) / 2
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }



    initEvents = ()=>{
        this.canvas.addEventListener("mousedown", this.mousedownHanlder);
        this.canvas.addEventListener("mouseup", this.mouseupHandler);
        this.canvas.addEventListener("mousemove", this.mousemovegHandler)
        this.socket.onmessage = this.onmessage;
    }

    cleanEvents = ()=>{
        this.canvas.removeEventListener("mousedown", this.mousedownHanlder);
        this.canvas.removeEventListener("mouseup", this.mouseupHandler);
        this.canvas.removeEventListener("mousemove", this.mousemovegHandler)
        this.socket.onmessage = null
    }

}


