"use client"

import { useRef } from "react";

const singIn = ()=>{

    const userName = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

      const onSignIn = async ()=>{
        const userNameVlaue = userName.current!.value;
        const passwordValue = password.current!.value;

        await fetch("/api/v1/users.details",
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
    }
    
    return (
        <>
        <div className=" w-screen h-screen flex flex-col items-center justify-center">

            <div className=" p-4 border-2 border-black flex flex-col justify-center items-center ">
                <input ref={userName} type="text" placeholder="username" />
                <input ref={password} type="text" placeholder="password"/>

                {/* making component user intractable */}
                <button className="bg-black rounded-md p-2 text-white cursor-pointer" onClick={onSignIn} >Sign in</button>
            </div>
        </div>
        </>
    )
}

export default singIn