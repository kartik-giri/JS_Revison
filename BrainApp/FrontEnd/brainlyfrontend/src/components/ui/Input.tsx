export const Input = ({placeholder,onchange}:{placeholder: string, onchange:()=>void})=>{
    return (
        <>
        <div>
            <input type="text" placeholder={placeholder} className="px-4 py-2 w-100 border rounded-sm my-2 border-slate-200" onChange={onchange} />
        </div>
        </>
    )
}