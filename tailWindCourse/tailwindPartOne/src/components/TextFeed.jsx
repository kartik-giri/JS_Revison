const TextFeed = ({ handleInput, type, children})=>{
    return (
        <>
            <div className="flex justify-center">
                <input type={type} onChange={handleInput} placeholder={children} className="outline-0 m-3 h-9 w-50 rounded-md p-3 bg-[#1e426d] text-xs font-light text-[#5d7692] placeholder-{#5d7692} " />
            </div>
        </>
    )
}

export default TextFeed;