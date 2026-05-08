const getChat = async(roomId:number)=>{
    const response = await fetch(`http://localhost:3005/chat?slug=${roomId}`)
    const result = await response.json();
    return result.message
}

export const ChatRoom = async({roomId}:{roomId:number})=>{
    const result = await  getChat(roomId)
    console.log(result)
    return (
        <div>

        </div>
    )
}
