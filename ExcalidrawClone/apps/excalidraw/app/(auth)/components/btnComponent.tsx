"use client"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export const BtnComponentsignup = ({children}: {
  children: ReactNode,
})=>{
  return (
    <button onClick={()=>redirect("/signup")} className="p-2 mx-2 rounded-md bg-black text-white">{children}</button>
  )
}

export const BtnComponentsignin = ({children}: {
  children: ReactNode,
})=>{
  return (
    <button onClick={()=>redirect("/signin")} className="p-2 mx-2 rounded-md bg-black text-white">{children}</button>
  )
}