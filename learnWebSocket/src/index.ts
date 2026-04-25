import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });


//We have created the connection to the client and can send data to it.
//This is an event listener on the WebSocket server. It fires every time a new client connects. 
// The socket parameter represents that specific client's connection — each connected client gets its own socket.

// wss.on("connection", (socket)=>{
//     console.log(`Connection being made`);

//     //sending messages to client
//     setInterval(()=>{
//          socket.send(`Curent price of sol: ${Math.random()}`)
//     },2000)

//     //recieving message from client
//     socket.on("message", (e)=>{
//         console.log(e.toString())
//     })
// })


//Websocket ping pong

wss.on(`connection`, (socket) => {

    socket.on("message", (e) => {
        if (e.toString() === "Ping") {
            socket.send("Pong")
        }
    })
})

// wss.on("connection", (socket)=>{
//     console.log("Connect is being made");

//     socket.on("message", (e)=>{
//         socket.send(e.toString())
//     })
// })





















