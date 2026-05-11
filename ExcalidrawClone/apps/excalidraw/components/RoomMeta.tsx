"use client"
import { useRouter } from "next/navigation"

export const RoomMeta = ({roomId}: {roomId:number})=>{
    const router = useRouter()
    return (
        <div>
            <button onClick={()=>{
                router.push(`/canvas/${roomId}`)
            }}>
                Join
            </button>
        </div>
    )
}