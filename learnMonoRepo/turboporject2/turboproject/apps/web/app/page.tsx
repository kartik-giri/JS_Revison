"use client"
import {Input} from "@repo/ui/input"
import { useRouter } from "next/navigation";
import { ReactHTMLElement, useRef } from "react"

const Home = ()=>{
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
 

  const joinFunc = ()=>{
    const inputVal = inputRef.current?.value;
    router.push(`/rooms/${inputVal}`)
  }
  return(
    <section style={{height: "100vh", width: "100vw", background: "black", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column" }}>
      <h1 style={{color:"white"}}>Chat App</h1>
      <form style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        
        <Input ref={inputRef} placeholder="text"/>
        <button style={{background:"white", color:"black", width:"165px", padding:10}} type="button" onClick={joinFunc}>Join</button>
      
      </form>

    </section>
  )
}

export default Home