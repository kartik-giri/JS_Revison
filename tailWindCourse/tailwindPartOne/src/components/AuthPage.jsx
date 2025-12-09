import { useRef } from "react";
import { FiMonitor } from "react-icons/fi";
const AuthPage =()=>{
    let buttonRef = useRef(null);

    const changeColour = ()=>{
        buttonRef.current.style.backgroundColor = "red"
    }
    return (
        <>
        <div className="bg-[#002b5b] w-screen h-screen flex justify-center">
            <div className="w-2/4 ">
                {/* Icon Heading */}
            <div className=" flex items-center justify-center mt-8">
                <div>
                    <FiMonitor className="text-white"/>
                </div>
                <div className="flex m-2">
                    <p className="text-[#4fd1c5]">Webinar</p><p className="text-white">.gg</p>
                </div>
            </div>

            {/* Verifiy your age */}
            <div className="flex justify-center mt-9 mb-6" >
                <h3 className="font-semibold text-white">Verify Your Age</h3>
            </div>

            {/* text */}
            <div className="flex justify-center">
                <p className="text-[#8e9eb3] font-medium text-xs">Please confirm you birth year. This data will not be sorted.</p>
            </div>

            {/* Text feild */}
            <div className="flex justify-center">
                <input type="text" placeholder="Your Birth Year" onChange={changeColour} className="m-3 h-9 w-50 rounded-md p-3 bg-[#1e426d] text-xs font-light text-[#5d7692] placeholder-{#5d7692} " />
            </div>

            {/* Continue button */}
            <div className="flex justify-center mt-2">
                <button className="w-50 flex justify-center items-center p-3 h-9 bg-[#94aabf] rounded-md font-semibold text-sm text-white" ref={buttonRef} ><span>Continue</span></button>
            </div>
            </div>
        </div>
        </>
    )
}

export default AuthPage;