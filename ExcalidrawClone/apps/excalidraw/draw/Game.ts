import { Shapes } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Points = {
  x: number;
  y: number;
};

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      radius: number;
      centerX: number;
      centerY: number;
    }
  | {
      type: "pencil";
      points: Points[];
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private roomId: string;
  private socket: WebSocket;
  private ctx!: CanvasRenderingContext2D;

  private existingShapes: Shape[] = [];

  private startX: number = 0;
  private startY: number = 0;

  private clicked: boolean = false;

  private selectedShape!: Shapes;

  private lastX: number = 0;
  private lastY: number = 0;

  private destroyed: boolean = false;

  private currentPencilPoints: Points[] = [];

  // =========================
  // PAN
  // =========================
  private panX: number = 0; //stores pan values e.g pan by 100px
  private panY: number = 0;

  private isPanning: boolean = false;

  private lastPanX: number = 0;
  private lastPanY: number = 0;

  // =========================
  // ZOOM
  // =========================
  private scale: number = 1;

  constructor(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket,
    selectedShape: Shapes,
  ) {
    this.canvas = canvas;
    this.roomId = roomId;
    this.socket = socket;
    this.selectedShape = selectedShape;

    this.init();
  }

  init = async () => {
    this.ctx = this.canvas.getContext("2d")!;

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    // IMPORTANT FOR TRACKPAD
    this.canvas.style.touchAction = "none";

    this.existingShapes = await getExistingShapes(this.roomId);

    if (this.destroyed) return;

    this.render();

    this.initEvents();
  };

  setSelectedShape = (shape: Shapes) => {
    this.selectedShape = shape;
  };

  // =====================================
  // SCREEN -> WORLD
  // =====================================
  getMouseCoordinates = (x: number, y: number) => {
    return {
      x: (x - this.panX) / this.scale,
      y: (y - this.panY) / this.scale,
    };
  };

  // =====================================
  // RENDER
  // =====================================
  render = () => {
    // RESET EVERYTHING
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // CLEAR SCREEN
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // APPLY CAMERA
    this.ctx.setTransform(
      this.scale, // scale x
      0,
      0,
      this.scale, // scale y
      this.panX, // translate x
      this.panY, // translate y
    );

    // DRAW SHAPES
    this.existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();

        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          Math.PI * 2,
        );

        this.ctx.stroke();

        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        if (shape.points.length < 2) return;

        this.ctx.beginPath();

        this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

        for (let i = 1; i < shape.points.length; i++) {
          this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
        }

        this.ctx.stroke();

        this.ctx.closePath();
      }
    });
  };

  // =====================================
  // MOUSE DOWN
  // =====================================
  mousedownHanlder = (e: MouseEvent) => {
    // MIDDLE CLICK => PAN
    // e.button === 1 -> Middle click (wheel click)
    if (e.button === 1) {
      this.isPanning = true;

      this.lastPanX = e.clientX; //e.client means screen coordinate let's say initialy it is 500px
      this.lastPanY = e.clientY;

      return;
    }

    this.clicked = true;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY); //Let's say panx by 300x pc user's cursor is at 400x but original x coordinate is (offset - panx) 400-300 = 100 original world coorinates.

    this.startX = coords.x;
    this.startY = coords.y;

    this.lastX = coords.x;
    this.lastY = coords.y;

    if (this.selectedShape === Shapes.pencil) {
      this.currentPencilPoints = [
        {
          x: coords.x,
          y: coords.y,
        },
      ];
    }
  };

  // =====================================
  // MOUSE UP
  // =====================================
  mouseupHandler = (e: MouseEvent) => {
    if (this.isPanning) {
      this.isPanning = false;
      return;
    }

    this.clicked = false;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY);

    const width = coords.x - this.startX;
    const height = coords.y - this.startY;

    let shape: Shape | null = null;

    if (this.selectedShape === Shapes.rectangle) {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.selectedShape === Shapes.circle) {
      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;

      shape = {
        type: "circle",
        radius,
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    } else if (this.selectedShape === Shapes.pencil) {
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
      };
    }

    if (!shape) return;

    this.existingShapes.push(shape);

    this.render();

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      }),
    );
  };

  // =====================================
  // MOUSE MOVE
  // =====================================
  mousemovegHandler = (e: MouseEvent) => {
    // PAN
    if (this.isPanning) {
      const dx = e.clientX - this.lastPanX; //530-500 -> move canvas right to 30px
      const dy = e.clientY - this.lastPanY;

      this.panX += dx;
      this.panY += dy;

      this.lastPanX = e.clientX; //e.clientX means screen space  it become now 530x
      this.lastPanY = e.clientY;

      this.render(); //make the canvas transfor right to 30 px x and render shapes to there world coordinates.

      return;
    }

    // DRAW
    if (!this.clicked) return;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY); //let's say scnvas is moved by 30Px x by making lastPanx 530 from 500 and now offset is at 600Px. getting real world coordinates now.

    const width = coords.x - this.startX;
    const height = coords.y - this.startY;

    const selectedTool = this.selectedShape;

    if (selectedTool === Shapes.rectangle || selectedTool === Shapes.circle) {
      this.render();
    }

    // RECT
    if (selectedTool === Shapes.rectangle) {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    // CIRCLE
    else if (selectedTool === Shapes.circle) {
      const centerX = this.startX + width / 2;

      const centerY = this.startY + height / 2;

      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;

      this.ctx.beginPath();

      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      this.ctx.stroke();

      this.ctx.closePath();
    }

    // PENCIL
    else if (selectedTool === Shapes.pencil) {
      this.ctx.beginPath();

      this.ctx.moveTo(this.lastX, this.lastY);

      this.ctx.lineTo(coords.x, coords.y);

      this.ctx.stroke();

      this.ctx.closePath();

      this.currentPencilPoints.push({
        x: coords.x,
        y: coords.y,
      });

      this.lastX = coords.x;
      this.lastY = coords.y;
    }
  };

  // =====================================
  // TRACKPAD PAN + ZOOM
  // =====================================
  wheelHandler = (e: WheelEvent) => {
    e.preventDefault();

    // ======================
    // PINCH ZOOM
    // ctrlKey === true on mac pinch
    // ======================
    if (e.ctrlKey) {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      // Lets say there is rect on screen scpace 400px.
      // and 300Px on wolrd space. pan = 100px
      // Scale become 2.
      // Screen space = (300*2)+100 => 700 
      // Drawing system shifted to 700px from 400px and cursor is not on top of rect any more.
      // so we need to correct the caluculation. 
      // By changing pan
      // we know scree space(400) == screen space(300*2)+100
      // panx = offsetX - worldX * scale
      // panx = 400 - 300 *2 -> 400 - 600 => -200 
      // Now ScreenX = (300*2) +(-200)=> 600 -200 = 400
      // Boom Afer zoom cursor is at same place.

      // WORLD POSITION BEFORE ZOOM
      const worldX = (mouseX - this.panX) / this.scale;

      const worldY = (mouseY - this.panY) / this.scale;

      // ZOOM SPEED
      const zoom = 1 - e.deltaY * 0.01;

      // LIMITS
      const newScale = Math.min(Math.max(this.scale * zoom, 0.2), 5);

      this.scale = newScale;

      // KEEP CURSOR FIXED
      this.panX = mouseX - worldX * this.scale;

      this.panY = mouseY - worldY * this.scale;

      this.render();

      return;
    }

    // ======================
    // TWO FINGER PAN
    // ======================
    //With this we are moving our canvas left side.
    this.panX -= e.deltaX; //how much fingers moved. lets say moved 20 right than we need to subtract from pan cause world is moving left
    this.panY -= e.deltaY;

    this.render();
  };

  // =====================================
  // SOCKET
  // =====================================
  onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);

      this.existingShapes.push(parsedShape.shape);

      this.render();
    }
  };

  // =====================================
  // EVENTS
  // =====================================
  initEvents = () => {
    this.canvas.addEventListener("mousedown", this.mousedownHanlder);

    this.canvas.addEventListener("mouseup", this.mouseupHandler);

    this.canvas.addEventListener("mousemove", this.mousemovegHandler);

    this.canvas.addEventListener("wheel", this.wheelHandler, {
      passive: false,
    });

    this.socket.onmessage = this.onmessage;
  };

  cleanEvents = () => {
    this.destroyed = true;

    this.canvas.removeEventListener("mousedown", this.mousedownHanlder);

    this.canvas.removeEventListener("mouseup", this.mouseupHandler);

    this.canvas.removeEventListener("mousemove", this.mousemovegHandler);

    this.canvas.removeEventListener("wheel", this.wheelHandler);

    this.socket.onmessage = null;
  };
}

/*
THE CORE IDEA

Your app has TWO coordinate systems.

1. WORLD SPACE

Real shape positions.

rect = (100,100)

Never changes while panning.

2. SCREEN SPACE

What user visually sees.

After pan:

rect visually appears at (400,100)

because:

screen = world + cameraOffset
FINAL FORMULA

Rendering:

screenX = worldX + panX
screenY = worldY + panY

Mouse conversion:

worldX = screenX - panX
worldY = screenY - panY

These two formulas ARE panning.


for zooming->
screenX = worldX * scale + panX //scale =1 ->100% world x original coords
screenY = worldY * scale + panY
*/
