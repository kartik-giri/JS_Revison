"use client"
import { signOut } from "next-auth/react"
import { ReactNode } from "react"

export const Button = ({children}:{children:ReactNode})=>{
    return (
        <button className="p-2 bg-black text-white rounded-md" onClick={()=>signOut()}>{children}</button>
    )
}