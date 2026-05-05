import {WebSocketServer} from "ws"
import jwt, { type JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET

const ws = new WebSocketServer({port: 8081},()=>{
    console.log("Server listening on port 8081")
}); //Intialized ws server.

//Connection event listener call back function also have access to request object.
ws.on("connection", async(socket, request )=>{
    const url = request.url; //ws://localhist:8080?token="jdbcjbdcjbd"
    if(!url){
        return;
    }

    //split() function converts string into array on the basis of seprator we provide.
    //new URLSearchParams -> this passes the string into key ->value pair map
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    const  verifyToken = jwt.verify(token!, jwtSecret!);
    if(!verifyToken || (verifyToken as JwtPayload).id){
        socket.close()
        return
    }

    socket.on("message", (e)=>{
        socket.send(e.toString())
    })
})