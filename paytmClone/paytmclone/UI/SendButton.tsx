"use client"

import { useRef, useState } from "react"

export const SendButton = ({senderId, recieverId}:{senderId:number, recieverId:number})=>{
    const [toggle, setToggle] = useState(false);
    return (
        <div>
            {toggle && <SendComponent setToggle={setToggle} senderId={senderId} recieverId={recieverId}/>}
        <button onClick={()=>{
            setToggle((toggle)=>{
                return !toggle
            })
        }} className=" bg-black text-white font-light text-sm p-2 rounded-md">Send Money</button>
        </div>
    )
}

const SendComponent = ({ senderId, recieverId, setToggle }: { senderId: number, recieverId: number, setToggle:any }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)

    const sendTransaction = async()=>{
        setLoading(true)
        const amountStr = inputRef.current!.value;

        const amount = parseInt(amountStr,10)

        await fetch("/api/v1/balance",{
            method:"POST",

             headers: {
                  "Content-Type": "application/json"
            },

            body: JSON.stringify({
                amount:amount,
                senderId:senderId,
                recieverId:recieverId
            })
        })
        setLoading(false)
        setToggle(false)
    }
    return (
        <div className="fixed inset-0  opacity-100 flex justify-center items-center z-50">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-80">
                <h2 className="font-bold text-lg mb-4">Send Money</h2>
                <input ref={inputRef} 
                    type="text" 
                    placeholder="Amount" 
                    className="border w-full p-2 rounded-md mb-4"
                />
                <button onClick={sendTransaction} className="bg-black text-white w-full p-2 rounded-md">
                    {loading==true? "Loading...": "Send"}
                </button>
            </div>
        </div>
    )
}