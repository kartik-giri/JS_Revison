import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignIn = ()=>{

    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const signIn= async ()=>{
        const userName = userNameRef.current?.value;
        const password = passwordRef.current?.value;

        const jwtToken = await axios.post(`${BACKEND_URL}api/v1/sign-in`,{
            userName:userName,
            password:password
        })

        const jwt = jwtToken.data.message;
        localStorage.setItem("jwt_Token", jwt);
        navigate("/dashboard")

    }


    return (
        <>
        <div className="h-screen w-screen bg-myLightBlue inline-flex justify-center items-center">
            <div className="bg-white rounded-xl gap-4 p-10">
              <Input ref={userNameRef} placeholder="Email.." onchange={()=>{}}/>
              <Input ref={passwordRef}placeholder="Password.." onchange={()=>{}}/>
              <div className="text-center mt-2">
               <Button loading={false} text="Sign in" onclick={signIn} variant="Primary" size="md"/>
              </div>
            </div>

        </div>
        </>
    )
}

