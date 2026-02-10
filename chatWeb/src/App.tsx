import { useEffect, useState } from "react";

const App = ()=>{
  const [socket, setSocket] = useState();

  //1. Connect frontend with websocket server.
  useEffect(()=>{
    const webSocket = new WebSocket(`ws://localhost:8080`);
    //@ts-ignore
    setSocket(webSocket);
  },[])

  return (
    <>
    </>
  )
}

export default App;