export const Input = ({placeholder,onchange, ref}:{placeholder: string, onchange:()=>void, ref:any})=>{
    return (
        <>
        <div>
            <input ref={ref} type="text" placeholder={placeholder} className="px-4 py-2 w-100 border rounded-sm my-2 border-slate-200" onChange={onchange} />
        </div>
        </>
    )
}