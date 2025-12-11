import { useState } from "react";
import Button from "../components/Button";
import IconHead from "../components/IconHead";
import SubHead from "../components/SubHead";
import TextFeed from "../components/TextFeed";

const EmailPage=()=>{

    const [emailInput, SetEmailInput] = useState();
    const [isEmailValid, setisEmailValid] = useState(false);

    const validateEmail = (email) => {
    if (!email) return false;

    // This regex is used by Chrome, Firefox, and Android — very reliable
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email.trim());
  };

    const handleEmailInput=(e)=>{
        const value = e.target.value;
        SetEmailInput(value);

        setisEmailValid(validateEmail(emailInput));
    }
    return (
        <>
         <div className="bg-[#002b5b] w-screen h-screen flex justify-center">
            <div className="w-2/4 ">
                {/* Icon Heading */}
                <IconHead/>

                <SubHead>Let's Get Started</SubHead>

                <TextFeed handleInput={handleEmailInput} type={"Email"}>Email Id</TextFeed>

                <Button isEmailValid={isEmailValid}>Continue</Button>
            </div>
        </div>
        </>
    )
} 
export default EmailPage;