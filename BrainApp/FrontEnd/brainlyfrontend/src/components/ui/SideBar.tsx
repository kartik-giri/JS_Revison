import type { ReactElement } from "react"

export const SideBar = ({sideIcon, logo}:{sideIcon: ReactElement[], logo:ReactElement })=>{
    return (
        <>
        <div className="h-screen fix sticky w-66 border-r border-gray-200 left-0 top-0 bg-white" >
        <div className="flex items-center gap-2 p-4">
            <div>{logo}</div>
            <div className="font-bold text-lg">Second Brain</div>
        </div>
        <div className="pt-6 pl-8">
            {sideIcon.map((elem:ReactElement)=>{
                return <div>
                    {elem}
                </div>
            })}
        </div>
        </div>
        </>
    )
}

