import { useEffect, useRef } from "react";

export const useWebSocket = ()=>{
    const socketRef = useRef<WebSocket>(null);
    useEffect(()=>{
        const socketServer= new WebSocket('ws://localhost:3002');
        socketRef.current = socketServer;
    
        socketServer.onopen= ()=>{
          console.log("COnnection is made with websocket server");
        }
    
        return ()=>{
          socketServer.close();
        }
      },[])

      return({
        socketRef
      })
}