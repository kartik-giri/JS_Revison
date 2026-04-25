import { RefObject } from "react"

interface InputProps {
    placeholder: string,
    ref?: RefObject<HTMLInputElement | null>
}

export const Input = ({placeholder, ref}:InputProps)=>{
return (
    <input ref={ref} style={{
        padding:10,
        margin:10,
        borderColor:"black",
        borderWidth:1
    }} placeholder={placeholder} type="text" />
)
}