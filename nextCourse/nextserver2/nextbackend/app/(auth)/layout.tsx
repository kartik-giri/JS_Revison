import { ReactNode } from "react"
import Link from "next/link"

const Authlayout = ({children}:{children: ReactNode} )=>{
    return (
        <>
        <Link href="/" >Home</Link>
        {children}
        </>
    )
}

export default Authlayout