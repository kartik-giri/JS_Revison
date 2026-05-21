export const getExistingShapes = async (roomId: string) => {
    const res = await fetch(`http://localhost:3005/chat?roomid=${roomId}`);
    const chatsObj = await res.json();
    const chats = chatsObj.message;
    if (!chatsObj.message) {
        console.log("Failed to fetch chats!")
        return []
    }

    const shapes = chats.map((X: { message: string }) => {
        try{
        const messageData = JSON.parse(X.message);
        return messageData.shape
    }catch(e){
        return null
    }}).filter(Boolean);

    return shapes;

}