import { useRef, useState } from "react";
import Button from "../components/Button";
import TextFeed from "../components/TextFeed";
import DescText from "../components/DescText";
import SubHead from "../components/SubHead";
import IconHead from "../components/IconHead";
const AuthPage =()=>{
    //Correct way: Use ref only for reading, never for writing
    // let dobRef = useRef(null);
    const [dobInput, setdobInput] = useState(false);
    const [isDobValid, setDobValid]= useState(false);

    const validateDOB = (dateString) => {
    // Regex for YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/; 
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const isValidDate = !isNaN(date.getTime());

    // Further checks for valid date values (e.g., preventing dates like 2023-99-99)
    const [year, month, day] = dateString.split('-').map(Number);
    const dateCheck = new Date(year, month - 1, day); // Month is 0-indexed in JS Date

    return isValidDate && dateCheck.getFullYear() === year && dateCheck.getMonth() + 1 === month && dateCheck.getDate() === day;
  };

    const handleDobInput= (e)=>{
        const inputValue = e.target.value;
        setdobInput(inputValue)

        setDobValid(validateDOB(dobInput));
    }
    return (
        <>
        <div className="bg-[#002b5b] w-screen h-screen flex justify-center">
            <div className="w-2/4 ">
                {/* Icon Heading */}
            <IconHead/>

            {/* Verifiy your age */}
            <SubHead>Verify Your Age</SubHead>

            {/* text */}
            <DescText>Please confirm you birth year. This data will not be sorted.</DescText>

            {/* Text feild */}
            <TextFeed handleInput={handleDobInput} type={"date"}>Your Birth Year</TextFeed>

            {/* Continue button */}
            <Button isValid={isDobValid}>Continue</Button>
            </div>
        </div>
        </>
    )
}

export default AuthPage;