const Button = ({isValid,children})=>{
    return (
        <>
            <div className="flex justify-center mt-2">
                <button className={` cursor-pointer w-50 flex justify-center items-center p-3 h-9  ${isValid? `bg-myGreen`: `bg-myGrey`} rounded-md font-semibold text-sm text-white`}  ><span>{children}</span></button>
            </div>
        </>
    )
}

export default Button