//Useres will jon in romm and server have to broadcast msg only to certain room.

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface customSocketType extends WebSocket{
    roomId ?: string
}

//room -> set of sockets {socket1, socket2 ...}
let allSocket = new Map<string, Set<WebSocket>> ();

wss.on("connection", (socket: customSocketType)=>{

    socket.on("message", (message)=>{
        //Client will send certain msg passed by schema.
        //the message parameter is not guaranteed to be a string. that's why we have to first convert it in to string and than object.
        
        const messageString = message.toString();
        const messageObj = JSON.parse(messageString);

        if(messageObj.type == "join"){

            if(!allSocket.has(messageObj.payload.roomId)){
            allSocket.set(messageObj.payload.roomId, new Set()); //setting key
            }
            allSocket.get(messageObj.payload.roomId)?.add(socket); //setting value 
            socket.roomId = messageObj.payload.roomId

            console.log(`User join the room ${messageObj.payload.roomId}`)
        }

        //Client wants to send to chat. first get room  of user in which it wants to sends.
        if(messageObj.type == "chat"){
            let roomId = socket.roomId;
            if(roomId){
            allSocket.get(roomId)?.forEach((elemSocket)=>{
                elemSocket.send(messageObj.payload.message)
            })}
        }
    })

    socket.on(" close", ()=>{
            let roomId = socket.roomId;

            if(roomId){
            allSocket.get(roomId)?.delete(socket);
            }else{
                return
            }

            if(allSocket.get(roomId)?.size ===0){
                allSocket.delete(roomId)
            }

            console.log(`Total number of sockets: ${allSocket.get(roomId)?.size}`)
        })
})