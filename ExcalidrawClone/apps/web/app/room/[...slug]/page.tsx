const Room = async({params}:{
    params: Promise<{
        slug:string
    }>
})=>{

    const {slug} = await params;

    const room = await fetch(`http://localhost:3005/room?slug=${slug}`);
    const roomParse = await room.json();
    
    return(
        <div>
            <h1>{roomParse.message.slug}</h1>
        </div>
    )
}

export default Room