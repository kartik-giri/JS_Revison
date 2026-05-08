import {WebSocketServer, WebSocket} from "ws"
import jwt, { type JwtPayload } from "jsonwebtoken";
import {prisma} from "@repo/db"

const jwtSecret = process.env.JWT_SECRET

const ws = new WebSocketServer({port: 8081},()=>{
    console.log("Server listening on port 8081")
}); //Intialized ws server.

// interface User {
//     ws: WebSocket,
//     rooms: String[],
//     userId: Number
// }

//We can use map and set instead of this
// const users: User[]= []

interface User{
    ws: WebSocket,
    userId: number
}
// users[roomId] -> {{ws:socket,userid:121},{ws:socket,userid:121}},
//"room-1" → Set { {ws: socket1, userId: 1}, {ws: socket2, userId: 2} }
const users = new Map<String, Set<User>>()


const checkUser=(token:string): number| null=>{
    try{
    console.log("JWT Secret:", jwtSecret)        // check if secret is loaded
    console.log("Token received:", token)         
    
    const  verifyToken = jwt.verify(token!, jwtSecret!) as JwtPayload
    console.log("Verified token:", verifyToken)   
    
    if(!verifyToken || !verifyToken.id){
        return null
    }else{
        return verifyToken.id
    }}catch(e){
        console.log(e);
        return null
    }
}


//Connection event listener call back function also have access to request object.
ws.on("connection", async(socket, request )=>{
    console.log("✅ New connection received")  
    const url = request.url; //ws://localhist:8080?token="jdbcjbdcjbd"
    if(!url){
        return;
    }

    //split() function converts string into array on the basis of seprator we provide.
    //new URLSearchParams -> this passes the string into key ->value pair map
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    const userId = checkUser(token!)
    if(!userId){
        socket.close()
        return
    }

    const currentUser = {
        ws: socket,
        userId: userId
    }

    /*
    sheema 
    {
      type:"join-room",
      roomId: Int
    }
    */
    socket.on("message", async(data)=>{
        const parsedData = JSON.parse(data as unknown as string); //parsed user message.

        //Socket join the room
        if(parsedData.type === "join-room"){
            const roomid = parsedData.roomId
            if(!users.has(roomid)){
                users.set(roomid, new Set())
            }
            users.get(roomid)?.add(currentUser)
        }

        if(parsedData.type ==="Leave-room"){
            const roomId = parsedData.roomId;
            const room = users.get(roomId);
            if(!room){
                return
            }
            room.delete(currentUser);

            if(room.size === 0){
                users.delete(roomId)
            }
        }

        /*
           {
            type:"Chat",
            message:string
            roomId: Int
            }
        */
        if(parsedData.type === "Chat"){
            const roomId = parsedData.roomId;
            const message= parsedData.message;

            const room = users.get(roomId);
            if(!room){
                return
            }

            //Storing msg in db// Best approch is use queues
            await prisma.chats.create({
                data:{
                    message:message,
                    userId:userId,
                    roomId: roomId
                }
            })

            room.forEach((user)=>{
                user.ws.send(JSON.stringify({
                    type:"chat",
                    room: roomId,
                    message: message,
                    fromUserId: currentUser.userId
                }))
            })
        }

    })

    socket.on("close", ()=>{
        users.forEach((room, roomId)=>{
            room.delete(currentUser); //from every room delete the current user delte from here {{ws:socket,userid:121},{ws:socket,userid:121}}

            if(room.size== 0){
                users.delete(roomId) //if roomID maps have no value delete it
            }
        })
    })
})

//Mapping is key value pair where key is column and value is row.
// SO that's why when we iterate the users map we get the access to rows/values -> {{ws:socket,userid:121},{ws:socket,userid:121}}
//And key/column access which is roomId in users(roomId)

            /*
            If 1000 users are chatting simultaneously → 1000 DB writes per second
            DB gets overwhelmed → slows down → messages get delayed
            
            User sends message
      ↓
Push to Queue (Redis)    ← instant, lives in memory
      ↓
Send to users immediately ← no waiting for DB
      ↓
Worker process drains queue in background → bulk saves to DB*/