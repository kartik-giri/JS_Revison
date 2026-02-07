import { useEffect, useRef, useState } from "react"

const App = ()=>{
  const [socket, setSocket] = useState();
  //@ts-ignore
  const inputRef = useRef();

  useEffect(()=>{
    const ws = new WebSocket(`ws://localhost:8080`);
    //@ts-ignore
    setSocket(ws)

    ws.onmessage = (ev) =>{
      alert(ev.data);
    } 

  },[])

  //Send message function
  const sendMsg = ()=>{
    if(!socket){
      return;
    }
    //@ts-ignore
    const message = inputRef.current.value;
    //@ts-ignore
    socket.send(message)
  }
  return (
    <>
    <div className=" flex justify-center items-center h-screen w-screen">
      <div className=" border-2 p-4 rounded-sm">
        {/* @ts-ignore */}
      <input ref={inputRef} type="text" placeholder="Message.." className="border p-1 rounded-sm" />
      <button onClick={sendMsg} className="ml-2 bg-black text-white p-2 rounded-md cursor-pointer">Send</button>
      </div>
    </div>
    </>
  )
}

export default App