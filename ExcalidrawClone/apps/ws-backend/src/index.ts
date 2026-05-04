import {WebSocketServer} from "ws"

const ws = new WebSocketServer({port: 8081},()=>{
    console.log("Server listening on port 8081")
}); //Intialized ws server.

ws.on("connection", async(socket)=>{
    socket.on("message", (e)=>{
        socket.send(e.toString())
    })
})