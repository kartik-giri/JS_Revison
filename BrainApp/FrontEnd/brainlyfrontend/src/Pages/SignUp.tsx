import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignUp = ()=>{

    //Type of useRef value is htmlinputElement
    let userNameRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const signUp = async ()=>{
        const userName = userNameRef.current?.value;
        const password = passwordRef.current?.value;

        const result = await axios.post(`${BACKEND_URL}api/v1/sign-up`,
                {
                    userName:userName,
                    password:password
                }

        )
        alert(result.data.message);
        navigate("/sign-up")
    }

    return (
        <>
        <div className="h-screen w-screen bg-myLightBlue inline-flex justify-center items-center">
            <div className="bg-white rounded-xl gap-4 p-10">
              <Input ref={userNameRef} placeholder="Name.." onchange={()=>{}}/>
              <Input ref={passwordRef} placeholder="Password.." onchange={()=>{}}/>
              <div className="text-center mt-2">
               <Button loading={false} text="Sign up" onclick={signUp} variant="Primary" size="md"/>
              </div>
            </div>

        </div>
        </>
    )
}

