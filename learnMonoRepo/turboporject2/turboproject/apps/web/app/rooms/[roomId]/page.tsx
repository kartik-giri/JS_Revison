
import { Input } from "@repo/ui/input";
import {SendWsReq} from "../../components/SendWsReq"

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

          <SendWsReq/>
        </main>
    )
}

export default Room
