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

  //Moving shapes

  private movingShapeIndex: number | null = null;

  private moveMouseStartX: number = 0;
  private moveMouseStartY: number = 0;

  private originalShape: Shape | null = null;

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
    //filter is used to create new array out of the value which passes certain condition.
    //.filter(Boolean) is short form for -> arr.filter((item) => !item)
    this.existingShapes.filter(Boolean).forEach((shape) => {
      // console.log("Shapes to render",shape)

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
  // FIND SHAPE AT POINT
  // =====================================
  isPointsAtShape = (x: number, y: number) => {
    // START FROM TOP SHAPE
    for (let i = this.existingShapes.length - 1; i >= 0; i--) {
      const shape = this.existingShapes[i];

      // RECTANGLE
      if (shape.type === "rect") {
        if (
          x >= shape.x &&
          x <= shape.x + shape.width &&
          y >= shape.y &&
          y <= shape.y + shape.height
        ) {
          return {
            shape,
            index: i,
          };
        }
      }

      // CIRCLE
      else if (shape.type === "circle") {
        // DISTANCE BETWEEN MOUSE AND CENTER
        const distance = Math.hypot(x - shape.centerX, y - shape.centerY);

        // IF DISTANCE IS INSIDE RADIUS
        if (distance <= shape.radius) {
          return {
            shape,
            index: i,
          };
        }
      }

      // PENCIL
      else if (shape.type === "pencil") {
        for (const point of shape.points) {
          const distance = Math.hypot(x - point.x, y - point.y);

          // 10px HITBOX
          if (distance <= 10) {
            return {
              shape,
              index: i,
            };
          }
        }
      }
    }

    return null;
  };

  // =====================================
  // DELETE SHAPE
  // =====================================
  deleteShape = (index: number) => {
    this.existingShapes.splice(index, 1);

    this.render();

    // this.socket.send(
    //   JSON.stringify({
    //     type: "chat",
    //     message: JSON.stringify({
    //       type: "erase",
    //       index,
    //     }),
    //     roomId: this.roomId,
    //   }),
    // );
  };

  // =====================================
  // MOUSE DOWN
  // =====================================
  //Only when user clicks we ge the the vertices not every time when user drags.
  mousedownHanlder = (e: MouseEvent) => {
    // MIDDLE CLICK => PAN
    // e.button === 1 -> Middle click (wheel click)
    if (e.button === 1) {
      this.isPanning = true;

      this.lastPanX = e.clientX;

      this.lastPanY = e.clientY;

      return;
    }

    this.clicked = true;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY);

    this.startX = coords.x;
    this.startY = coords.y;

    console.log("Start world vertices", this.startX, this.startY);

    this.lastX = coords.x;
    this.lastY = coords.y;

    // =====================================
    // ERASER
    // =====================================
    if (this.selectedShape === Shapes.eraser) {
      const result = this.isPointsAtShape(coords.x, coords.y);

      if (!result) return;

      this.deleteShape(result.index);

      return;
    }

    // =====================================
    // MOVE
    // =====================================
    if (this.selectedShape === Shapes.move) {
      const result = this.isPointsAtShape(coords.x, coords.y);

      if (!result) {
        return;
      }

      this.movingShapeIndex = result.index;

      console.log("Selected shape to move", result.shape);

      //We are using structuredClone because normal assignment copies reference.

      this.originalShape = structuredClone(result.shape);

      this.moveMouseStartX = coords.x;
      this.moveMouseStartY = coords.y;

      return;
    }

    // =====================================
    // PENCIL
    // =====================================
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

    // =====================================
    // STOP MOVE
    // =====================================
    if (this.selectedShape === Shapes.move) {
      this.movingShapeIndex = null;

      this.originalShape = null;

      this.clicked = false;

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({
            type: "sync",
            shapes: this.existingShapes,
          }),
          roomId: this.roomId,
        }),
      );

      return;
    }

    this.clicked = false;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY);

    const width = coords.x - this.startX;

    const height = coords.y - this.startY;

    let shape: Shape | null = null;

    // RECTANGLE
    if (this.selectedShape === Shapes.rectangle) {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    }

    // CIRCLE
    else if (this.selectedShape === Shapes.circle) {
      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;

      shape = {
        type: "circle",
        radius,
        centerX: this.startX + width / 2,
        centerY: this.startY + height / 2,
      };
    }

    // PENCIL
    else if (this.selectedShape === Shapes.pencil) {
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
      };
    }

    if (!shape) return;

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          type: "add",
          shape,
        }),
        roomId: this.roomId,
      }),
    );
  };

  // =====================================
  // MOVE SHAPE
  // =====================================
  moveShape = (shape: Shape, dx: number, dy: number) => {
    // RECT
    if (shape.type === "rect") {
      return {
        ...shape,
        x: shape.x + dx,
        y: shape.y + dy,
      };
    }

    // CIRCLE
    else if (shape.type === "circle") {
      return {
        ...shape,
        centerX: shape.centerX + dx,
        centerY: shape.centerY + dy,
      };
    }

    // PENCIL
    else {
      return {
        ...shape,
        points: shape.points.map((point) => ({
          x: point.x + dx,
          y: point.y + dy,
        })),
      };
    }
  };

  // =====================================
  // MOUSE MOVE
  // =====================================
  mousemovegHandler = (e: MouseEvent) => {
    // PAN
    if (this.isPanning) {
      const dx = e.clientX - this.lastPanX;

      const dy = e.clientY - this.lastPanY;

      this.panX += dx;
      this.panY += dy;

      this.lastPanX = e.clientX;
      this.lastPanY = e.clientY;

      this.render();

      return;
    }

    // DRAW
    if (!this.clicked) return;

    const coords = this.getMouseCoordinates(e.offsetX, e.offsetY);

    // =====================================
    // MOVE OBJECT
    // =====================================
    if (
      this.selectedShape === Shapes.move &&
      this.movingShapeIndex !== null &&
      this.originalShape
    ) {
      const dx = coords.x - this.moveMouseStartX;

      const dy = coords.y - this.moveMouseStartY;

      const movedShape = this.moveShape(this.originalShape, dx, dy);

      // UPDATE SHAPE
      this.existingShapes[this.movingShapeIndex] = movedShape as Shape;

      // RE-RENDER
      this.render();

      return;
    }

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
    this.panX -= e.deltaX;

    this.panY -= e.deltaY;

    this.render();
  };

  // =====================================
  // SOCKET
  // =====================================
  onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedData = JSON.parse(message.message);

      // =====================================
      // ADD SHAPE
      // =====================================
      if (parsedData.type === "add") {
        this.existingShapes.push(parsedData.shape);
      }

      // =====================================
      // ERASE SHAPE
      // =====================================
      else if (parsedData.type === "erase") {
        this.existingShapes.splice(parsedData.index, 1);
      }

      // =====================================
      // FULL SYNC
      // =====================================
      else if (parsedData.type === "sync") {
        this.existingShapes = parsedData.shapes;
      }

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

screenX = worldX * scale + panX
screenY = worldY * scale + panY

scale = 1 -> 100%
*/
