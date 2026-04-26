import { WebSocketServer, WebSocket } from "ws";

const ws = new  WebSocketServer({port: 3002})

//We are creating rough scheema so that we can handle users different actoins.
/*
Schema for socketUser input
{
  type: "join",
  "payload":{
    "roomId": 12121
  }
}

{
  type: "chat",
  "payload":{
    "message": "HI"
  }
}
*/

//When a user joins a room, you need to remember which room that socket belongs to:
interface NewWebSocket extends WebSocket{
    roomId?: String 
} 

//socketList{roomId}-> {socket1,socket2}
const socketList = new Map<String, Set<NewWebSocket>>()

ws.on("connection", (socket: NewWebSocket)=>{

    socket.on("message", (message)=>{
        const messageString = message.toString()
        const messageObject = JSON.parse(messageString);

        if(messageObject.type === "join"){
            const roomId = messageObject.payload.roomId;
            //If socketList have no mapping with roomid than create it.
            if(!socketList.has(roomId)){
                socketList.set(roomId, new Set());
            }
            socketList.get(roomId)?.add(socket);
            socket.roomId =roomId;
            console.log(`Socket have join ${roomId}.`)
        }

        if(messageObject.type === "chat"){
            const message = messageObject.payload.message;
            const roomid = socket.roomId;
            if(!roomid || !message){
                return new Error("No message and roomId for user");
            }
            socketList.get(roomid)?.forEach((socket)=>{
                socket.send(message);
                console.log("Message is broadcast to all scokets in a room")
            })
        }
        
    })

    socket.on("close", ()=>{
        const roomId = socket.roomId;
        if(!roomId){
            return new Error("User have no roomId while disconnecting");
        }

        socketList.get(roomId)?.delete(socket);

        if(socketList.get(roomId)?.size=== 0){
            socketList.delete(roomId);
        }

        console.log(`Total number of sockets in a room are ${socketList.get(roomId)?.size}`)
    })
})