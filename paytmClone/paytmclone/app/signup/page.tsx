"use client"

import { useRouter } from "next/navigation";
import { RefObject, useRef } from "react";


const signup= ()=> {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const router = useRouter()

    const onSignUp= async()=>{
        const userName = usernameRef.current!.value;
        const email = emailRef.current!.value
        const password = passwordRef.current!.value;

        const userResult = await fetch("/api/v1/signup",{
            method:"POST",

             headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        });

        const userObj= await userResult.json()
        router.push("/api/auth/signin")
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign up
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput ref={usernameRef} label="Username" placeholder="kartik" />
                        <LabelledInput ref={emailRef} label="Email" placeholder="kartik@gmail.com" />
                        <LabelledInput ref={passwordRef} label="Password" type={"password"} placeholder="123456" />
                        <button onClick={onSignUp} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign up</button>
                    </div>
                </div>
            </a>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    ref: RefObject<HTMLInputElement| null>
}

function LabelledInput({ label, placeholder, type, ref }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input ref={ref} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

export default signup