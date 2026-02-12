import { useEffect, useRef, useState } from "react";

const App = ()=>{

  const [messages, setMessages] = useState<string[]>([]);
  const socket = useRef<WebSocket>(null)

  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    socket.current = new WebSocket(`ws://localhost:8080`);

    if(socket.current){
      //setting onmessage event listner
      socket.current.onmessage = (ev)=>{
        setMessages((msg)=>{
          return [...msg, ev.data]
        }) 
      }
    }

    //hardcode the room logiv after connection is open
    socket.current.onopen = ()=>{
      socket.current?.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return ()=>{
      socket.current?.close();
    }
  },[])

  const sendMsg = ()=>{
    let userMsg = inputRef.current?.value;
    socket.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message: userMsg
      }
    }))
  }
  return (
    <>
    <div className=" h-screen w-screen bg-gray-900 flex flex-col justify-between">
      <div className=" pt-14 pl-14 h-8/12 flex flex-col items-start ">
      {messages.map((elem)=>{
        return <span className="text-white p-2 bg-gray-800 rounded-xl my-2 ">{elem}</span>
      })}
      </div>

      <div className="bg-gray-900 border border-gray-800 h-2/12 flex items-center justify-between px-10">
      <input ref={inputRef} className=" w-full h-full p-4 border-0 text-white outline-none " type="text"  name="" id="" />
      <button className="cursor-pointer h-5/12 bg-gray-800 pl-6 pr-6 rounded-lg p-3 text-white" onClick={sendMsg}>Send</button>
      </div>
    </div>
    </>
  )
}

export default App;