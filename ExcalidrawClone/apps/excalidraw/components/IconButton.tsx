import { ReactNode } from "react";

export const IconButton = ({icon, onClick, active}: {icon: ReactNode, onClick: ()=>void,active:boolean})=>{

    return <button onClick={onClick} className={`${active? "text-black": "text-white"} pointer rounded-md p-2 bg-cyan-400 hover:bg-cyan-500`}>
        {icon}
    </button>
}