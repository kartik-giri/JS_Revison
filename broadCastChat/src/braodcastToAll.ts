// import {WebSocketServer, WebSocket} from "ws";

// const wss = new WebSocketServer({port: 8080});

// let count = 0;
// let allSockets: WebSocket[] = [] 


// //Broadcast msg to all sockets/clients

// wss.on("connection", (socket)=>{

//     allSockets.push(socket);

//     count = count +1;
//     console.log(`Number of clients connected to webSocket server ${count}`)

//     //Catch the messsage send by client.
//     socket.on("message", (ev)=>{
//         console.log(`Message is received ${ev.toString()}`);

//         //Broadcast msg to all the socket
//         allSockets.forEach((elem)=>{
//             elem.send(`${ev.toString()} send from server`)
//         })
//     })

//     socket.on("close", ()=>{
//         allSockets = allSockets.filter((elem)=>{
//             return elem !== socket
//         })
//         console.log(`Number of live sockets ${allSockets.length}`)
//     })
// })

