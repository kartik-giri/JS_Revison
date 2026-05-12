"use client"

import { useRouter } from "next/navigation";
import { RefObject, useRef, useState } from "react";


const Signin= ()=> {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loader, setLoader] = useState<boolean>(true);

    const router = useRouter()

    const onSignIn= async()=>{
        setLoader(false);
        const email = emailRef.current!.value
        const password = passwordRef.current!.value;

        const res = await fetch("http://localhost:3005/signin",{
            method: "POST",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        })
        const resobj = await res.json();
        setLoader(true);
        const jwtToken = resobj.message;
        localStorage.setItem("jwtToken", jwtToken);
        console.log(resobj)
        router.push("/ddashboard")
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign in
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput ref={emailRef} label="Email" placeholder="kartik@gmail.com" />
                        <LabelledInput ref={passwordRef} label="Password" type={"password"} placeholder="123456" />
                        <button onClick={onSignIn} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{loader? "Sign in" : "Loading..."}</button>
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

export default Signin