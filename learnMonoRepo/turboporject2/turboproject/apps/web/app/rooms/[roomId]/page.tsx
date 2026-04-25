import { Input } from "@repo/ui/input";

const Room = async({params}: {
    params: Promise<{
        roomId: string
    }>
})=>{
    const {roomId} = await params;
    return(
        <main style={{
            height:"100vh",
            width:"100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent:"space-between"
        }}>

            <h1>Chat room</h1>

            <Input placeholder="chat"/>
        </main>
    )
}

export default Room
