import { CreateRoom } from "@/components/CreateRoom";
import { RoomMeta } from "@/components/RoomMeta";

const Dashboard = async()=>{
    const res = await fetch("http://localhost:3005/rooms");
    const resObj = await res.json();
    console.log("all rooms", resObj)
    const rooms = resObj.message;
    return(
        <div>
            <CreateRoom/>
        <div>
            {rooms.map((room:any)=>{
                return <div key={room.id}>
                    <div className=" flex justify-between">
                        <p>{room.id}</p>
                        <RoomMeta roomId={room.id}/>
                    </div>
                </div>
            })}
        </div>
        </div>
    )
}

export default Dashboard