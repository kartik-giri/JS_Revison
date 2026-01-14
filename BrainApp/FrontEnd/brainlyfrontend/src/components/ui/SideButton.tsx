import type { ReactElement } from "react"

export const SideButton = ({text,Icon}:{text:string, Icon:ReactElement})=>{
    return (
        <>
        <div className="inline-flex items-center text-gray-800 gap-2 mt-2 cursor-pointer hover:bg-gray-300 max-w-40 px-8 rounded-sm py-2 duration-150">
            <div>{Icon}</div>
            <div>{text}</div>
        </div>
        </>
    )
}