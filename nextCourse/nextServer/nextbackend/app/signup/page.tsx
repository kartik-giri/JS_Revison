"use client"

import { useRouter } from "next/navigation";
import { useRef } from "react";

const singUp = ()=>{

    const router = useRouter();
    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    

    const onSignup = async ()=>{
        const userNameVlaue = userName.current!.value;
        const passwordValue = password.current!.value;

        await fetch("/api/v1/signup",
            {
                method:"POST",

                headers: {
                  "Content-Type": "application/json"
                },
                
                body: JSON.stringify({
                userName: userNameVlaue,
                password: passwordValue
            })
            }
        )
        router.push("/signin")
    }
    
    return (
        <>
        <div className=" w-screen h-screen flex flex-col items-center justify-center">

            <div className=" p-4 border-2 border-black flex flex-col justify-center items-center ">
                <input ref={userName} type="text" placeholder="username" />
                <input ref={password} type="text" placeholder="password"/>

                {/* making component user intractable */}
                <button className="bg-black rounded-md p-2 text-white cursor-pointer" onClick={onSignup} >Sign up</button>
            </div>
        </div>
        </>
    )
}

export default singUp