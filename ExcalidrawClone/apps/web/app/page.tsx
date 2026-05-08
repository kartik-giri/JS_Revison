"use client"
import { useRouter } from "next/navigation";
import { useRef } from "react"

const Home = ()=>{
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  
  const createRoom = async()=>{
    const roomSlug = inputRef.current!.value;
    router.push(`/room/${roomSlug}`)
  }
  return (
    <div style={{background:"black", 
                height:"100vh", 
                width:"100vw",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"}}>
      {/* good approach react form */}
      <input ref={inputRef} type="text" placeholder="Room Id" />
      <button onClick={createRoom}>Join room</button>
    </div>
  )
}

export default Home